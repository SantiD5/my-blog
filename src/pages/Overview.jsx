import React, { useEffect, useState } from "react";
import { FaComments, FaEye, FaUserAlt } from "react-icons/fa"; // Puedes usar estos íconos de react-icons
import { Link } from "react-router-dom";

export const Overview = () => {
  // Estado para almacenar los datos
  const [visits, setVisits] = useState(0);
  const [recentPosts, setRecentPosts] = useState([]);
  const [comments, setComments] = useState(0);
  const [subscribers, setSubscribers] = useState(0);

  // Efecto para cargar los datos (simulando una API call)
  useEffect(() => {
    // Simulación de llamada a la API
    fetch("/api/dashboard/overview")
      .then((response) => response.json())
      .then((data) => {
        setVisits(data.visits);
        setRecentPosts(data.recentPosts);
        setComments(data.comments);
        setSubscribers(data.subscribers);
      })
      .catch((error) => console.error("Error fetching dashboard data:", error));
  }, []);

  return (
         <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Blog Overview</h2>
      
      {/* Sección de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Visitas */}
        <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg shadow-lg">
          <FaEye className="text-pink-600 text-4xl mb-2" />
          <p className="text-lg font-semibold">Visits</p>
          <p className="text-2xl">{visits}</p>
        </div>

        {/* Comentarios */}
        <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg shadow-lg">
          <FaComments className="text-pink-600 text-4xl mb-2" />
          <p className="text-lg font-semibold">Comments</p>
          <p className="text-2xl">{comments}</p>
        </div>

        {/* Suscriptores */}
        <div className="flex flex-col items-center bg-gray-700 p-4 rounded-lg shadow-lg">
          <FaUserAlt className="text-pink-600 text-4xl mb-2" />
          <p className="text-lg font-semibold">Subscribers</p>
          <p className="text-2xl">{subscribers}</p>
        </div>
      </div>

      {/* Publicaciones recientes */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.length === 0 ? (
            <p className="text-gray-400">No recent posts</p>
          ) : (
            recentPosts.map((post) => (
              <div key={post.id} className="bg-gray-700 p-4 rounded-lg shadow-md">
                <Link to={`/gblogs/${post.id}`}>
                  <h4 className="text-lg font-semibold text-pink-500 truncate">
                    {post.title}
                  </h4>
                </Link>
                <p className="text-gray-400 text-sm">
                  Published on {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
 
  );
};
