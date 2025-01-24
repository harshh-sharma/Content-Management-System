import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContents, addContent, updateContent, deleteContent } from "../redux/slices/contentSlice";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit, FiX, FiPlus, FiArrowLeft } from "react-icons/fi";
import { AiOutlineLoading } from "react-icons/ai";
import logoutUser from "../utils/logoutFunction";
import toast from "react-hot-toast";

const Content = () => {
  const navigate = useNavigate();
  const token = useSelector((store) => store?.auth["x-access-token"]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const contentList = useSelector((store) => store?.content?.contents);

  const [newContent, setNewContent] = useState({ content_type: "text", content_data: { text: "", image_url: "" } });
  const [originalContent, setOriginalContent] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentContentId, setCurrentContentId] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await dispatch(getContents({ id, token }));
      if (response?.payload?.message === "Token has expired. Please log in again.") {
        logoutUser(navigate, dispatch);
      }
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
        setNewContent((prevState) => ({
          ...prevState,
          content_data: { ...prevState.content_data, image_url: reader.result },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddContent = async () => {
    const response = await dispatch(addContent({ id, ...newContent, selectedFile, token }));
    if (response?.payload?.message === "Token has expired. Please log in again." || response?.payload?.message === "Invalid Token") {
      logoutUser(navigate, dispatch);
    } else {
      await dispatch(getContents({ id, token }));
    }
    resetForm();
  };

  const handleUpdateContent = async () => {
    try {
      // Ensure text field is not empty for content that includes text
      if (!newContent.content_data.text.trim() && newContent.content_type !== "image") {
        toast.error("Content text cannot be empty.");
        return;
      }
  
      setLoading(true);
  
      // Check if the image is updated
      const isImageUpdated =
        newContent.content_data.image_url !== originalContent?.content_data?.image_url ||
        newContent.content_data.public_id !== originalContent?.content_data?.public_id;
  
      // Prepare updated content
      const updatedContent = {
        ...newContent,
        id: currentContentId,
        isImageUpdated, // You can send this to your backend for conditional processing
      };
  
      // Dispatch the update request
      const response = await dispatch(updateContent({ updatedContent, token }));
  
      // Handle token expiration or invalid token
      if (response?.payload?.message === "Token has expired. Please log in again." || response?.payload?.message === "Invalid Token") {
        logoutUser(navigate, dispatch);
      } else if (response.error) {
        alert("Failed to update content. Please try again.");
      } else {
        // Refresh content list
        await dispatch(getContents({ id, token }));
        setEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating content:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleDeleteContent = async (contentId) => {
    const response = await dispatch(deleteContent({ contentId, token }));
    if (response?.payload?.message === "Token has expired. Please log in again.") {
      logoutUser(navigate, dispatch);
    } else {
      await dispatch(getContents({ id, token }));
    }
  };

  const openEditModal = (content) => {
    setNewContent(content);
    setOriginalContent(content);
    setCurrentContentId(content.id);
    setEditModalOpen(true);
  };

  const handleContentTypeChange = (e) => {
    setNewContent({
      ...newContent,
      content_type: e.target.value,
      content_data: e.target.value === "image" ? { text: "", image_url: "" } : newContent.content_data,
    });
  };

  const openAddModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const resetForm = () => {
    setNewContent({ content_type: "text", content_data: { text: "", image_url: "" } });
    setSelectedFile(null);
    setModalOpen(false);
    setEditModalOpen(false);
  };

  const handleCloseModal = () => {
    const hasUnsavedChanges =
      newContent.content_data.text !== originalContent?.content_data?.text ||
      newContent.content_data.image_url !== originalContent?.content_data?.image_url;

    if (hasUnsavedChanges && !confirm("You have unsaved changes. Do you really want to close?")) {
      return;
    }
    resetForm();
  };

  const getUserImage = (e) => {
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      setNewContent((prevState) => ({
        ...prevState,
        content_data: { ...prevState.content_data, image_url: uploadImage },
      }));
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.onload = () => {
        setPreviewImage(fileReader.result);
      };
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-100 min-h-screen relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition-transform transform hover:scale-110 duration-300"
        aria-label="Go Back"
      >
        <FiArrowLeft size={24} className="text-gray-700" />
      </button>

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
          onClose={handleCloseModal}
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

const Modal = ({
  title,
  isOpen,
  onClose,
  onSubmit,
  newContent,
  handleContentTypeChange,
  handleFileChange,
  setNewContent,
  previewImage,
  getUserImage,
  isEditing = false,
}) => (
  <div
    className={`fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
      isOpen ? "opacity-100" : "opacity-0"
    }`}
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
        {newContent.content_type !== "image" && (
          <textarea
            value={newContent.content_data.text}
            onChange={(e) =>
              setNewContent((prevState) => ({
                ...prevState,
                content_data: { ...prevState.content_data, text: e.target.value },
              }))
            }
            placeholder="Enter content text"
            className="p-3 border rounded w-full h-20 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        {(newContent.content_type === "image" || newContent.content_type === "text_and_image") && (
          <div className="flex flex-col items-center space-y-4 mt-4">
            <input type="file" accept="image/*" onChange={getUserImage} className="p-3" />
            {previewImage && <img src={previewImage} alt="Preview" className="max-h-40 w-auto rounded-md shadow-md" />}
          </div>
        )}
      </div>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="p-3 bg-gray-200 rounded shadow hover:bg-gray-300 transition duration-300"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className={`p-3 ${isEditing ? "bg-green-600" : "bg-blue-600"} text-white rounded shadow hover:${
            isEditing ? "bg-green-700" : "bg-blue-700"
          } transition duration-300`}
        >
          {isEditing ? "Update" : "Add"}
        </button>
      </div>
    </div>
  </div>
);

const ContentCard = ({ content, onEdit, onDelete }) => (
  <div className="p-4 bg-white shadow rounded-lg relative">
    {content.content_type === "image" || content.content_type === "text_and_image" ? (
      <img src={content.content_data.image_url} alt="Content" className="max-h-40 w-auto mb-4 mx-auto rounded-md" />
    ) : null}
    {content.content_data.text && (
      <p className="text-gray-800 text-center">{content.content_data.text}</p>
    )}
    <div className="absolute top-2 right-2 flex space-x-2">
      <button
        onClick={() => onEdit(content)}
        className="p-2 bg-yellow-400 text-white rounded-full shadow hover:bg-yellow-500 transition-transform transform hover:scale-110 duration-300"
        aria-label="Edit"
      >
        <FiEdit size={18} />
      </button>
      <button
        onClick={() => onDelete(content.id)}
        className="p-2 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition-transform transform hover:scale-110 duration-300"
        aria-label="Delete"
      >
        <FiX size={18} />
      </button>
    </div>
  </div>
);

export default Content;
