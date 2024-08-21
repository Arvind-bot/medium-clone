import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { Navbar } from "../components/Navbar";
import { BlogDetails } from "../components/BlogDetails";

export const Blog = () => {
  const params = useParams();
  const { id: blogId = "" } = params || {};
  const { loading, blog } = useBlog(blogId);

  if (loading) return <div>loading...</div>;
  return (
    <>
      <Navbar />
      <BlogDetails blog={blog}/>
    </>
  );
};
