import type { RootState } from "../../store";

export const selectAllBlogs = (state: RootState) => state.blogs.list;
export const selectBlogsTotal = (state: RootState) => state.blogs.total;
export const selectSelectedBlog = (state: RootState) =>
  state.blogs.selectedBlog;
export const selectBlogsLoading = (state: RootState) => state.blogs.loading;
export const selectBlogsError = (state: RootState) => state.blogs.error;

export const selectBlogBySlug = (slug: string) => (state: RootState) =>
  state.blogs.list.find((b) => b.slug === slug) ?? null;