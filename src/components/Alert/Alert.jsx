export const Alert = ({cancel,onConfirm}) =>{
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete this comment?</p>
        <div className="flex justify-end">
          <button 
            className="bg-gray-300 text-gray-700 hover:bg-gray-400 rounded px-4 py-2 mr-2" 
            onClick={cancel}
          >
            Cancel
          </button>
          <button 
            className="bg-red-600 text-white hover:bg-red-700 rounded px-4 py-2" 
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

}