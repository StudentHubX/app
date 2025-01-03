import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { createSpace } from "@/core/professional-http-client";

export function CreateSpace() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // For desktop, use Dialog, otherwise use Drawer
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            + Create New Space
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Space</DialogTitle>
          </DialogHeader>
          <CreateSpaceForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          + Create New Space
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create New Space</DrawerTitle>
        </DrawerHeader>
        <CreateSpaceForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const CreateSpaceForm = ({ className }: any) => {
  // State to hold form data
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [skillLevel, setSkillLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [maxNumberOfStudents, setMaxNumberOfStudents] = useState<number | "">("");

  // Form submission handler
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Compiling the form data into an object
    const spaceData = {
      name,
      description,
      skillLevel,
      maxNumberOfStudents,
    };

    // Log the compiled object (you can replace this with further actions)
    console.log("Space Data:", spaceData);

    try {
      // Call createSpace with the data (mocked API call)
      
      const newSpace = await createSpace(spaceData);
      console.log("Space created:", newSpace);
    } catch (error) {
      console.error("Error creating space:", error);
    }

    // Optionally clear the form fields after submission
    setName("");
    setDescription("");
    setSkillLevel("beginner");
    setMaxNumberOfStudents("");
  };

  return (
    <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="name">Space Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter space name"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter space description"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="skillLevel">Skill Level</Label>
        <select
          id="skillLevel"
          value={skillLevel}
          onChange={(e) => setSkillLevel(e.target.value as "beginner" | "intermediate" | "advanced")}
          className="border rounded-md p-2"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="maxNumberOfStudents">Max number of students</Label>
        <Input
          id="maxNumberOfStudents"
          type="number"
          value={maxNumberOfStudents}
          onChange={(e) => setMaxNumberOfStudents(e.target.value ? parseInt(e.target.value) : "")}
          placeholder="Enter max number of students"
        />
      </div>
      <Button type="submit">Create Space</Button>
    </form>
  );
};
