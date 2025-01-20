import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContents, addContent, updateContent, deleteContent } from '../redux/slices/contentSlice';
import { useParams } from 'react-router-dom';
import { FiEdit, FiX, FiPlus } from 'react-icons/fi';
import { AiOutlineLoading } from 'react-icons/ai';
import logoutUser from '../utils/logoutFunction';

const Content = () => {
  const token = useSelector(store => store?.auth['x-access-token']);
  const { id } = useParams();
  const dispatch = useDispatch();
  const contentList = useSelector(store => store?.content?.contents);
  const [newContent, setNewContent] = useState({ content_type: 'text', content_data: { text: '', image_url: '' } });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentContentId, setCurrentContentId] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getContents({ id, token }));
      setLoading(false);
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

  const handleAddContent = async () => {
    // Dispatch the action with formData
    const response = await dispatch(addContent({ id, ...newContent,selectedFile ,token }));

    if(response?.payload?.message == 'Token has expired. Please log in again.'){
      logoutUser(navigate,dispatch);
   }
    // Reset the form
    resetForm();
  };
  
  

  const handleUpdateContent = () => {
    const updatedContent = { ...newContent, id: currentContentId };
    dispatch(updateContent({ updatedContent, token }));
    setEditModalOpen(false);
  };

  const handleDeleteContent = (contentId) => {
    dispatch(deleteContent({ id: contentId, token }));
  };

  const openEditModal = (content) => {
    setNewContent(content);
    setCurrentContentId(content.id);
    setEditModalOpen(true);
  };

  const handleContentTypeChange = (e) => {
    setNewContent({
      ...newContent,
      content_type: e.target.value,
      content_data: e.target.value === 'image' ? { text: '', image_url: '' } : newContent.content_data
    });
  };

  const openAddModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const resetForm = () => {
    setNewContent({ content_type: 'text', content_data: { text: '', image_url: '' } });
    setSelectedFile(null);
    setModalOpen(false);
    setEditModalOpen(false);
  };

  const getUserImage = (e) => {
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      setNewContent(prevState => ({
        ...prevState,
        content_data: { ...prevState.content_data, image_url: uploadImage }
      }));
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.onload = () => {
        setPreviewImage(fileReader.result);
      };
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-100 min-h-screen">
      <button
        onClick={openAddModal}
        className="fixed bottom-4 right-4 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110 duration-300"
        aria-label="Add Content"
      >
        <FiPlus size={24} />
      </button>

      {isModalOpen && (
        <Modal
          title="Add New Content"
          isOpen={isModalOpen}
          onClose={resetForm}
          onSubmit={handleAddContent}
          newContent={newContent}
          handleContentTypeChange={handleContentTypeChange}
          handleFileChange={handleFileChange}
          setNewContent={setNewContent}
          previewImage={previewImage}
          getUserImage={getUserImage}
        />
      )}

      {isEditModalOpen && (
        <Modal
          title="Edit Content"
          isOpen={isEditModalOpen}
          onClose={resetForm}
          onSubmit={handleUpdateContent}
          newContent={newContent}
          handleContentTypeChange={handleContentTypeChange}
          handleFileChange={handleFileChange}
          setNewContent={setNewContent}
          previewImage={previewImage}
          getUserImage={getUserImage}
          isEditing
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        {loading ? (
          <div className="text-center text-xl text-gray-500 w-full">
            <AiOutlineLoading size={32} className="animate-spin mx-auto" />
            Loading...
          </div>
        ) : contentList && contentList.length > 0 ? (
          contentList.map((content, index) => (
            <ContentCard
              key={index}
              content={content}
              onEdit={openEditModal}
              onDelete={handleDeleteContent}
            />
          ))
        ) : (
          <div className="text-center text-xl text-gray-500">No contents...</div>
        )}
      </div>
    </div>
  );
};

const Modal = ({ title, isOpen, onClose, onSubmit, newContent, handleContentTypeChange, handleFileChange, setNewContent, previewImage, getUserImage, isEditing = false }) => (
  <div
    className={`fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}
    style={{ zIndex: 100 }}
  >
    <div className="bg-white p-8 rounded-lg shadow-xl w-96 transform transition-transform duration-300 ease-in-out scale-100">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{title}</h2>
      <div className="mb-4">
        <select
          value={newContent.content_type}
          onChange={handleContentTypeChange}
          className="p-3 border rounded w-full mb-4 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isEditing}
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
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="w-full rounded mb-2" />
            ) : (
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.svg"
                onChange={getUserImage}
                className="w-full p-2 bg-gray-50 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        )}
      </div>
      <div className="flex justify-end space-x-4">
        <button onClick={onClose} className="p-3 bg-gray-500 text-white rounded shadow hover:bg-gray-600 transition duration-300">Cancel</button>
        <button onClick={() => {
          console.log("on submit excecuted");
          onSubmit();
          
          
        }} className="p-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition duration-300">{isEditing ? 'Update' : 'Add'}</button>
      </div>
    </div>
  </div>
);

const ContentCard = ({ content, onEdit, onDelete }) => (
  <div
    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 relative"
  >
    <div className="absolute top-3 right-3 flex space-x-2">
      <button
        onClick={() => onEdit(content)}
        className="p-2 text-green-600 hover:bg-green-200 rounded-full transition duration-300"
        aria-label="Edit Content"
      >
        <FiEdit size={20} />
      </button>
      <button
        onClick={() => onDelete(content.id)}
        className="p-2 text-red-600 hover:bg-red-200 rounded-full transition duration-300"
        aria-label="Delete Content"
      >
        <FiX size={20} />
      </button>
    </div>
    <div className="mb-6">
      <p className="font-semibold text-gray-800 text-lg">
        <span className="block mb-1">Content Type:</span>
        <span className="text-blue-600">{content.content_type}</span>
      </p>
    </div>
    <div className="text-gray-600">
      <h3 className="text-xl font-bold text-gray-900 mb-3">Content Details:</h3>
      <p className="mb-4">{content.content_data.text}</p>
      {content.content_type === 'image' || content.content_type === 'text_and_image' ? (
        content.content_data.image_url ? (
          <div className="mt-4">
            <strong className="block mb-2">Image:</strong>
            <img
              src={content.content_data.image_url}
              alt="Content"
              className="w-full rounded-lg shadow-md hover:scale-105 transform transition duration-300 ease-in-out"
            />
          </div>
        ) : (
          <div className="mt-4 bg-gray-100 text-gray-500 text-center py-4 rounded-md">
            No image available.
          </div>
        )
      ) : null}
    </div>
  </div>
);

export default Content;
