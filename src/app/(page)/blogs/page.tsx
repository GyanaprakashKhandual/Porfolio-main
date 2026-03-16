import BlogIndexPage from "./pages/Blog.page";

export const metadata = {
  title: "My Blogs",
  description:
    "Read my latest blog posts on software development, technology trends, and insights from my personal experiences in the industry.",
};

function page() {
  return (
    <div>
      <BlogIndexPage />
    </div>
  );
}

export default page;
