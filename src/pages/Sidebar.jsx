
import { CiSettings } from "react-icons/ci";
import { HiUser } from "react-icons/hi";
import { LuFilePlus, LuFiles } from "react-icons/lu";


import { Sidebar } from "flowbite-react";

export const SidebarComponent = ({ tab, handleTabChange }) => {

  return (
    <Sidebar className="bg-gray-800 w-full md:w-1/4 lg:w-1/5 p-4">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            className={`text-white hover:bg-slate-600 ${tab === "profile" ? "bg-slate-700" : ""
              }`}
            icon={HiUser}
            active={tab === "Overview"}
            onClick={() => handleTabChange("Overview")} // Cambiar el tab sin recargar la página
          >
            Overview
          </Sidebar.Item>
          <Sidebar.Item
            className={`text-white hover:bg-slate-600 ${tab === "posts" ? "bg-slate-700" : ""
              }`}
            icon={LuFilePlus}
            active={tab === "posts"}
            onClick={() => handleTabChange("posts")} // Cambiar el tab sin recargar la página
          >
            Create a Posts
          </Sidebar.Item>
          <Sidebar.Item
            className={`text-white hover:bg-slate-600 ${tab === "posts" ? "bg-slate-700" : ""
              }`}
            icon={LuFiles}
            active={tab === "view-posts"}
            onClick={() => handleTabChange("view-posts")}
          >
            See Posts
          </Sidebar.Item>
          <Sidebar.Item
            className={`text-white hover:bg-slate-600 ${tab === "settings" ? "bg-slate-700" : ""
              }`}
            icon={CiSettings}
            active={tab === "settings"}
            onClick={() => handleTabChange("settings")} // Cambiar el tab sin recargar la página
          >
            Settings
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
