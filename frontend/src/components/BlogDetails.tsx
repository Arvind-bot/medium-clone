import { Blog } from "../hooks";
import { Avatar } from "./Avatar";

export const BlogDetails = ({ blog }:{blog: Blog | undefined}) => {
  return (
    <div className="">
      <div className="px-6 py-12 mx-auto max-w-7xl grid grid-cols-12 order-last">
        <div className="col-span-12 md:col-span-8">
          <div className="text-5xl font-extrabold">{blog?.title}</div>
          <div className="text-slate-500 mt-3">Posted on August 15th, 2023</div>
          <div className="mt-5 text-lg text-slate-800 font-medium"><pre className="text-wrap">{blog?.content}</pre></div>
        </div>
        <div className="col-span-12  order-first mb-2 md:mb-0 md:col-span-4 md:order-last">
          <div className="font-medium text-md">Author</div>
          <div className="mt-3 flex items-center gap-3">
            <div>
              <Avatar
                bgColor="bg-slate-200"
                size="medium"
                name={blog?.author?.name || ""}
              />
            </div>
            <div>
              <div className="text-xl font-extrabold">{blog?.author?.name}</div>
              {/* {blog?.author?.description ? ( */}
              <div className="mt-1 text-slate-500 font-medium">
              Sample description, need to ask for this while creating an account, will add it later if feasible.
              </div>
              {/* ) : null} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
