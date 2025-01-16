import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDomains, addDomain, deleteDomain, updateDomain } from "../redux/slices/domainSlice";
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing icons

const Domain = () => {
  const token = useSelector((store) => store.auth['x-access-token']);
  const dispatch = useDispatch();
  const domains = useSelector((store) => store.domain.domains);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newDomain, setNewDomain] = useState({ name: "", url: "" });
  const [domainToEdit, setDomainToEdit] = useState(null);

  useEffect(() => {
    dispatch(getDomains());
  }, [dispatch]);

  const handleRedirect = (url) => {
    window.open(url, "_blank");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDomain({
      ...newDomain,
      [name]: value,
    });
  };

  const handleAddDomain = async (e) => {
    e.preventDefault();
    if (newDomain.name && newDomain.url) {
      newDomain.token = token;
      await dispatch(addDomain({...newDomain,token}));
      await dispatch(getDomains());
      setShowModal(false);
      setNewDomain({ name: "", url: "" });
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setDomainToEdit({
      ...domainToEdit,
      [name]: value,
    });
  };

  const handleUpdateDomain = async (e) => {
    e.preventDefault();
    if (domainToEdit.name && domainToEdit.url) {
      await dispatch(updateDomain({...domainToEdit,token}));
      // await dispatch(getDomains());
      setShowEditModal(false);
    }
  };

  const handleDeleteDomain = async (id) => {
    if (window.confirm("Are you sure you want to delete this domain?")) {
      await dispatch(deleteDomain({id,token}));
      await dispatch(getDomains());
    }
  };


  return (
    <div className="flex flex-col items-center p-10 bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen">
      <div className="flex justify-between w-full max-w-6xl mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Domains</h1>
      </div>

      {/* Domain Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {domains?.length > 0 ? (
          domains.map((website, index) => (
            <div key={index} className="relative w-full sm:w-72 md:w-80 lg:w-96 p-6 bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:bg-gray-200">
              
              {/* Edit and Delete Buttons at the top-right */}
              <div className="absolute top-2 right-2 flex gap-4">
                {/* Edit Button */}
                <button
                  onClick={() => { setDomainToEdit(website); setShowEditModal(true); }}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-400 transition-colors shadow-md"
                >
                  <FaEdit className="text-lg" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteDomain(website._id)}
                  className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-500 transition-colors shadow-md"
                >
                  <FaTrashAlt className="text-lg" />
                </button>
              </div>

              {/* Image */}
              <img
                src={"https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600"}
                alt="domain"
                className="w-full h-40 object-cover mb-6 rounded-lg shadow-md"
              />

              {/* Website Name */}
              <h3 className="text-2xl font-semibold text-blue-700 mb-2">{website.name}</h3>

              {/* Website Description */}
              <p className="text-gray-600 text-lg mb-4">
                Explore more about {website.name} by visiting their official site.
              </p>

              {/* Button for Redirect */}
              <button
                onClick={() => handleRedirect(website.url)}
                className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors"
              >
                Visit Website
              </button>
            </div>
          ))
        ) : (
          <div>No domains available</div>
        )}
      </div>

      {/* Add Domain Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Domain</h2>
            <form onSubmit={handleAddDomain}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Domain Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newDomain.name}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="url" className="block text-gray-700">Domain URL</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={newDomain.url}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Add Domain
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Domain Modal */}
      {showEditModal && domainToEdit && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Domain</h2>
            <form onSubmit={handleUpdateDomain}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Domain Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={domainToEdit.name}
                  onChange={handleEditInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="url" className="block text-gray-700">Domain URL</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={domainToEdit.url}
                  onChange={handleEditInputChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Update Domain
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Add Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center rounded-full shadow-lg hover:scale-110 transform transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        <span className="text-4xl font-bold">+</span>
      </button>
    </div>
  );
};

export default Domain;
