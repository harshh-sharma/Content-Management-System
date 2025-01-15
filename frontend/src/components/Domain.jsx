import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDomains } from "../redux/slices/domainSlice";
import { Link } from "react-router-dom";

const Domain = () => {
  const dispatch = useDispatch();
  const domains = useSelector((store) => store.domain.domains);

  useEffect(() => {
    dispatch(getDomains());
  }, [dispatch]);

  const handleRedirect = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-wrap gap-8 p-10 justify-center bg-gradient-to-r from-gray-100 to-gray-300">
      {domains?.length > 0 ? (
        domains.map((website, index) => (
          <Link to={`/${website?._id}/pages`}>
          <div
            key={index}
            className="w-full sm:w-72 md:w-80 lg:w-96 p-6 bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:bg-gray-200"
          >
            {/* Image */}
            <img
              src={"https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600"}
              alt="image"
              className="w-full h-40 object-cover mb-6 rounded-lg shadow-md"
            />

            {/* Website Name */}
            <h3 className="text-2xl font-semibold text-blue-700 mb-2">{website.name}</h3>

            {/* Website Description */}
            <p className="text-gray-600 text-lg mb-4">Explore more about {website.name} by visiting their official site.</p>

            {/* Button for Redirect */}
            <button
              onClick={() => handleRedirect(website.url)}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
            >
              Visit Website
            </button>
          </div>
          </Link>
        ))
      ) : (
        <div>No domains available</div>
      )}
    </div>
  );
};

export default Domain;
