
import { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { CreatePost } from "./CreatePost";
import { Overview } from "./Overview";
import { ViewPost } from "./ViewPost";
import { SidebarComponent } from "./Sidebar";
export const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Para navegar sin recargar la página
  const [tab, setTab] = useState("Overview");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const TabFromURL = urlParams.get("tab");
    if (TabFromURL) {
      setTab(TabFromURL); // Actualiza el estado 'tab' con el valor del parámetro URL
    }
  }, [location.search]);

  // Función para actualizar el parámetro 'tab' en la URL sin recargar la página
  const handleTabChange = (tabName) => {
    navigate(`?tab=${tabName}`, { replace: true }); // Navega sin recargar la página
    setTab(tabName); // Actualiza el estado
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
