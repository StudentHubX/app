import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { studentLogin, studentSignUp } from "@/core/student-http-client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { ProfessionalData, ProfessionalLoginDetails } from "@/core/dto/user.dto";
import { professionalLogin, professionalSignUp } from "@/core/professional-http-client";

// Schema for signup form
const signupSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  age: z.number().positive({ message: "Age is required" }),
  fullname: z.string().min(1, { message: "Full name is required" }),
  yearsOfExperience: z
    .number()
    .min(1, { message: "How many years have you been in your industry" }),
  nameOfOrganization: z
    .string()
    .min(1, { message: "Tell us the name of your organization" }),
  role: z
    .string()
    .min(1, { message: "Tell us your current role at your organization" }),
  country: z.string().min(1, { message: "Country is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  gender: z.string().optional(),
  industryId: z.number().min(1, { message: "IndustryId is required" }),
});

// Schema for login form
const loginSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

const Professional = () => {
  const [isLogin, setIsLogin] = useState(false);

  const form = useForm<z.infer<typeof signupSchema | typeof loginSchema>>({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    defaultValues: {
      username: "",
      password: "",
      age: 18,
      country: "",
      email: "",
      fullname: "",
      gender: "m",
      nameOfOrganization: "",
      yearsOfExperience: 0,
      role: "",
      industryId: 212, 
    },
  });

  function onSubmit(values: ProfessionalData | z.infer<typeof loginSchema>) {
    if (!isLogin) {
      const signupValues = values as ProfessionalData;
      professionalSignUp(signupValues);
    } else {
      const loginValues = values as ProfessionalLoginDetails;
      professionalLogin(loginValues);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {/* Username field */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!isLogin && (
            <>
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your Industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="212">Technology</SelectItem>
                        <SelectItem value="213">Gaming</SelectItem>
                        <SelectItem value="214">Data Science</SelectItem>
                        <SelectItem value="215">Cybersecurity</SelectItem>
                        <SelectItem value="216">
                          Hardware Development
                        </SelectItem>
                        <SelectItem value="217">
                          Software Development
                        </SelectItem>
                        <SelectItem value="218">
                          Artificial Intelligence
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m">Male</SelectItem>
                        <SelectItem value="f">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Age" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nameOfOrganization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name of Organization</FormLabel>
                    <FormControl>
                      <Input
                        type="string"
                        placeholder="Name Of Organization"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="5"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input type="string" placeholder="Role" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Where are you from?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          "Afghanistan",
                          "Albania",
                          "Algeria",
                          "Andorra",
                          "Angola",
                          "Antigua and Barbuda",
                          "Argentina",
                          "Armenia",
                          "Australia",
                          "Austria",
                          "Azerbaijan",
                          "Bahamas",
                          "Bahrain",
                          "Bangladesh",
                          "Barbados",
                          "Belarus",
                          "Belgium",
                          "Belize",
                          "Benin",
                          "Bhutan",
                          "Bolivia",
                          "Bosnia and Herzegovina",
                          "Botswana",
                          "Brazil",
                          "Brunei",
                          "Bulgaria",
                          "Burkina Faso",
                          "Burundi",
                          "Cabo Verde",
                          "Cambodia",
                          "Cameroon",
                          "Canada",
                          "Central African Republic",
                          "Chad",
                          "Chile",
                          "China",
                          "Colombia",
                          "Comoros",
                          "Congo",
                          "Costa Rica",
                          "Croatia",
                          "Cuba",
                          "Cyprus",
                          "Czech Republic",
                          "Democratic Republic of the Congo",
                          "Denmark",
                          "Djibouti",
                          "Dominica",
                          "Dominican Republic",
                          "East Timor",
                          "Ecuador",
                          "Egypt",
                          "El Salvador",
                          "Equatorial Guinea",
                          "Eritrea",
                          "Estonia",
                          "Eswatini",
                          "Ethiopia",
                          "Fiji",
                          "Finland",
                          "France",
                          "Gabon",
                          "Gambia",
                          "Georgia",
                          "Germany",
                          "Ghana",
                          "Greece",
                          "Grenada",
                          "Guatemala",
                          "Guinea",
                          "Guinea-Bissau",
                          "Guyana",
                          "Haiti",
                          "Honduras",
                          "Hungary",
                          "Iceland",
                          "India",
                          "Indonesia",
                          "Iran",
                          "Iraq",
                          "Ireland",
                          "Israel",
                          "Italy",
                          "Jamaica",
                          "Japan",
                          "Jordan",
                          "Kazakhstan",
                          "Kenya",
                          "Kiribati",
                          "North Korea",
                          "South Korea",
                          "Kuwait",
                          "Kyrgyzstan",
                          "Laos",
                          "Latvia",
                          "Lebanon",
                          "Lesotho",
                          "Liberia",
                          "Libya",
                          "Liechtenstein",
                          "Lithuania",
                          "Luxembourg",
                          "Madagascar",
                          "Malawi",
                          "Malaysia",
                          "Maldives",
                          "Mali",
                          "Malta",
                          "Marshall Islands",
                          "Mauritania",
                          "Mauritius",
                          "Mexico",
                          "Micronesia",
                          "Moldova",
                          "Monaco",
                          "Mongolia",
                          "Montenegro",
                          "Morocco",
                          "Mozambique",
                          "Myanmar",
                          "Namibia",
                          "Nauru",
                          "Nepal",
                          "Netherlands",
                          "New Zealand",
                          "Nicaragua",
                          "Niger",
                          "Nigeria",
                          // Add more countries as needed
                        ].map((country) => (
                          <SelectItem
                            key={country.toLowerCase().replace(/\s+/g, "-")}
                            value={country}
                          >
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{isLogin ? "Login" : "Sign Up"}</Button>

          <div className="flex justify-between text-center">
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Professional;
