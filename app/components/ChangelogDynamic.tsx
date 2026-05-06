'use client';

import { useEffect, useState } from 'react';

interface ChangelogEntry {
  version: string;
  date: string;
  features: string[];
  optimizations: string[];
}

export default function ChangelogDynamicPage() {
  const [changelog, setChangelog] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/changelog')
      .then(res => res.json())
      .then(data => {
        setChangelog(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">加载中...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <style>{`
        #nd-page > h1 {
          font-size: 36px !important;
          margin-bottom: 0px !important;
        }

        #nd-page > h1 + p {
          margin-top: 0 !important;
          margin-bottom: 20px !important;
        }
      `}</style>

      <img
        src="/images/support/product-support.png"
        alt="更新日志"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          margin: '0 0 32px 0',
          borderRadius: '12px'
        }}
      />

      <p style={{
        fontSize: '17px',
        color: '#1d1d1f',
        lineHeight: 1.7,
        margin: '12px 0 40px 0'
      }}>
        本日志系统记录并发布 Zleap 产品所有重要功能更新、性能优化及问题修复的官方信息。通过此日志，您可以快速了解 Zleap 的最新改进与技术升级，从而更高效地使用平台功能。我们持续聆听用户反馈，致力于通过快速、敏捷的迭代，让 Zleap 更贴合您的工作流与业务场景。
      </p>

      {changelog.map((entry, index) => (
        <div key={index} style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <span style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#1d1d1f'
            }}>
              {entry.version}
            </span>
            <span style={{
              fontSize: '14px',
              color: '#86868b',
              background: '#F4F4F4',
              padding: '4px 12px',
              borderRadius: '20px'
            }}>
              {entry.date}
            </span>
          </div>

          {entry.features.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <span style={{
                display: 'inline-block',
                background: '#FFE9B9',
                color: '#B45309',
                fontSize: '12px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '20px',
                marginBottom: '12px'
              }}>
                ✦ 新增
              </span>
              <ul style={{
                margin: '0 0 16px 0',
                paddingLeft: '20px',
                color: '#1d1d1f',
                fontSize: '17px',
                lineHeight: 1.7
              }}>
                {entry.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {entry.optimizations.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <span style={{
                display: 'inline-block',
                background: '#EDEDED',
                color: '#5D5D5D',
                fontSize: '12px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '20px',
                marginBottom: '12px'
              }}>
                ⚙ 优化
              </span>
              <ul style={{
                margin: '0 0 16px 0',
                paddingLeft: '20px',
                color: '#1d1d1f',
                fontSize: '17px',
                lineHeight: 1.7
              }}>
                {entry.optimizations.map((optimization, i) => (
                  <li key={i}>{optimization}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
