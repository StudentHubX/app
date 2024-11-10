import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPost } from "@/core/student-http-client";
import useUserState from "@/core/useStore";
import { Textarea } from "@/components/ui/textarea";

type Props = {};

const Feed = (props: Props) => {
  return (
    <div className="mt-6 mx-5">
      <div className="flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold tracking-wide">Your Feed</h1>
        <CreatePostDialog />
      </div>
    </div>
  );
};

function CreatePostDialog() {
    const user = useUserState(state => state.user)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async() => {
    const newPost = await createPost({title: formData.title, content: formData.content, authorId: user?.id, isStudent: user?.isStudent})
    console.log(newPost)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 rounded-full bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300">
          <FiPlus size={24} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share your thoughts</DialogTitle>
          <DialogDescription>Keep things streamlined to the topic.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              Content
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Feed;
