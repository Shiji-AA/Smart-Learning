import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../../api/axiosinstance";

interface ProgressbarProps {
  courseId: string | undefined;
  
}

const Progressbar: React.FC<ProgressbarProps> = ({ courseId ,lessonDetails}) => {
  const [lessonCount, setLessonCount] = useState<number>(0);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  useEffect(() => {
    if (courseId) {
      axiosInstance
        .get(`/getalllessons/${courseId}`)
        .then((response) => {
          if (response.data && response.data.lessonDetails) {
            console.log(response.data,"It is here !!!")
            const count = response.data.lessonDetails?.lessons?.length;
            console.log(count,"yes !!!")
            setLessonCount(count);
          }
        })
        .catch((error) => {
          console.error("Error fetching lesson count:", error);
        });
    }
  }, [courseId]);

  const handleButtonClick = () => {
    if (progressPercentage < 100) {
      setProgressPercentage(progressPercentage + 20);
    }
  };

 

  const getColor = () => {
    if (progressPercentage < 40) {
      return "#ff0000";
    } else if (progressPercentage < 70) {
      return "#ffa500";
    } else {
      return "#2ecc71";
    }
  };

  return (
    <div>
      <div className="block p-4 m-auto bg-gray-300 rounded-lg shadow w-72">
        <div>
          <span className="text-xs font-light inline-block py-1 px-2 uppercase rounded-full text-white bg-blue-700">
            Course in progress
          </span>
        </div>

        <div className="bg-yellow-300 rounded-lg " style={{ width: 250, height: 20 }}>
          <div className="w-full h-5 bg-gray-400 rounded-full mt-3" style={{ width: `${progressPercentage}%`, backgroundColor: getColor() }}>
            <div className="w-3/4 h-full text-center text-xs text-white rounded-full">
              {progressPercentage}%
            </div>
          </div>
        </div>

        <button onClick={handleButtonClick} className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
          Progress
        </button>
      </div>

      <div>
        <p>Total number of lessons: {lessonCount}</p>
      </div>
    </div>
  );
}

export default Progressbar;
