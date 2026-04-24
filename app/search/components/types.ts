export interface SearchResultPathSegment {
  label: string;
  href?: string;
}

export interface SearchResult {
  id: string;
  titleHtml: string;
  url: string;
  contentHtml: string;
  contentUrl: string;
  pathSegments: SearchResultPathSegment[];
}
