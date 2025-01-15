import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPages } from '../redux/slices/pageSlice';
import { useParams } from 'react-router-dom';

const Page = () => {
  const token = useSelector(store => store?.auth['x-access-token']);
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true); // Start loading
        const response = await dispatch(getPages({ id, token }));
        console.log("response", response);
        
        setPages(response?.payload?.data || []); // Set pages data
        setLoading(false); // Stop loading
      } catch (err) {
        setLoading(false); // Stop loading in case of error
        console.error(err);
      }
    };

    fetchPages();
  }, [dispatch, id, token]);

  return (
    <div className="container mx-auto p-4">
      {/* Loader */}
      {loading && <div className="text-xl text-center text-gray-500">Loading...</div>}

      {/* Page cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pages?.length > 0 ? (
          pages.map((page) => (
            <div
              key={page._id}
              className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{page.title}</h2> <p className="text-gray-600 mb-4">Explore the page by clicking below.</p>

              {/* Action button to view the page */}
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
    </div>
  );
};

export default Page;
