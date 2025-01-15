import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getSections } from '../redux/slices/sectionSlice';
import { FaSortNumericDown } from 'react-icons/fa';

const Section = () => {
  const token = useSelector(store => store?.auth['x-access-token']);
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true); // Start loading
        const response = await dispatch(getSections({ id, token }));
        setSections(response?.payload?.data || []); // Set pages data
        setLoading(false); // Stop loading
      } catch (err) {
        setLoading(false); // Stop loading in case of error
        console.error(err);
      }
    };

    fetchPages();
  }, [dispatch, id, token]);

  return (
    <div className="container mx-auto p-6">
      {/* Loader */}
      {loading && <div className="text-2xl text-center text-blue-600 animate-pulse">Loading...</div>}

      {/* Page cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections?.length > 0 ? (
          sections.map((section) => (
            <Link to={`/${section?._id}/sections`} key={section._id}>
              <div
                className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col justify-center items-center p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-2xl font-semibold mb-2">{section?.name}</h2>
                <div className="absolute bottom-4 right-4 flex items-center bg-white bg-opacity-20 px-3 py-2 rounded-full shadow-md">
                  <FaSortNumericDown className="text-white text-lg mr-2" />
                  <h3 className="text-lg font-medium">Order: {section?.order}</h3>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-2xl text-center text-gray-500">No sections found.</div>
        )}
      </div>
    </div>
  );
};

export default Section;
