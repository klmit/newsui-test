export interface NewsItem {
  by: string;
  descendants: number;
  id: number;
  kids?: number[];
  score: 1;
  time: number;
  title: string;
  type: string;
  url: string;
  text?: string;
}

export type NewsInitiatlState = {
  items: NewsItem[];
  itemIds: number[];
};
