import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProblemAsync, selectAllProblems } from '../codeSlice';
import { Link } from 'react-router-dom';

const Problems = ({selectedCategory, currentPage, setCurrentPage, }) => {

    const dispatch = useDispatch();
    const problems = useSelector(selectAllProblems);
    console.log(problems);

    const filteredProblems = selectedCategory ? problems.filter((problem) => problem.TopicName[0] === selectedCategory): problems;

    console.log(filteredProblems);

    const difficultyColor = (difficulty) => {
        switch (difficulty) {
          case 'Easy':
            return 'text-green-500';
          case 'Medium':
            return 'text-yellow-500';
          case 'Hard':
            return 'text-red-500';
          default:
            return 'text-blue-500';
        }
      };

    const chunkSize = 10;
    const chunkedProblems = [];
    for (let i = 0; i < filteredProblems.length; i += chunkSize) {
      chunkedProblems.push(filteredProblems.slice(i, i + chunkSize));
    }
  
    const handlePageChange = (index) => {
      setCurrentPage(index);
    };

    useEffect(()=>{
        dispatch(fetchAllProblemAsync());
    },[])

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
    {Object.keys(chunkedProblems).length && chunkedProblems[currentPage]?.map((problem, index) => (
    <Link to={`/${problem.id}/`}>
      <div key={index} className="bg-gray-100 text-white p-4 grid grid-cols-1 sm:grid-cols-3 sm:px-12 rounded-md shadow-md mb-4">
        <div className="flex items-center">
          {/* {problem.status === 'solved' && ( */}
            <span className="text-white bg-green-500 rounded-3xl text-xl font-bold mr-4">
              ✓
            </span>
          
          <h3 className="text-black font-semibold mb-2 cursor-pointer text-xl hover:scale-105 hover:text-blue-600 duration-500">
            {problem.ProblemName} 
          </h3>
        </div>
        <p className="text-purple-700 font">Accuracy: {problem.Accuracy}%</p>
        <p className={`${difficultyColor(problem.DifficultyLevel)} font-semibold`}>
          Difficulty: {problem.DifficultyLevel}
        </p>
        <p className='text-blue-600 ml-8'> {problem.TopicName}</p>
      </div>
    </Link> 
    ))}
    <div className="flex justify-center my-4">
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
  </div>  )
}



export default Problems