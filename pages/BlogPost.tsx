import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Helmet } from 'react-helmet-async';
import { CTASection } from '../components/CTASection';

// 从 src/posts/ 加载，编辑后 HMR 会立即生效
const postModules = import.meta.glob<string>('../src/posts/*.md', { query: '?raw', import: 'default' });

/** Simple frontmatter parser to avoid nodejs polyfills */
const parseFrontmatter = (text: string) => {
  // Remove leading whitespace/newlines to ensure regex matches
  text = text.trimStart();
  
  // Regex that supports both LF and CRLF
  const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+([\s\S]*)$/;
  const match = text.match(frontmatterRegex);
  if (!match) return { data: {}, content: text };
  
  const frontmatterBlock = match[1];
  const content = match[2];
  
  const data: Record<string, string> = {};
  // Split by newline (handle both \n and \r\n)
  frontmatterBlock.split(/[\r\n]+/).forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (key) {
        data[key] = value;
      }
    }
  });
  
  return { data, content };
};

export const BlogPost: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [metadata, setMetadata] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('缺少文章标识');
      setLoading(false);
      return;
    }
    const modulePath = Object.keys(postModules).find((p) => p.endsWith(`/${slug}.md`));
    const loader = modulePath ? postModules[modulePath] : null;
    if (!loader) {
      setError('文章不存在');
      setLoading(false);
      return;
    }
    (loader as () => Promise<string>)()
      .then((text) => {
        const { data, content: mdContent } = parseFrontmatter(text);
        
        // Fallback: if no title in frontmatter, try to find first H1
        if (!data.title) {
          const h1Match = mdContent.match(/^#\s+(.*)$/m);
          if (h1Match) {
            data.title = h1Match[1];
          } else {
            // Last fallback: use slug
            data.title = slug;
          }
        }
        
        setContent(mdContent);
        setMetadata(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-gray-500 font-mono">加载中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate('/blog')}
          className="text-gray-500 hover:text-red-600 transition-colors font-mono text-sm tracking-widest uppercase"
        >
          ← 返回工程日志
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-20 relative z-10 overflow-y-auto">
      <Helmet>
        <title>{metadata.title} | LChuck Studio</title>
        <meta name="description" content={metadata.description || `${metadata.title} - LChuck Studio 工程日志`} />
        {/* Open Graph for better sharing */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description || `${metadata.title} - LChuck Studio 工程日志`} />
        <meta property="og:type" content="article" />
        {metadata.date && <meta property="article:published_time" content={metadata.date} />}
        {metadata.author && <meta property="article:author" content={metadata.author} />}
      </Helmet>

      <article className="max-w-3xl w-full mt-10 md:mt-20">
        {/* Article Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4 leading-tight">
            {metadata.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-mono text-gray-500">
            {metadata.date && <span>{metadata.date}</span>}
            {metadata.category && (
              <>
                <span className="text-gray-300">|</span>
                <span className="text-red-600 font-bold">{metadata.category}</span>
              </>
            )}
            {metadata.author && (
              <>
                <span className="text-gray-300">|</span>
                <span>{metadata.author}</span>
              </>
            )}
          </div>
        </div>

        <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-8 md:p-12">
          <div className="blog-content text-gray-800 leading-relaxed [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:font-black [&_h1]:mb-6 [&_h1]:tracking-tight
            [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-gray-200
            [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3
            [&_p]:mb-4 [&_p]:leading-relaxed
            [&_ul]:my-4 [&_ul]:pl-6 [&_ul]:list-disc [&_li]:my-1
            [&_ol]:my-4 [&_ol]:pl-6 [&_ol]:list-decimal
            [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_code]:text-red-600
            [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-6 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-gray-100
            [&_blockquote]:border-l-4 [&_blockquote]:border-red-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-6
            [&_strong]:font-bold [&_strong]:text-gray-900
            [&_a]:text-red-600 [&_a]:no-underline hover:[&_a]:underline
            [&_hr]:my-8 [&_hr]:border-gray-200
            [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-sm [&_img]:my-6 [&_img]:border [&_img]:border-gray-200 [&_img]:shadow-sm
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
        <CTASection />
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate('/blog')}
            className="text-gray-500 hover:text-red-600 transition-colors font-mono text-sm tracking-widest uppercase"
          >
            ← 返回工程日志
          </button>
        </div>
      </article>
    </div>
  );
};
