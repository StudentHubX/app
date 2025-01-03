import { string } from "zod";


// Example of the type definition
export interface studentSignUpDetails {
  username: string;
  age: number;
  fullname: string;
  facultyId: number;
  country: string;
  email: string;
  password: string;
  gender?: string; // Make gender optional
}

export interface studentLoginDetails {
  username: string;
  password: string;
}
export interface ProfessionalData {
  role: string;
  yearsOfExperience: number;
  nameOfOrganization: string;
  country: string;
  email: string;
  password: string;
  gender?: string;
  username: string;
  age: number;
  fullname: string;
  industryId: number;
}

export interface ProfessionalLoginDetails {
  username: string;
  password: string;
}