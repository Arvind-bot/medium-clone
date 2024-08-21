import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { ButtonBlue } from "../components/ButtonBlue";
import { TextInput } from "../components/TextInput";
import { TextArea } from "../components/TextArea";
import axios from "axios";
import { CreateBlogInput } from "@arvind-debug/medium-common";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const CreateBlog = () => {
  const [blogData, setBlogData] = useState<CreateBlogInput>({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState<boolean | undefined>();
  const navigate = useNavigate();
  const handlePublishBlog = async () => {
    try {
      const { title, content } = blogData || {};
      if (!title || !content) {
        alert(
          "Title and content are required, please make sure you filled the title and content."
        );
        return;
      }
      setLoading(true);
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      if (res?.data?.blogId) {
        navigate(`/blog/${res?.data?.blogId}`);
        alert(res?.data?.message);
      } else {
        alert("Sorry, something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      alert(
        (error as any)?.response?.data?.message ||
          "Sorry, something went wrong. Please try again later."
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-6 mx-auto max-w-6xl">
        <div className="">
          <TextInput
            placeholder="Title"
            onChange={(e) => {
              setBlogData({ ...blogData, title: e?.target?.value || "" });
            }}
          />
          <TextArea
            onChange={(e) => {
              setBlogData({ ...blogData, content: e?.target?.value || "" });
            }}
            placeholder="Write your thoughts here..."
          />
          <ButtonBlue
            disabled={loading}
            label={loading ? "Create Blog..." : "Create"}
            onClick={handlePublishBlog}
          />
        </div>
      </div>
    </>
  );
};
