const Card = ({ title, description, image, onDelete, onEdit }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        className="w-full h-48 object-cover"
        src={image || "/property.png"}
        alt={title}
      />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>

      {/* Buttons: Edit + Delete */}
      <div className="flex gap-2 px-6 pb-4">
        <button
          onClick={onEdit}
          className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded transition-all duration-200"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition-all duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
