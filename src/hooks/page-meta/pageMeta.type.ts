export interface PageMetaState {
  title: string;
  icon: string;
}

export interface PageMetaAction {
  getPageMeta(): PageMetaState;
  getSearchParams(name: string): string;
}
