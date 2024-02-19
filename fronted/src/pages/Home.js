// Home.js
import React from 'react';
import { useState } from 'react';
import Navbar from '../components/Navbar';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';

// import Slider from 'react-slick';

// const ProblemCard = ({ title, accuracy, difficulty,topic }) => {
//   return (
//     <div className="bg-gray-100 text-white p-4 grid grid-cols-1 sm:grid-cols-3  sm:px-12 rounded-md shadow-md mb-4  ">
//       <h3 className=" text-black font-semibold mb-2 cursor-pointer text-xl hover:scale-105 hover:text-blue-600 duration-500">{title}</h3>
//       {/* <div className=""> */}
//         <p className="text-purple-700 font ">Accuracy: {accuracy}%</p>
//         <p className={`${difficultyColor(difficulty)} font-semibold `}>
//           Difficulty: {difficulty}
//         </p>
//         <p className='text-blue-600'> {topic}</p>
//       {/* </div> */}
//     </div>
//   );
// };

const difficultyColor = (difficulty) => {
  console.log(difficulty.toLowerCase());
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'text-green-500';
    case 'medium':
      return 'text-yellow-500';
    case 'hard':
      return 'text-red-500';
    default:
      return 'text-blue-500';
  }
};

// const TopicCategory = ({ name, icon }) => {
//   return (
//     <div className="flex items-center bg-white p-4 rounded-md shadow-md mb-4 cursor-pointer">
//       <div className="mr-4 ">{icon}</div>
//       <div>
//         <h3 className="lg:text-lg sm:text-sm md:text-md  font-semibold ">{name}</h3>
//         {/* <p</div> className="text-gray-600">Explore problems in {name}</p> */}
//       </div>
//     </div>
//   );
// };

const Home = () => {

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const topicCategories = [
    { name: 'Array', icon: '🔍' },
    { name: 'Linked List', icon: '🔗' },
    // { name: 'Stack', icon: '⬆️' },
    // { name: 'Queue', icon: '⬇️' },
    { name: 'Tree', icon: '🌳' },
    { name: 'String', icon: '📜' },
    { name: 'Math', icon: '➗' },
    // Add more categories as needed
  ];


  const problems = [
    { title: '1. Two Sum', accuracy: 80, difficulty: 'Easy', status: 'solved ', topic: 'Array' },
    { title: '2. Reverse Integer', accuracy: 75, difficulty: 'Medium', status: 'hasError ', topic: 'Math' },
    { title: '3. Shortest Palindrome', accuracy: 46, difficulty: 'Hard', status: 'pending', topic: 'String' },
    { title: '4. Sort List', accuracy: 64, difficulty: 'Medium', status: 'pending ', topic: 'Linked List' },
    { title: '5. Maximize Subarray Sum', accuracy: 40, difficulty: 'Hard', status: 'hasError ', topic: 'Array' },
    { title: '6. Kth Largest Element in an Array ', accuracy: 60, difficulty: 'Medium', status: 'pending ', topic: 'Array' },
    { title: '7. Path Sum', accuracy: 70, difficulty: 'Easy', status: 'solved ', topic: 'Tree' },
    { title: '8. Count Primes', accuracy: 55, difficulty: 'Medium', status: 'solved ', topic: 'Math' },
    { title: '9. N-Queens', accuracy: 37, difficulty: 'Hard', status: 'hasError ', topic: 'Math' },
    { title: '10.Edit Distance', accuracy: 37, difficulty: 'Hard', status: 'hasError ', topic: 'String' },
    { title: '11. Two Sum', accuracy: 80, difficulty: 'Easy', status: 'solved ', topic: 'Array' },
    { title: '12. Reverse Integer', accuracy: 75, difficulty: 'Medium', status: 'hasError ', topic: 'Math' },
    { title: '13. Shortest Palindrome', accuracy: 46, difficulty: 'Hard', status: 'pending', topic: 'String' },
    { title: '14. Sort List', accuracy: 64, difficulty: 'Medium', status: 'pending ', topic: 'Linked List' },
    { title: '15. Maximize Subarray Sum', accuracy: 40, difficulty: 'Hard', status: 'hasError ', topic: 'Array' },
    { title: '16. Kth Largest Element in an Array ', accuracy: 60, difficulty: 'Medium', status: 'pending ', topic: 'Array' },
    { title: '17. Path Sum', accuracy: 70, difficulty: 'Easy', status: 'solved ', topic: 'Tree' },
    { title: '18. Count Primes', accuracy: 55, difficulty: 'Medium', status: 'solved ', topic: 'Math' },
    { title: '19. N-Queens', accuracy: 37, difficulty: 'Hard', status: 'hasError ', topic: 'Math' },
    { title: '20.Edit Distance', accuracy: 37, difficulty: 'Hard', status: 'hasError ', topic: 'String' },
    { title: '21. Two Sum', accuracy: 80, difficulty: 'Easy', status: 'solved ', topic: 'Array' },
    { title: '22. Reverse Integer', accuracy: 75, difficulty: 'Medium', status: 'hasError ', topic: 'Math' },
    { title: '23. Shortest Palindrome', accuracy: 46, difficulty: 'Hard', status: 'pending', topic: 'String' },
    { title: '24. Sort List', accuracy: 64, difficulty: 'Medium', status: 'pending ', topic: 'Linked List' },
    { title: '25. Maximize Subarray Sum', accuracy: 40, difficulty: 'Hard', status: 'hasError ', topic: 'Array' },
    { title: '26. Kth Largest Element in an Array ', accuracy: 60, difficulty: 'Medium', status: 'pending ', topic: 'Array' },
    { title: '27. Path Sum', accuracy: 70, difficulty: 'Easy', status: 'solved ', topic: 'Tree' },
    { title: '28. Count Primes', accuracy: 55, difficulty: 'Medium', status: 'solved ', topic: 'Math' },
    { title: '29. N-Queens', accuracy: 37, difficulty: 'Hard', status: 'hasError ', topic: 'Math' },
    { title: '30.Edit Distance', accuracy: 37, difficulty: 'Hard', status: 'hasError ', topic: 'String' },
    { title: '31. Two Sum', accuracy: 80, difficulty: 'Easy', status: 'solved ', topic: 'Array' },
    { title: '32. Reverse Integer', accuracy: 75, difficulty: 'Medium', status: 'hasError ', topic: 'Math' },
    { title: '33. Shortest Palindrome', accuracy: 46, difficulty: 'Hard', status: 'pending', topic: 'String' },
    { title: '34. Sort List', accuracy: 64, difficulty: 'Medium', status: 'pending ', topic: 'Linked List' },
    { title: '35. Maximize Subarray Sum', accuracy: 40, difficulty: 'Hard', status: 'hasError ', topic: 'Array' },
    { title: '36. Kth Largest Element in an Array ', accuracy: 60, difficulty: 'Medium', status: 'pending ', topic: 'Array' },
    { title: '37. Path Sum', accuracy: 70, difficulty: 'Easy', status: 'solved ', topic: 'Tree' },
    { title: '38. Count Primes', accuracy: 55, difficulty: 'Medium', status: 'solved ', topic: 'Math' },
    { title: '39. N-Queens', accuracy: 37, difficulty: 'Hard', status: 'hasError ', topic: 'Math' },
    { title: '40.Edit Distance', accuracy: 37, difficulty: 'Hard', status: 'hasError ', topic: 'String' },
  ];

  const filteredProblems = selectedCategory
    ? problems.filter((problem) => problem.topic === selectedCategory)
    : problems;

  const chunkSize = 10;
  const chunkedProblems = [];
  for (let i = 0; i < filteredProblems.length; i += chunkSize) {
    chunkedProblems.push(filteredProblems.slice(i, i + chunkSize));
  }

  const handlePageChange = (index) => {
    setCurrentPage(index);
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-extrabold text-black-300 drop-shadow-lg mb-4">Category</h2>
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {topicCategories.map((category, index) => (
          <div
            key={index}
            className={`cursor-pointer flex items-center bg-white p-4 rounded-md shadow-md mb-4 ${selectedCategory === category.name ? 'border-2 border-blue-500' : ''
              }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            <div className="mr-4">{category.icon}</div>
            <div>
              <h3 className="lg:text-lg sm:text-sm md:text-md font-semibold hover:scale-105 hover:text-blue-600 duration-600">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-3xl font-extrabold text-black-300 drop-shadow-lg mb-4">Problems</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
        {chunkedProblems[currentPage]?.map((problem, index) => (
          <div key={index} className="bg-gray-100 text-white p-4 grid grid-cols-1 sm:grid-cols-3 sm:px-12 rounded-md shadow-md mb-4">
            <div className="flex items-center">
              {/* {problem.status === 'solved' && ( */}
                <span className="text-white bg-green-500 rounded-3xl text-xl font-bold mr-4">
                  ✓
                </span>
              
              <h3 className="text-black font-semibold mb-2 cursor-pointer text-xl hover:scale-105 hover:text-blue-600 duration-500">
                {problem.title}
              </h3>
            </div>
            <p className="text-purple-700 font">Accuracy: {problem.accuracy}%</p>
            <p className={`${difficultyColor(problem.difficulty)} font-semibold`}>
              Difficulty: {problem.difficulty}
            </p>
            <p className='text-blue-600 ml-8'> {problem.topic}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: chunkedProblems.length }, (_, index) => (
          <button
            key={index}
            className={`mx-1 p-2 bg-gray-300 rounded-full hover:bg-gray-500 focus:outline-none ${
              currentPage === index ? 'bg-gray-500 text-white' : ''
            }`}
            onClick={() => handlePageChange(index)}
            >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
        </>
  );
};

export default Home;
