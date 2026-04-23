export interface SearchableDoc {
  title: string;
  keywords: string[];
  href: string;
}

export const searchableDocs: SearchableDoc[] = [
  { title: '快速开始', keywords: ['快速', '开始', '入门', '新手'], href: '/docs/getting-started/quick-start' },
  { title: '下载使用', keywords: ['下载', '安装', '使用'], href: '/docs/getting-started/download' },
  { title: '什么是 Zleap', keywords: ['什么', 'Zleap', '介绍', '关于'], href: '/docs/about-zleap/about' },
  { title: '企业版', keywords: ['企业', '企业版', '私有化', '部署'], href: '/docs/about-zleap/enterprise' },
  { title: '信息管理', keywords: ['信息', '管理', '信息源'], href: '/docs/information-management/information-management' },
  { title: '事件表格', keywords: ['事件', '表格'], href: '/docs/information-management/event-table' },
  { title: '订阅共享信息源', keywords: ['订阅', '共享', '信息源'], href: '/docs/information-management/subscribe-shared' },
  { title: '创建私有信息源', keywords: ['创建', '私有', '信息源'], href: '/docs/information-management/create-private' },
  { title: 'GitHub', keywords: ['GitHub', 'git'], href: '/docs/information-management/create-private/github' },
  { title: 'GitLab', keywords: ['GitLab', 'git'], href: '/docs/information-management/create-private/gitlab' },
  { title: 'Gitee', keywords: ['Gitee', 'git'], href: '/docs/information-management/create-private/gitee' },
  { title: 'RSS', keywords: ['RSS', '订阅'], href: '/docs/information-management/create-private/rss' },
  { title: '网页爬虫', keywords: ['网页', '爬虫', 'crawler'], href: '/docs/information-management/create-private/web-crawler' },
  { title: '浏览器插件', keywords: ['浏览器', '插件', 'extension'], href: '/docs/information-management/create-private/browser-extension' },
  { title: '飞书机器人', keywords: ['飞书', '机器人', 'bot'], href: '/docs/information-management/create-private/feishu-bot' },
  { title: 'SaleSmartly', keywords: ['SaleSmartly', '客服'], href: '/docs/information-management/create-private/salesmartly' },
  { title: '识别 Agent 与真人', keywords: ['识别', 'Agent', '真人', 'AI'], href: '/docs/support/agent-vs-human' },
  { title: '通知中心', keywords: ['通知', '中心', '消息'], href: '/docs/support/notification-center' },
  { title: '语言设置', keywords: ['语言', '设置', 'language'], href: '/docs/support/language-settings' },
  { title: '更新日志', keywords: ['更新', '日志', 'changelog'], href: '/docs/support/changelog' },
  { title: '联系我们', keywords: ['联系', '反馈', '帮助'], href: '/docs/contact/contact' },
  { title: '提交反馈', keywords: ['提交', '反馈', '建议'], href: '/docs/contact/feedback' },
];
