import { BlogCard } from "../components/BlogCard";
import { Navbar } from "../components/Navbar";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if(loading) return <div>loading...</div>
  return (
    <>
      <Navbar />
      <div className="px-6 mx-auto max-w-4xl">
        {blogs.map((blog) => (
          <BlogCard
            blogId={blog?.id}
            authorName={blog?.author?.name || 'Anonymous'}
            publishedDate={blog?.publishedDate}
            title={blog?.title}
            content={blog?.content}
          />
        ))}
      </div>
    </>
  );
};
