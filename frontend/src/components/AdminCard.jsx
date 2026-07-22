import { Link } from "react-router-dom";

const AdminCard = ({ title, description, color, link, button }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
      <h2 className={`text-2xl font-bold ${color}`}>
        {title}
      </h2>

      <p className="text-gray-500 mt-3">
        {description}
      </p>

      <Link
        to={link}
        className="inline-block mt-6 bg-blue-700 text-white px-5 py-3 rounded-xl hover:bg-blue-800"
      >
        {button}
      </Link>
    </div>
  );
};

export default AdminCard;