import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContents, addContent, updateContent, deleteContent } from '../redux/slices/contentSlice';
import { useParams } from 'react-router-dom';
import { FiEdit, FiX } from 'react-icons/fi';  // Importing icons for edit and delete

const Content = () => {
  const token = useSelector(store => store?.auth['x-access-token']);
  const { id } = useParams();
  const dispatch = useDispatch();
  const contentList = useSelector(store => store?.content?.contents);
  const [newContent, setNewContent] = useState({ content_type: 'text', content_data: { text: '', image_url: '' } });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);  // State to track the edit modal visibility
  const [currentContentId, setCurrentContentId] = useState(null);  // To store the id of the content being edited

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getContents({ id, token }));
    };

    fetchData();
  }, [dispatch, token, id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewContent(prevState => ({
          ...prevState,
          content_data: { ...prevState.content_data, image_url: reader.result }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddContent = () => {
    dispatch(addContent({ ...newContent, token }));
    setNewContent({ content_type: 'text', content_data: { text: '', image_url: '' } });
    setSelectedFile(null);
    setModalOpen(false); // Close modal after adding content
  };

  const handleUpdateContent = () => {
    const updatedContent = { ...newContent, id: currentContentId };
    dispatch(updateContent({ updatedContent, token }));
    setEditModalOpen(false);  // Close the update modal after updating
  };

  const handleDeleteContent = (contentId) => {
    dispatch(deleteContent({ id: contentId, token }));
  };

  const openEditModal = (content) => {
    setNewContent(content);
    setCurrentContentId(content.id);
    setEditModalOpen(true);  // Open the edit modal
  };

  const handleContentTypeChange = (e) => {
    setNewContent({
      ...newContent,
      content_type: e.target.value,
      content_data: e.target.value === 'image' ? { text: '', image_url: '' } : newContent.content_data
    });
  };

  const openAddModal = () => {
    setNewContent({ content_type: 'text', content_data: { text: '', image_url: '' } }); // Reset content values when opening the Add modal
    setModalOpen(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto relative">
      {/* Add Content Button */}
      <button
        onClick={openAddModal} // Use the reset function here
        className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
      >
        +
      </button>

      {/* Add Content Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ease-in-out"
          style={{ zIndex: 100 }} // Set z-index for Add modal
        >
          <div className="bg-white p-8 rounded-lg shadow-xl w-96 transform transition-transform duration-300 ease-in-out scale-100">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Content</h2>
            <div className="mb-4">
              <select
                value={newContent.content_type}
                onChange={handleContentTypeChange} // Content type change allowed here
                className="p-3 border rounded w-full mb-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="text">Text</option>
                <option value="text_and_image">Text and Image</option>
                <option value="image">Image</option>
              </select>
              {newContent.content_type !== 'image' && (
                <input
                  type="text"
                  placeholder="Text"
                  value={newContent.content_data.text}
                  onChange={(e) => setNewContent({ ...newContent, content_data: { ...newContent.content_data, text: e.target.value } })}
                  className="p-3 border rounded w-full mb-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              {newContent.content_type !== 'text' && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="p-3 border rounded w-full mb-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              {newContent.content_data.image_url && (
                <div className="mt-4">
                  <strong className="block mb-2 text-gray-700">Selected Image Preview:</strong>
                  <img
                    src={newContent.content_data.image_url}
                    alt="Selected"
                    className="w-full rounded-md shadow-md transition-transform transform hover:scale-105"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setModalOpen(false)} className="p-3 bg-gray-500 text-white rounded shadow hover:bg-gray-600 transition duration-300">Cancel</button>
              <button onClick={handleAddContent} className="p-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-300">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Content Modal */}
      {isEditModalOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ease-in-out"
          style={{ zIndex: 100 }} // Set z-index for Edit modal
        >
          <div className="bg-white p-8 rounded-lg shadow-xl w-96 transform transition-transform duration-300 ease-in-out scale-100">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Content</h2>
            <div className="mb-4">
              <select
                value={newContent.content_type}
                onChange={handleContentTypeChange}  // Prevent content type change during update
                className="p-3 border rounded w-full mb-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled // Disable content type change during update
              >
                <option value="text">Text</option>
                <option value="text_and_image">Text and Image</option>
                <option value="image">Image</option>
              </select>
              {newContent.content_type !== 'image' && (
                <input
                  type="text"
                  placeholder="Text"
                  value={newContent.content_data.text}
                  onChange={(e) => setNewContent({
                    ...newContent,
                    content_data: { ...newContent.content_data, text: e.target.value }
                  })}
                  className="p-3 border rounded w-full mb-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              {newContent.content_type !== 'text' && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="p-3 border rounded w-full mb-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
              {newContent.content_data.image_url && (
                <div className="mt-4">
                  <strong className="block mb-2 text-gray-700">Selected Image Preview:</strong>
                  <img
                    src={newContent.content_data.image_url}
                    alt="Selected"
                    className="w-full rounded-md shadow-md transition-transform transform hover:scale-105"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setEditModalOpen(false)} className="p-3 bg-gray-500 text-white rounded shadow hover:bg-gray-600 transition duration-300">Cancel</button>
              <button onClick={handleUpdateContent} className="p-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-300">Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Horizontal Content Carousel */}
      <div className="overflow-x-auto py-6">
        <div className="flex space-x-6">
          {contentList && contentList.length > 0 ? (
            contentList.map((content, index) => (
              <div
                key={index}
                className="bg-gray-200 p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 relative w-64"
              >
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    onClick={() => openEditModal(content)}
                    className="p-2 text-green-500 hover:bg-green-100 rounded-full transition"
                    aria-label="Edit Content"
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteContent(content.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-full transition"
                    aria-label="Delete Content"
                  >
                    <FiX size={20} />
                  </button>
                </div>
                <div className="mb-4">
                  <p className="font-medium text-gray-700">
                    <strong>Content Type:</strong> {content.content_type}
                  </p>
                </div>
                <div className="text-gray-600">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Content:</h3>
                  <p>{content.content_data.text}</p>
                  {content.content_type === 'image' || content.content_type === 'text_and_image' ? (
                    content.content_data.image_url ? (
                      <div className="mt-4">
                        <strong className="block mb-2">Image:</strong>
                        <img
                          src={content.content_data.image_url}
                          alt="Content"
                          className="w-full rounded-md shadow-md hover:scale-105 transition duration-300"
                        />
                      </div>
                    ) : (
                      <div className="mt-4 bg-gray-200 text-gray-500 text-center py-4 rounded-md">
                        No image available.
                      </div>
                    )
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-xl text-gray-500">No contents...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
