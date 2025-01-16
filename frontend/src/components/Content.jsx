import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getContents } from '../redux/slices/contentSlice';
import { useParams } from 'react-router-dom';

const Content = () => {
  const token = useSelector(store => store?.auth['x-access-token']);
  const { id } = useParams();
  const dispatch = useDispatch();
  const contentList = useSelector(store => store?.content?.contents); // Assuming the API returns an array of contents

  // Fetch content data when the component mounts or id/token changes
  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(getContents({ id, token }));
    };

    fetchData();
  }, [dispatch, token, id]);

  // Check if content is available before rendering
  if (!contentList || contentList.length === 0) {
    return <div className="text-center text-xl text-gray-500">No contents...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Content Details</h1> */}

      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {contentList.map((content, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105">
            {/* Content Header */}
            <div className="mb-4">
              <p className="font-medium text-gray-700">
                <strong>Section ID:</strong> {content.section_id}
              </p>
              <p className="font-medium text-gray-700">
                <strong>Content Type:</strong> {content.content_type}
              </p>
            </div>

            {/* Content Body */}
            <div className="text-gray-600">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Content:</h3>
              <p>{content.content_data.text}</p>

              {/* Conditionally Render Image */}
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
        ))}
      </div>
    </div>
  );
};

export default Content;
