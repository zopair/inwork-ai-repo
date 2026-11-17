/**
 * Pure filtering utilities for the InWork collaborative services marketplace.
 * Kept framework-independent so discovery behavior can be tested with Node's
 * built-in test runner without installing additional dependencies.
 */

/**
 * @param {Array<{id: string, name: string, profession: string, categoryId: string, description?: string, tags?: string[]}>} providers
 * @param {{query?: string, categoryId?: string}} [filters]
 */
export function filterProviders(providers, filters = {}) {
  const query = String(filters.query ?? "").trim().toLocaleLowerCase("ar");
  const categoryId = String(filters.categoryId ?? "").trim();

  return providers.filter((provider) => {
    const matchesCategory = !categoryId || categoryId === "all" || provider.categoryId === categoryId;
    if (!matchesCategory) return false;

    if (!query) return true;

    const searchableText = [
      provider.name,
      provider.profession,
      provider.description,
      ...(provider.tags ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase("ar");

    return searchableText.includes(query);
  });
}
