'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangelogAdminPage() {
  const [password, setPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [entries, setEntries] = useState<any[]>([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    // 检查是否已经在主后台登录
    const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
      setAdminPassword(sessionStorage.getItem('admin_password') || '');
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/changelog/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        setMessage('');
        setAdminPassword(password);
        sessionStorage.setItem('admin_authenticated', 'true');
        sessionStorage.setItem('admin_password', password);
      } else {
        setMessage('密码错误');
      }
    } catch (error) {
      setMessage('登录失败，请重试');
    }
  };

  const parseContent = (text: string) => {
    const lines = text.trim().split('\n').filter(line => line.trim());
    if (lines.length < 2) {
      throw new Error('格式错误：至少需要版本号和日期');
    }

    const firstLine = lines[0].trim();
    const parts = firstLine.split(/\s+/);
    if (parts.length < 2) {
      throw new Error('格式错误：第一行应该是 "版本号 日期"');
    }

    const version = parts[0];
    const date = parts[1];
    const features: string[] = [];
    const optimizations: string[] = [];

    let currentSection = '';

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === '新增' || line === '✦ 新增') {
        currentSection = 'features';
      } else if (line === '优化' || line === '⚙ 优化') {
        currentSection = 'optimizations';
      } else if (line && currentSection) {
        const cleanLine = line.replace(/^[-•]\s*/, '');
        if (currentSection === 'features') {
          features.push(cleanLine);
        } else if (currentSection === 'optimizations') {
          optimizations.push(cleanLine);
        }
      }
    }

    return { version, date, features, optimizations };
  };

  const fetchEntries = async () => {
    try {
      const res = await fetch('/api/changelog');
      if (res.ok) {
        const data = await res.json();
        setEntries(data || []);
      }
    } catch (error) {
      // ignore
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEntries();
    }
  }, [isAuthenticated]);

  const handleDelete = async (version: string) => {
    if (!confirm(`确定删除已发布的版本 ${version} 吗？`)) return;
    try {
      const res = await fetch(`/api/changelog?version=${encodeURIComponent(version)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': adminPassword,
        },
      });
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body?.error || '删除失败');
      }
      setMessage('删除成功');
      fetchEntries();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '删除失败');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const parsed = parseContent(content);

      const response = await fetch('/api/changelog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      });

      if (!response.ok) {
        throw new Error('发布失败');
      }

      setMessage('发布成功！');
      setContent('');
      fetchEntries();

      setTimeout(() => {
        router.push('/docs/support/changelog');
      }, 1500);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '发布失败');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">更新日志管理</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
                placeholder="请输入密码"
              />
            </div>
            {message && (
              <p className="text-red-500 text-sm mb-4">{message}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#FF8A00] text-white py-2 rounded-lg hover:bg-[#FF9A1A] transition-colors"
            >
              登录
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6">发布更新日志</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                更新内容
              </label>
              <div className="mb-2 text-sm text-gray-500">
                <p>格式示例：</p>
                <pre className="bg-gray-50 p-3 rounded mt-2 text-xs">
{`V1.8.0 2026.5.6
新增
支持生成 HTML 格式报告
来源详情支持飞书多张图片展示
优化
修复了一些 Bug，提升用户体验`}
                </pre>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent font-mono text-sm"
                placeholder="粘贴更新内容..."
              />
            </div>

            {message && (
              <p className={`text-sm mb-4 ${message.includes('成功') ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </p>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || !content.trim()}
                className="flex-1 bg-[#FF8A00] text-white py-2 rounded-lg hover:bg-[#FF9A1A] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? '发布中...' : '发布'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/docs/support/changelog')}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
            </div>
          </form>

          <div className="mt-8">
            <h2 className="text-lg font-medium mb-4">已发布更新日志</h2>
            {entries.length === 0 ? (
              <p className="text-sm text-gray-500">暂无已发布条目</p>
            ) : (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <div key={entry.version} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-base font-semibold">{entry.version}</div>
                        <div className="text-sm text-gray-500">{entry.date}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(entry.version)}
                        className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600"
                      >
                        删除
                      </button>
                    </div>
                    <div className="mt-3 text-sm text-gray-700">
                      {entry.features && entry.features.length > 0 && (
                        <div className="mb-2">
                          <div className="font-semibold">新增</div>
                          <ul className="list-disc pl-5">
                            {entry.features.map((item: string, index: number) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {entry.optimizations && entry.optimizations.length > 0 && (
                        <div>
                          <div className="font-semibold">优化</div>
                          <ul className="list-disc pl-5">
                            {entry.optimizations.map((item: string, index: number) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
