import React from 'react';

// Data for websites (name, URL)
const websites = [
  { name: 'Google', url: 'https://www.google.com' },
  { name: 'Facebook', url: 'https://www.facebook.com' },
  { name: 'Twitter', url: 'https://www.twitter.com' },
  { name: 'GitHub', url: 'https://www.github.com' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com' },
];

const Domain = () => {
  return (
    <div className="flex flex-wrap gap-8 p-10 justify-center bg-gradient-to-r from-gray-100 to-gray-300">
      {websites.map((website, index) => (
        <div
          key={index}
          className="w-72 p-6 bg-white rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 hover:shadow-2xl hover:bg-blue-50"
        >
          {/* Image */}
          <img
            src={"https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=600"}
            alt="image"
            className="w-full h-40 object-cover mb-6 rounded-lg shadow-md"
          />

          {/* Website Name */}
          <h3 className="text-2xl font-bold text-blue-600 mb-2">{website.name}</h3>

          {/* Website URL */}
          <a
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 text-lg hover:text-blue-600 hover:underline"
          >
            {website.url}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Domain;
