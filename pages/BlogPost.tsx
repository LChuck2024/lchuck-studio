import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CTASection } from '../components/CTASection';

// 从 src/posts/ 加载，编辑后 HMR 会立即生效
const postModules = import.meta.glob<string>('../src/posts/*.md', { query: '?raw', import: 'default' });

export const BlogPost: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
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
        setContent(text);
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
      <article className="max-w-3xl w-full mt-10 md:mt-20">
        <div className="bg-white shadow-none border border-neutral-200 rounded-sm p-8 md:p-12">
          <div className="blog-content text-gray-800 leading-relaxed [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:font-black [&_h1]:mb-6 [&_h1]:tracking-tight
            [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-gray-200
            [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3
            [&_p]:mb-4 [&_p]:leading-relaxed
            [&_ul]:my-4 [&_ul]:pl-6 [&_li]:my-1
            [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
            [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0
            [&_strong]:font-bold [&_strong]:text-gray-900
            [&_a]:text-red-600 [&_a]:no-underline hover:[&_a]:underline
            [&_hr]:my-8 [&_hr]:border-gray-200
            [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-4 [&_img]:border [&_img]:border-gray-200
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
