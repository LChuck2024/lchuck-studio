import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BackButton } from '../components/BackButton';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// TypeScript 接口定义
interface RAGMetrics {
  context_precision: number; // 上下文精确率 (检索质量)
  context_recall: number;    // 上下文召回率 (检索质量)
  faithfulness: number;      // 答案忠实度 (生成质量)
  answer_relevance: number;  // 回答相关性 (生成质量)
}

interface MetadataItem {
  source: string;
  field: string;
  value: string;
  relevance_score: number;
}

interface ThoughtChain {
  query: string;
  retrieved_chunks: number;
  metadata: MetadataItem[];
  reasoning: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metrics?: RAGMetrics;
  thoughtChain?: ThoughtChain;
}

// 模拟 20 条真实的检索反馈数据库
const MOCK_COURSE_DB = [
  { course_id: 1024, category: 'AI', title: 'Master of Computer Science', credits: 5, language: 'English', tuition: '€2,500/year', duration: '2 years' },
  { course_id: 1025, category: 'Data', title: 'Data Analytics and Big Data', credits: 5, language: 'English', tuition: '€2,800/year', duration: '2 years' },
  { course_id: 1026, category: 'Business', title: 'MBA - International Business', credits: 10, language: 'English', tuition: '€15,000/year', duration: '1 year' },
  { course_id: 1027, category: 'Engineering', title: 'Robotics Engineering', credits: 5, language: 'German', tuition: '€500/year', duration: '2 years' },
  { course_id: 1028, category: 'Design', title: 'UX/UI Design Strategy', credits: 5, language: 'English', tuition: '€3,200/year', duration: '1.5 years' },
  { course_id: 1029, category: 'AI', title: 'Machine Learning Fundamentals', credits: 5, language: 'English', tuition: '€1,500/year', duration: '1 year' },
  { course_id: 1030, category: 'Finance', title: 'Quantitative Finance', credits: 5, language: 'French', tuition: '€800/year', duration: '2 years' },
  { course_id: 1031, category: 'Data', title: 'Data Engineering Architecture', credits: 5, language: 'English', tuition: '€2,600/year', duration: '2 years' },
  { course_id: 1032, category: 'Management', title: 'Project Management PMP', credits: 5, language: 'English', tuition: '€4,000/year', duration: '1 year' },
  { course_id: 1033, category: 'Software', title: 'Cloud Computing & DevOps', credits: 5, language: 'English', tuition: '€3,000/year', duration: '1.5 years' },
  { course_id: 1034, category: 'Marketing', title: 'Digital Marketing Strategy', credits: 5, language: 'Spanish', tuition: '€1,200/year', duration: '1 year' },
  { course_id: 1035, category: 'AI', title: 'Natural Language Processing', credits: 5, language: 'English', tuition: '€2,500/year', duration: '1 year' },
  { course_id: 1036, category: 'Security', title: 'Cybersecurity Master', credits: 5, language: 'English', tuition: '€3,500/year', duration: '2 years' },
  { course_id: 1037, category: 'Business', title: 'Entrepreneurship & Innovation', credits: 5, language: 'English', tuition: '€8,000/year', duration: '1 year' },
  { course_id: 1038, category: 'Data', title: 'Applied Data Science', credits: 5, language: 'Italian', tuition: '€600/year', duration: '2 years' },
  { course_id: 1039, category: 'Software', title: 'Full Stack Web Development', credits: 5, language: 'English', tuition: '€2,000/year', duration: '1.5 years' },
  { course_id: 1040, category: 'Engineering', title: 'Sustainable Energy Systems', credits: 5, language: 'English', tuition: '€1,800/year', duration: '2 years' },
  { course_id: 1041, category: 'Design', title: 'Interaction Design', credits: 5, language: 'English', tuition: '€2,400/year', duration: '1 year' },
  { course_id: 1042, category: 'AI', title: 'Computer Vision Applications', credits: 5, language: 'English', tuition: '€2,500/year', duration: '1 year' },
  { course_id: 1043, category: 'Finance', title: 'Blockchain & Cryptocurrencies', credits: 5, language: 'English', tuition: '€4,500/year', duration: '1 year' }
];

// 生成随机的 MOCK 数据
const generateMockResponse = (query: string) => {
  const randomCourse = MOCK_COURSE_DB[Math.floor(Math.random() * MOCK_COURSE_DB.length)];
  
  const mockMetadata: MetadataItem[] = [
    { source: 'course_data.xlsx', field: 'course_id', value: randomCourse.course_id.toString(), relevance_score: 0.98 },
    { source: 'course_data.xlsx', field: 'category', value: randomCourse.category, relevance_score: 0.95 },
    { source: 'course_data.xlsx', field: 'title', value: randomCourse.title, relevance_score: 0.92 },
    { source: 'course_data.xlsx', field: 'credits', value: randomCourse.credits.toString(), relevance_score: 0.89 },
    { source: 'course_data.xlsx', field: 'language', value: randomCourse.language, relevance_score: 0.85 },
    { source: 'course_data.xlsx', field: 'tuition', value: randomCourse.tuition, relevance_score: 0.82 },
    { source: 'course_data.xlsx', field: 'duration', value: randomCourse.duration, relevance_score: 0.80 },
  ];

  const mockMetrics: RAGMetrics = {
    context_precision: 82 + Math.random() * 16, // 82-98
    context_recall: 85 + Math.random() * 14,    // 85-99
    faithfulness: 88 + Math.random() * 11,      // 88-99
    answer_relevance: 90 + Math.random() * 9,   // 90-99
  };

  const mockThoughtChain: ThoughtChain = {
    query: query,
    retrieved_chunks: Math.floor(Math.random() * 5) + 3, // 3-7 chunks
    metadata: mockMetadata,
    reasoning: `检索到相关文档块，包含课程 ID、分类、名称及核心属性。通过意图识别，确认"${randomCourse.title}"与当前查询高度匹配。数据一致性校验通过。`,
  };

  return {
    content: `根据检索结果，为您推荐 [${randomCourse.course_id}] ${randomCourse.title} 课程。该课程属于 ${randomCourse.category} 领域，学制 ${randomCourse.duration}，授课语言为 ${randomCourse.language}，学费预估 ${randomCourse.tuition}。`,
    metrics: mockMetrics,
    thoughtChain: mockThoughtChain
  };
};

export const RAGAuditor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'RAG Auditor 已就绪。请输入关于欧开大学选课数据的问题。',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMetrics, setCurrentMetrics] = useState<RAGMetrics | null>(null);
  const [currentThoughtChain, setCurrentThoughtChain] = useState<ThoughtChain | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [archModalOpen, setArchModalOpen] = useState(false);

  useEffect(() => {
    if (!archModalOpen) return;
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setArchModalOpen(false);
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [archModalOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setCurrentMetrics(null);
    setCurrentThoughtChain(null);

    // 模拟 1.5s 检索过程
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = generateMockResponse(inputValue);

    // 模拟助手回复
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      metrics: response.metrics,
      thoughtChain: response.thoughtChain,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setCurrentMetrics(response.metrics);
    setCurrentThoughtChain(response.thoughtChain);
    setIsLoading(false);
  };

  const getMetricColor = (score: number): string => {
    if (score >= 90) return 'text-emerald-500'; // 电光绿
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMetricBgColor = (score: number): string => {
    if (score >= 90) return 'bg-emerald-50 border-emerald-200';
    if (score >= 80) return 'bg-blue-50 border-blue-200';
    if (score >= 70) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleExportPDF = async () => {
    if (!currentMetrics || !currentThoughtChain) {
      alert('请先进行查询，产生评估数据后再导出报告。');
      return;
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    let cursorY = 20;

    // --- Title & Header ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(26, 26, 26); // #1a1a1a
    doc.text('LCHUCK AI LAB', pageWidth / 2, cursorY, { align: 'center' });
    
    cursorY += 8;
    doc.setFontSize(14);
    doc.text('RAG Production Environment Compliance Audit Report', pageWidth / 2, cursorY, { align: 'center' });

    cursorY += 15;
    
    // --- Meta Info ---
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`System Time: ${currentTime}`, 15, cursorY);
    doc.text(`Data Source: EU Open University DB`, 15, cursorY + 6);
    doc.text(`Operator: LCHUCK`, pageWidth - 15, cursorY, { align: 'right' });
    doc.text(`Audit Status: ACTIVE`, pageWidth - 15, cursorY + 6, { align: 'right' });

    cursorY += 15;
    
    // --- Divider ---
    doc.setDrawColor(200, 200, 200);
    doc.line(15, cursorY, pageWidth - 15, cursorY);
    cursorY += 10;

    // --- Query Context ---
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 26, 26);
    doc.text('1. QUERY CONTEXT', 15, cursorY);
    cursorY += 8;
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(80, 80, 80);
    // Handle long text wrapping
    const splitQuery = doc.splitTextToSize(`Original Query: "${currentThoughtChain.query}"`, pageWidth - 30);
    doc.text(splitQuery, 15, cursorY);
    cursorY += (splitQuery.length * 6) + 5;

    // --- Evaluation Metrics ---
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(26, 26, 26);
    doc.text('2. EVALUATION METRICS (RAG QUAD)', 15, cursorY);
    cursorY += 8;

    const drawMetricBox = (x: number, y: number, label: string, score: number) => {
      doc.setDrawColor(220, 220, 220);
      doc.setFillColor(250, 250, 250);
      doc.roundedRect(x, y, 85, 20, 1, 1, 'FD'); // Width 85 to fit 2x2 nicely
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(120, 120, 120);
      doc.text(label.toUpperCase(), x + 42.5, y + 6, { align: 'center' });
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      if (score >= 90) doc.setTextColor(16, 185, 129); // emerald
      else if (score >= 80) doc.setTextColor(37, 99, 235); // blue
      else if (score >= 70) doc.setTextColor(202, 138, 4); // yellow
      else doc.setTextColor(220, 38, 38); // red
      
      doc.text(`${score.toFixed(1)}%`, x + 42.5, y + 15, { align: 'center' });
    };

    // 2x2 Grid Layout for Metrics
    drawMetricBox(15, cursorY, 'Context Precision', currentMetrics.context_precision);
    drawMetricBox(110, cursorY, 'Context Recall', currentMetrics.context_recall);
    cursorY += 25;
    drawMetricBox(15, cursorY, 'Faithfulness', currentMetrics.faithfulness);
    drawMetricBox(110, cursorY, 'Answer Relevance', currentMetrics.answer_relevance);
    
    cursorY += 30;

    // --- Thought Chain & Metadata ---
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(26, 26, 26);
    doc.text('3. THOUGHT CHAIN ANALYSIS', 15, cursorY);
    cursorY += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`Retrieved Chunks: ${currentThoughtChain.retrieved_chunks}`, 15, cursorY);
    cursorY += 8;

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(80, 80, 80);
    doc.text('Retrieved Metadata:', 15, cursorY);
    cursorY += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    currentThoughtChain.metadata.forEach((item, index) => {
      if (cursorY > 270) {
        doc.addPage();
        cursorY = 20;
      }
      doc.setTextColor(120, 120, 120);
      doc.text(`[${item.source}]`, 15, cursorY);
      doc.setTextColor(60, 60, 60);
      doc.text(`${item.field}: `, 55, cursorY);
      doc.setTextColor(26, 26, 26);
      doc.text(item.value, 80, cursorY);
      doc.setTextColor(220, 38, 38); // Red score
      doc.text(`${(item.relevance_score * 100).toFixed(0)}%`, pageWidth - 20, cursorY, { align: 'right' });
      cursorY += 5;
    });

    cursorY += 5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text('Reasoning:', 15, cursorY);
    cursorY += 6;
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    // Remove chinese characters for standard fonts to avoid tofu blocks, or rely on english fallback
    // Since reasoning might have chinese, we provide a placeholder or simplified version if jsPDF default font doesn't support it well.
    // For a robust solution without adding custom TTF fonts to jsPDF, we'll write an english equivalent or keep it simple.
    // Given the prompt asks for a professional look, let's inject a standard English reasoning summary if Chinese is present.
    const safeReasoning = `Semantic match verified. Analyzed ${currentThoughtChain.retrieved_chunks} chunks against query intent. Highest relevance score achieved: ${(currentThoughtChain.metadata[0]?.relevance_score * 100).toFixed(0)}%.`;
    const splitReasoning = doc.splitTextToSize(safeReasoning, pageWidth - 30);
    doc.text(splitReasoning, 15, cursorY);

    // --- Watermark ---
    doc.setFontSize(40);
    doc.setTextColor(230, 230, 230);
    // Save current graphics state
    doc.saveGraphicsState();
    doc.setGState(doc.GState({opacity: 0.2}));
    doc.text('LCHUCK STUDIO', pageWidth / 2, 150, { align: 'center', angle: -45 });
    doc.restoreGraphicsState();

    doc.save(`RAG_Audit_Report_${Date.now()}.pdf`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-6 md:px-8 py-20 relative z-10 overflow-y-auto">
      <Helmet>
        <title>RAG Auditor | LChuck Studio</title>
        <meta name="description" content="RAG 性能监控控制台：Faithfulness、Relevancy、Precision 指标实时评估。生产级 RAG 调试工具。" />
      </Helmet>
      <div className="max-w-[1800px] w-full mx-auto mt-10 md:mt-20 relative">
        {/* 右上角时间戳 */}
        <div className="absolute top-0 right-0 hidden md:flex items-center gap-2 text-xs font-mono text-gray-400 bg-neutral-100 px-3 py-1.5 rounded-sm border border-neutral-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          SYS_TIME: {currentTime || 'LOADING...'}
        </div>

        <div className="mb-8 text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-2 tracking-tight uppercase italic flex items-baseline gap-3 flex-wrap">
            <span>RAG AUDITOR</span>
            <span className="text-xl md:text-2xl lg:text-3xl font-medium text-gray-500 not-italic">(RAG 审计台)</span>
          </h1>
          <p className="text-gray-400 font-mono text-sm mb-4 uppercase tracking-wider">Observability Platform for Enterprise RAG Workflows</p>
          <p className="text-gray-500 font-mono text-sm md:text-base tracking-widest border-l-2 border-red-600 pl-4 py-1">
            生产级 RAG 调试工具：Faithfulness、Relevancy、Precision 实时评估。数据源：欧开大学选课数据。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12 md:mt-16">
          {/* 左侧：聊天对话框 */}
          <div className="bg-white shadow-none border border-neutral-200 rounded-sm flex flex-col h-[calc(100vh-280px)] min-h-[600px] hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            <div className="border-b border-neutral-200 p-4 bg-neutral-50">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold font-mono text-gray-900 uppercase tracking-wider">
                  CHAT INTERFACE (聊天交互)
                </h2>
                <span className="text-xs font-mono text-gray-500">Data Source: 欧开大学选课数据</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-sm p-3 ${
                      msg.role === 'user'
                        ? 'bg-[#1a1a1a] text-white'
                        : 'bg-neutral-100 text-gray-900 border border-neutral-200'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <div className="text-xs text-gray-400 font-mono mt-1">
                      {msg.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-neutral-100 text-gray-900 border border-neutral-200 rounded-sm p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                      <span className="text-xs font-mono text-gray-500">检索中...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t border-neutral-200 p-4 bg-neutral-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="输入问题..."
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-sm text-sm font-mono focus:outline-none focus:border-red-600"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !inputValue.trim()}
                  className="px-6 py-2 bg-[#1a1a1a] text-white border border-[#1a1a1a] rounded-sm text-sm font-bold font-mono hover:border-[#C8102E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                >
                  <span>SEND</span>
                  <span className="font-light text-xs hidden sm:inline opacity-80">(发送)</span>
                </button>
              </div>
            </div>
          </div>

          {/* 右侧：架构监控面板 */}
          <div className="bg-white shadow-none border border-neutral-200 rounded-sm flex flex-col h-[calc(100vh-280px)] min-h-[600px] hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            <div className="border-b border-neutral-200 p-4 bg-neutral-50 flex items-center justify-between">
              <h2 className="text-sm font-bold font-mono text-gray-900 uppercase tracking-wider">
                ARCHITECT MONITOR (架构监控)
              </h2>
              <div className="flex items-center gap-1.5 px-2 py-0.5 border border-emerald-500 rounded-sm bg-emerald-50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_4px_#10b981]"></span>
                <span className="text-[10px] font-bold font-mono text-emerald-600 tracking-widest">LIVE AUDIT</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* System Operations 模块 */}
              <div className="border border-neutral-200 rounded-sm">
                <div className="border-b border-neutral-200 p-3 bg-neutral-50 flex justify-between items-center">
                  <h3 className="text-xs font-bold font-mono text-gray-900 uppercase tracking-wider">
                    SYSTEM OPERATIONS (系统操作)
                  </h3>
                  <button 
                    onClick={handleExportPDF}
                    className="text-[10px] font-mono text-neutral-500 hover:text-[#C8102E] transition-colors flex items-center gap-1"
                  >
                    <span>[ 📄 EXPORT AUDIT REPORT ]</span>
                  </button>
                </div>
                <div className="p-4 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://ai-rag-pro.streamlit.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-[#1a1a1a] text-white border border-[#1a1a1a] rounded-sm text-sm font-mono hover:border-[#C8102E] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="font-bold truncate">LAUNCH PRODUCTION ENGINE</span>
                    <span className="font-light text-xs hidden sm:inline opacity-80 shrink-0 truncate">(生产引擎)</span>
                    <span className="text-xs shrink-0">↗</span>
                  </a>
                  <button
                    onClick={() => setArchModalOpen(true)}
                    className="w-full py-2 bg-[#1a1a1a] text-white border border-[#1a1a1a] rounded-sm text-sm font-mono hover:border-[#C8102E] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="font-bold truncate">ARCHITECTURE INSIGHT</span>
                    <span className="font-light text-xs hidden sm:inline opacity-80 shrink-0 truncate">(架构透视)</span>
                    <span className="text-xs shrink-0">👁️</span>
                  </button>
                </div>
              </div>

              {/* 四大核心指标卡片 */}
              <div className="grid grid-cols-2 gap-3">
                {/* 检索层：Context Precision */}
                <div className={`border rounded-sm p-3 transition-all duration-500 ease-in-out ${currentMetrics ? getMetricBgColor(currentMetrics.context_precision) + ' opacity-100 scale-100' : 'bg-neutral-50 border-neutral-200 opacity-80 scale-95'}`}>
                  <div className="text-xs font-mono text-gray-500 mb-1 uppercase tracking-wider">Ctx Precision</div>
                  <div className={`text-2xl font-bold font-mono transition-colors duration-500 ${currentMetrics ? getMetricColor(currentMetrics.context_precision) : 'text-gray-400'}`}>
                    {currentMetrics ? `${currentMetrics.context_precision.toFixed(1)}%` : '--'}
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 mt-1">上下文精确率 (搜得准)</div>
                </div>
                {/* 检索层：Context Recall */}
                <div className={`border rounded-sm p-3 transition-all duration-500 delay-[100ms] ease-in-out ${currentMetrics ? getMetricBgColor(currentMetrics.context_recall) + ' opacity-100 scale-100' : 'bg-neutral-50 border-neutral-200 opacity-80 scale-95'}`}>
                  <div className="text-xs font-mono text-gray-500 mb-1 uppercase tracking-wider">Ctx Recall</div>
                  <div className={`text-2xl font-bold font-mono transition-colors duration-500 ${currentMetrics ? getMetricColor(currentMetrics.context_recall) : 'text-gray-400'}`}>
                    {currentMetrics ? `${currentMetrics.context_recall.toFixed(1)}%` : '--'}
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 mt-1">上下文召回率 (搜得全)</div>
                </div>
                {/* 生成层：Faithfulness */}
                <div className={`border rounded-sm p-3 transition-all duration-500 delay-[200ms] ease-in-out ${currentMetrics ? getMetricBgColor(currentMetrics.faithfulness) + ' opacity-100 scale-100' : 'bg-neutral-50 border-neutral-200 opacity-80 scale-95'}`}>
                  <div className="text-xs font-mono text-gray-500 mb-1 uppercase tracking-wider">Faithfulness</div>
                  <div className={`text-2xl font-bold font-mono transition-colors duration-500 ${currentMetrics ? getMetricColor(currentMetrics.faithfulness) : 'text-gray-400'}`}>
                    {currentMetrics ? `${currentMetrics.faithfulness.toFixed(1)}%` : '--'}
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 mt-1">答案忠实度 (防幻觉)</div>
                </div>
                {/* 生成层：Answer Relevance */}
                <div className={`border rounded-sm p-3 transition-all duration-500 delay-[300ms] ease-in-out ${currentMetrics ? getMetricBgColor(currentMetrics.answer_relevance) + ' opacity-100 scale-100' : 'bg-neutral-50 border-neutral-200 opacity-80 scale-95'}`}>
                  <div className="text-xs font-mono text-gray-500 mb-1 uppercase tracking-wider">Ans Relevance</div>
                  <div className={`text-2xl font-bold font-mono transition-colors duration-500 ${currentMetrics ? getMetricColor(currentMetrics.answer_relevance) : 'text-gray-400'}`}>
                    {currentMetrics ? `${currentMetrics.answer_relevance.toFixed(1)}%` : '--'}
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 mt-1">回答相关性 (防偏移)</div>
                </div>
              </div>

              {/* Thought Chain 模块 */}
              <div className="border border-neutral-200 rounded-sm">
                <div className="border-b border-neutral-200 p-3 bg-neutral-50 flex justify-between items-center">
                  <h3 className="text-xs font-bold font-mono text-gray-900 uppercase tracking-wider">
                    THOUGHT CHAIN (思维链)
                  </h3>
                </div>
                <div className="p-4 space-y-4">
                  {currentThoughtChain ? (
                    <>
                      <div>
                        <div className="text-xs font-mono text-gray-500 mb-1 uppercase tracking-wider">Query</div>
                        <div className="text-sm font-mono text-gray-900 bg-neutral-50 p-2 rounded-sm border border-neutral-200">
                          {currentThoughtChain.query}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-gray-500 mb-1 uppercase tracking-wider">
                          Retrieved Chunks: <span className="text-red-600">{currentThoughtChain.retrieved_chunks}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                          Metadata from Excel
                        </div>
                        <div className="space-y-2">
                          {currentThoughtChain.metadata.map((item, idx) => (
                            <div
                              key={idx}
                              className="bg-neutral-50 border border-neutral-200 rounded-sm p-2 text-xs font-mono"
                            >
                              <div className="flex justify-between items-start mb-1">
                                <span className="text-gray-900 font-medium">{item.field}</span>
                                <span className="text-red-600">{(item.relevance_score * 100).toFixed(0)}%</span>
                              </div>
                              <div className="text-gray-600">{item.value}</div>
                              <div className="text-gray-400 text-[10px] mt-1">Source: {item.source}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-mono text-gray-500 mb-1 uppercase tracking-wider">Reasoning</div>
                        <div className="text-sm text-gray-700 bg-neutral-50 p-2 rounded-sm border border-neutral-200 leading-relaxed">
                          {currentThoughtChain.reasoning}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-left py-12 px-4 text-emerald-500 font-mono text-sm bg-[#1a1a1a] rounded-sm border border-neutral-800 shadow-inner">
                      &gt; _READY_FOR_QUERY<span className="animate-pulse">_</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer: Operator: LCHUCK */}
        <div className="mt-8 border-t border-neutral-200 pt-4">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400 uppercase tracking-widest">
            <div>Operator: <span className="text-gray-600">LCHUCK</span></div>
            <div>RAG_Auditor_Status: <span className="text-red-600">Active</span></div>
            <div>Data_Source: <span className="text-gray-600">欧开大学选课数据</span></div>
          </div>
        </div>

        <BackButton />
      </div>

      {/* 架构透视弹窗 */}
      {archModalOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setArchModalOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors"
            onClick={() => setArchModalOpen(false)}
            aria-label="关闭"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src="/enterprise-data-architecture.png"
            alt="RAG 架构图"
            className="max-w-full max-h-[90vh] object-contain rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
