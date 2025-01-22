import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getSections, addSection, updateSection, deleteSection } from '../redux/slices/sectionSlice';
import { FaSortNumericDown, FaEdit, FaTrash } from 'react-icons/fa';
import logoutUser from '../utils/logoutFunction';

const Section = () => {
  const navigate = useNavigate();

  const token = useSelector(store => store?.auth['x-access-token']);
  const { id } = useParams();
  const dispatch = useDispatch();
  const sections = useSelector(store => store?.section?.sections);
  const [loading, setLoading] = useState(false);

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sectionToEdit, setSectionToEdit] = useState(null);
  const [sectionToDelete, setSectionToDelete] = useState(null);

  // Add/Edit Section State
  const [newSection, setNewSection] = useState({ name: '', order: '' });
  const [updatedSection, setUpdatedSection] = useState({ name: '', order: '',_id: '' });

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoading(true); // Start loading
        const response = await dispatch(getSections({ id, token }));
        console.log(response);
        if(!response?.payload?.success && (response?.payload?.message == 'Token has expired. Please log in again.' || response?.payload?.message == 'Invalid Token')){
          logoutUser(navigate,dispatch);
      }
        
        setLoading(false); // Stop loading
      } catch (err) {
        setLoading(false); // Stop loading in case of error
        console.error(err);
      }
    };

    fetchSections();
  }, [dispatch, id, token]);

  // Handle input change for Add/Edit Section Modal
  const handleSectionChange = (e, setSection) => {
    const { name, value } = e.target;
    setSection(prev => ({ ...prev, [name]: value }));
  };

  // Add Section Submit Handler
  const handleAddSection = async (e) => {
    e.preventDefault();
    if (newSection.name && newSection.order) {
      await dispatch(addSection({ ...newSection,page_id:id, token }));
      await dispatch(getSections({id,token}));
      setShowAddModal(false);
      setNewSection({ name: '', order: ''});
    }
  };

  // Edit Section Submit Handler
  const handleUpdateSection = async (e) => {
    e.preventDefault();
    if (updatedSection.name && updatedSection.order) {
      await dispatch(updateSection({ ...updatedSection, token }));
      await dispatch(getSections({id,token}));
      setShowEditModal(false);
    }
  };

  // Delete Section Handler
  const handleDeleteSection = async () => {
    await dispatch(deleteSection({ id: sectionToDelete, token }));
    await dispatch(getSections({token,id}));
    setShowDeleteModal(false);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Loader */}
      {loading && <div className="text-2xl text-center text-blue-600 animate-pulse">Loading...</div>}

      {/* Section cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections?.length > 0 ? (
          sections.map((section) => (
            <Link to={`/${section?._id}/contents`}><div
              key={section._id}
              className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col justify-between p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold mb-4 text-center">{section?.name}</h2>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <FaSortNumericDown className="text-white text-lg mr-2" />
                  <h3 className="text-lg font-medium">Order: {section?.order}</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setSectionToEdit(section); setUpdatedSection(section); setShowEditModal(true); }}
                    className="text-blue-300 hover:text-blue-400"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => { setSectionToDelete(section._id); setShowDeleteModal(true); }}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            </div>
            </Link>
          ))
        ) : (
          <div className="text-2xl text-center text-gray-500">No sections found.</div>
        )}
      </div>

      {/* Add New Section Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 text-white flex items-center justify-center rounded-full shadow-lg hover:scale-110 transform transition-all duration-300 ease-in-out"
      >
        <span className="text-4xl font-bold">+</span>
      </button>

      {/* Add Section Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Section</h2>
            <form onSubmit={handleAddSection}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Section Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newSection.name}
                  onChange={(e) => handleSectionChange(e, setNewSection)}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="order" className="block text-gray-700">Order</label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={newSection.order}
                  onChange={(e) => handleSectionChange(e, setNewSection)}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                >
                  Add Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Section Modal */}
      {showEditModal && sectionToEdit && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Section</h2>
            <form onSubmit={handleUpdateSection}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Section Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={updatedSection.name}
                  onChange={(e) => handleSectionChange(e, setUpdatedSection)}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="order" className="block text-gray-700">Order</label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={updatedSection.order}
                  onChange={(e) => handleSectionChange(e, setUpdatedSection)}
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
                  Update Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Section Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-4">Do you really want to delete this section? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSection}
                className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section;
