import { source } from '@/lib/source';
import { createSearchAPI } from 'fumadocs-core/search/server';
import { createTokenizer } from '@orama/tokenizers/mandarin';

const pages = source.getPages();
const indexes = pages.map((page) => ({
  title: page.data.title,
  description: page.data.description,
  structuredData: page.data.structuredData,
  id: page.url,
  url: page.url,
}));

console.log('[Search Debug] Total indexed pages:', indexes.length);

export const { GET } = createSearchAPI('advanced', {
  indexes,
  tokenizer: createTokenizer(),
});
