import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { MdOutlineTextsms, MdPeopleAlt } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import Posts from "./SpacePages/Posts";
import { SpaceDetails } from "@/core/dto/space.dto";

type Props = {
  space: SpaceDetails;
};

const ViewSpaceProfessional = (props: Props) => {
  const [activePage, setActivePage] = useState("Posts");
  const [open, setOpen] = useState(true); // Default open state
  const {posts} = props.space

  const links = [
    {
      label: "Posts",
      href: "#",
      icon: <MdOutlineTextsms />,
      component: <Posts posts={posts}/>,
    },
    {
      label: "Events",
      href: "#",
      icon: <FaCalendar />,
      component: <div>Events</div>,
    },
    {
      label: "Members",
      href: "#",
      icon: <MdPeopleAlt />,
      component: <div>Members</div>,
    },
  ];

  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className={`relative ${open ? "w-64" : "w-16"} flex-shrink-0`}>
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="flex flex-col justify-between gap-10 h-full">
              <div className="flex flex-col flex-1 ">
                
                {/* Sidebar Links */}
                <div className="mt-8 flex flex-col items-start gap-2">
                  {links.map((link, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActivePage(link.label)}
                      className={`cursor-pointer p-2 rounded ${
                        activePage === link.label ? "bg-gray-200 text-black" : ""
                      }`}
                    >
                      <SidebarLink link={link} />
                    </div>
                  ))}
                </div>
              </div>
            </SidebarBody>
          </Sidebar>
        </div>

        {/* Main Content */}
        <div className="flex-1 h-full overflow-auto">
          <div className="p-8">
            {/* Render the selected component */}
            {links.find((link) => link.label === activePage)?.component}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSpaceProfessional;
