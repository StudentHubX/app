import { createSpacePostDTO, spacePost } from "@/core/dto/space.dto";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  posts: spacePost[];
};

const Post = (data: spacePost) => {
  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-md mb-4 shadow-sm">
      <p className="text-gray-800 dark:text-gray-200">{data.content}</p>
    </div>
  );
};

const Posts = (props: Props) => {
  const [newPost, setNewPost] = useState("");
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Space Posts
        </h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="bg-blue-500 p-3 text-center rounded-full">
              <FaPlus className="text-gray-800 dark:text-gray-200 cursor-pointer" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Text</DropdownMenuItem>
            <DropdownMenuItem>Image/Video</DropdownMenuItem>
            {/* <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-1 p-6 overflow-x-auto">
        {props.posts.map((post) => (
          <Post
            key={post.id}
            content={post.content}
            id={post.id}
            type={post.type}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default Posts;
