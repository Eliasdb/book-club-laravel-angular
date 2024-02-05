export const AUTHORS_QUERY_PARAM = 'author';
export const SEARCH_QUERY_PARAM = 'query';

export type BookQueryParams = {
  [AUTHORS_QUERY_PARAM]?: string;
  [SEARCH_QUERY_PARAM]?: string;
};
