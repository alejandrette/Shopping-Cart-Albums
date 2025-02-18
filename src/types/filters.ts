export interface Filters {
  author: string;
  maxPrice: number;
}

export interface FiltersProps {
  filters: Filters;
  onAuthorChange: (value: string) => void;
  onMaxPriceChange: (value: number) => void;
  authorUnique: string[];
}