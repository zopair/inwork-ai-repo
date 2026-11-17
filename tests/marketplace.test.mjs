import test from "node:test";
import assert from "node:assert/strict";
import { filterProviders } from "../src/lib/marketplace.mjs";

const providers = [
  {
    id: "p1",
    name: "أحمد",
    profession: "فني تكييف",
    categoryId: "home",
    description: "صيانة وتنظيف أجهزة التكييف",
    tags: ["تكييف", "صيانة"],
  },
  {
    id: "p2",
    name: "سارة",
    profession: "مصممة هوية بصرية",
    categoryId: "digital",
    description: "تصميم الشعارات والمواد التسويقية",
    tags: ["تصميم", "هوية"],
  },
];

test("returns all providers when no search or category filter is selected", () => {
  assert.deepEqual(filterProviders(providers), providers);
});

test("filters by category without mutating the source collection", () => {
  const result = filterProviders(providers, { categoryId: "digital" });
  assert.deepEqual(result.map((provider) => provider.id), ["p2"]);
  assert.equal(providers.length, 2);
});

test("matches a query against provider name, profession, description, and tags", () => {
  assert.deepEqual(
    filterProviders(providers, { query: "تكييف" }).map((provider) => provider.id),
    ["p1"],
  );
  assert.deepEqual(
    filterProviders(providers, { query: "سارة" }).map((provider) => provider.id),
    ["p2"],
  );
});

test("combines category and text filters", () => {
  assert.deepEqual(
    filterProviders(providers, { categoryId: "home", query: "هوية" }),
    [],
  );
});
