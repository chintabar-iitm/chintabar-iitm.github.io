import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export type Article = CollectionEntry<"articles">;
export type Author = CollectionEntry<"authors">;
export type Category = CollectionEntry<"categories">;

function sortByPublishedDateDesc(a: Article, b: Article) {
  return b.data.publishedAt.getTime() - a.data.publishedAt.getTime();
}

export async function getPublishedArticles(): Promise<Article[]> {
  const all = await getCollection("articles");
  return all
    .filter((entry) => !entry.data.draft)
    .sort(sortByPublishedDateDesc);
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const published = await getPublishedArticles();
  return published.filter((entry) => entry.data.featured);
}

export async function getArticlesByType(
  type: "article" | "statement" | "announcement"
): Promise<Article[]> {
  const published = await getPublishedArticles();
  return published.filter((entry) => entry.data.type === type);
}

export async function getArticlesByCategory(
  categorySlug: string
): Promise<Article[]> {
  const published = await getPublishedArticles();
  return published.filter((entry) => entry.data.category === categorySlug);
}

export async function getArticlesByAuthor(
  authorSlug: string
): Promise<Article[]> {
  const published = await getPublishedArticles();
  return published.filter((entry) => entry.data.author === authorSlug);
}

export async function getArticleBySlug(
  slug: string
): Promise<Article | undefined> {
  const published = await getPublishedArticles();
  return published.find((entry) => entry.data.slug === slug);
}

export async function getAllAuthors(): Promise<Author[]> {
  return getCollection("authors");
}

export async function getAuthorBySlug(
  slug: string
): Promise<Author | undefined> {
  const authors = await getAllAuthors();
  return authors.find((entry) => entry.data.slug === slug);
}

export async function getAllCategories(): Promise<Category[]> {
  return getCollection("categories");
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  const categories = await getAllCategories();
  return categories.find((entry) => entry.data.slug === slug);
}
