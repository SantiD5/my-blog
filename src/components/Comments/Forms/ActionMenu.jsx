const ActionMenu = ({ commentId, handleEdit, deleteHandle }) => (
  <div className="!ml-[174px] absolute mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
    <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100" onClick={() => handleEdit(commentId)}>
      Editar comentario
    </button>
    <button className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100" onClick={() => deleteHandle(commentId)}>
      Eliminar comentario
    </button>
  </div>
);

export default ActionMenu;
