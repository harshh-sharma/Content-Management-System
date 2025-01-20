import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPages, addPage, updatePage, deletePage } from '../redux/slices/pageSlice';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import FontAwesome icons
import { Link, useNavigate, useParams } from 'react-router-dom';
import logoutUser from '../utils/logoutFunction';

const Page = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const token = useSelector((store) => store?.auth['x-access-token']);
  const dispatch = useDispatch();
  const pages = useSelector((store => store.page.pages));
  const [loading, setLoading] = useState(false);

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pageToEdit, setPageToEdit] = useState(null);
  const [pageToDelete, setPageToDelete] = useState(null);

  // Add Page State
  const [newPage, setNewPage] = useState({ title: '', slug: '' });

  // Edit Page State
  const [updatedPage, setUpdatedPage] = useState({ title: '', slug: '',id:'' });

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        const response = await dispatch(getPages({id, token }));
        console.log('response',response);
        if(response?.payload?.message == 'Token has expired. Please log in again.'){
           logoutUser(navigate,dispatch);
        }
        
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
      }
    };
    fetchPages();
  }, [dispatch, token]);

  // Handle input change for Add Page Modal
  const handleAddPageChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const { name, value } = e.target;
    setNewPage({ ...newPage, [name]: value });
  };

  // Handle input change for Edit Page Modal
  const handleEditPageChange = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop the event from bubbling 
    
    const { name, value } = e.target;
    setUpdatedPage({ ...updatedPage, [name]: value });
  };

  // Add Page Submit Handler
  const handleAddPage = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (newPage.title && newPage.slug) {
      await dispatch(addPage({...newPage,domain_id:id,token}));
      setShowAddModal(false);
      setNewPage({ title: '', slug: '' });
    }
  };

  // Edit Page Submit Handler
  const handleUpdatePage = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop the event from bubbling up

    if (updatedPage.title && updatedPage.slug) {
      updatedPage.token = token;
      dispatch(updatePage({...updatedPage,token}));
      dispatch(getPages({token,id}))
      setShowEditModal(false);
    }
  };

  // Delete Page Handler
  const handleDeletePage = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop the event from bubbling up

    await dispatch(deletePage({pageToDelete,token}));
    await dispatch(getPages({id,token}));
    setShowDeleteModal(false);
  };

  const handleEditButtonClick = (e,page) => {
    e.preventDefault();
    e.stopPropagation();

    setPageToEdit(page);  // Set the page you're editing
    setUpdatedPage({
      title: page?.title,
      slug: page?.slug,
      id: page?._id
    }); // Set the title and slug for the Edit modal form
    setShowEditModal(true); // Open the modal
  };

  const navigateToSection = (e,pageId) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/${pageId}/sections`);
  }

  return (
    <div className="container mx-auto p-4">
      {loading && <div className="text-xl text-center text-gray-500">Loading...</div>}

      {/* Page Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pages?.length > 0 ? (
          pages.map((page) => (
            <div
             onClick={(e) => navigateToSection(e,page?._id)}
              key={page._id}
              className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 relative"
            >
              {/* Edit and Delete Icons at the top right */}
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEditButtonClick(e,page)} // Using the function to set the values
                  className="text-blue-500 hover:text-blue-600"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={(e) => {
                    setPageToDelete(page._id);
                    setShowDeleteModal(true);
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <FaTrash size={20} />
                </button>
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{page.title}</h2>
              <p className="text-gray-600 mb-4">Explore the page by clicking below.</p>

              <div className="text-center">
                <a
                  href={page.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  View Page
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="text-xl text-center text-gray-500">No pages found.</div>
        )}
      </div>

      {/* Add New Page Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center rounded-full shadow-lg hover:scale-110 transform transition-all duration-300 ease-in-out"
      >
        <span className="text-4xl font-bold">+</span>
      </button>

      {/* Add Page Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Page</h2>
            <form onSubmit={handleAddPage}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">Page Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newPage.title}
                  onChange={handleAddPageChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="slug" className="block text-gray-700">Page Slug</label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={newPage.slug}
                  onChange={handleAddPageChange}
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
                  className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Add Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Page Modal */}
      {showEditModal && pageToEdit && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Page</h2>
            <form onSubmit={handleUpdatePage}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">Page Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={updatedPage.title} // Ensure this is the updatedPage state
                  onChange={handleEditPageChange}
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="slug" className="block text-gray-700">Page Slug</label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={updatedPage.slug} // Ensure this is the updatedPage state
                  onChange={handleEditPageChange}
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
                  Update Page
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Page Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this page? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePage}
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

export default Page;
