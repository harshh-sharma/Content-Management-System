const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex flex-col">
      
      <main className="flex-grow container mx-auto px-6 py-12">
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">Manage Your Content Effortlessly</h2>
          <p className="text-xl text-gray-600 mb-10">Experience the ultimate content management system with all the tools you need in one place.</p>
          <a href="#" className="bg-blue-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110">Get Started</a>
        </section>

        <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Easy to Use</h3>
            <p className="text-gray-600">Our intuitive interface ensures you can start managing your content without any hassle.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Powerful Features</h3>
            <p className="text-gray-600">Enjoy a suite of powerful tools designed to simplify your content management process.</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Secure and Reliable</h3>
            <p className="text-gray-600">With top-notch security features, your content is always safe and secure.</p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 ContentPro. All rights reserved.</p>
          <p>Follow us on <a href="#" className="underline hover:text-blue-400">Twitter</a> and <a href="#" className="underline hover:text-blue-400">Facebook</a>.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
