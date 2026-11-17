export type ProviderSearchRecord = {
  id: string;
  name: string;
  profession: string;
  categoryId: string;
  description?: string;
  tags?: string[];
};

export type ProviderFilters = {
  query?: string;
  categoryId?: string;
};

export function filterProviders<T extends ProviderSearchRecord>(
  providers: T[],
  filters?: ProviderFilters,
): T[];
