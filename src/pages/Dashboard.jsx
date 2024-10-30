
import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { CreatePost } from "./CreatePost";
import { Overview } from "./Overview";
import { SidebarComponent } from "./Sidebar";
import { ViewPost } from "./ViewPost";
export const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [tab, setTab] = useState("Overview");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const TabFromURL = urlParams.get("tab");
    if (TabFromURL) {
      setTab(TabFromURL); 
    }
  }, [location.search]);

  const handleTabChange = (tabName) => {
    navigate(`?tab=${tabName}`, { replace: true }); 
    setTab(tabName); 
  };

  return (
    <>
      <div className="w-full mx-auto bg-gray-800 min-h-screen flex flex-col md:flex-row">
        {/* Sidebar */}
        <SidebarComponent tab={tab} handleTabChange={handleTabChange} />

        {/* Main Content */}
        <div className="w-full bg-gray-800 p-8">
          {/* Renderiza el contenido basado en el tab seleccionado */}
          {tab === "Overview" && <Overview />}
          {tab === "view-posts" && <ViewPost />}

          {tab === "posts" && <CreatePost />}
          {tab === "settings" && <div>Settings Page</div>}

        </div>
      </div>
    </>
  );
};
