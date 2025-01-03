export interface CreateSpaceDTO {
  name: string;
  description: string;
  maxNumberOfStudents: number | "";
  skillLevel: "beginner" | "intermediate" | "advanced";
}
export interface createSpacePostDTO {
  content: string;
  type: "text" | "image" | "video" | "link";
  id: number;
}
export type SpaceDetails = {
  id: number;
  name: string;
  description: string;
  skillLevel: string;
  maxNumberOfStudents: number;
  industry?: string;
  professionalCoordinator: {
    id: number;
    name: string;
  };
  studentMembers: {
    id: number;
    username: string;
    name: string;
  }[];
  posts: {
    id: number;
    content: string;
    type: string;
    mediaUrl: string;
    createdAt: string;
  }[];
};

export interface spacePost {
  id: number;
  content: string;
  type: string;
  mediaUrl?: string;
  createdAt: string;
}
