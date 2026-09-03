export interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  summary: string;
}

export interface BookSearchResponse {
  count: number;
  items: Book[];
}
