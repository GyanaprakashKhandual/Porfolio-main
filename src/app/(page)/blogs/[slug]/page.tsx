import BlogDetailPage from "../pages/Blog.detail.page";

export const metadata = {
  title: "Blog Detail",
  description:
    "Read the full details of this blog post, including insights, analysis, and my personal experiences related to the topic.",
};

function page() {
  return (
    <div>
      <BlogDetailPage />
    </div>
  );
}

export default page;
