// Home.js
import React from 'react';
import { useState } from 'react';
import Navbar from '../features/codeeditor/components/Navbar';
import Problems from '../features/codeeditor/components/Problems';

const Home = () => {

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const topicCategories = [
    { name: 'array', icon: '🔍' },
    { name: 'graph', icon: '🔗' },
    { name: 'tree', icon: '🌳' },
    { name: 'string', icon: '📜' },
    { name: 'two pointers', icon: '➗' },
    // Add more categories as needed
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
  };


  return ( 
    <>
    <Navbar onSearch={handleSearch}/>
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-extrabold text-black-300 drop-shadow-lg mb-4">Category</h2>
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {topicCategories.map((category, index) => (
          <div
            key={index}
            className={`cursor-pointer flex items-center bg-white p-4 rounded-md shadow-md mb-4 ${selectedCategory === category.name ? 'border-2 border-blue-500' : ''
              }`}
            onClick={() => {
              if(category.name===selectedCategory){
                setSelectedCategory(null);
              }
              else{
                setSelectedCategory(category.name)
              }
            }}
          >
            <div className="mr-4">{category.icon}</div>
            <div>
              <h3 className="lg:text-lg sm:text-sm md:text-md font-semibold hover:scale-105 hover:text-blue-600 duration-600">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-3xl font-extrabold text-black-300 drop-shadow-lg mb-4">Problems</h2>
     <Problems  selectedCategory={selectedCategory} currentPage={currentPage} setCurrentPage={setCurrentPage} searchQuery={searchQuery}/>  
    </div>
    </>
  );
};

export default Home;
