import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from "../../../api/axiosinstance";

interface Question {
  _id: string;
  courseId: string; 
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answerOption: string;
}

function StudentQuizForm() {
  const { courseId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(2);
  const [showScore, setShowScore] = useState<boolean>(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axiosInstance.get(`/quizList/${courseId}`);
        const allQuizSets = response.data.allQuizSets;

        if (!Array.isArray(allQuizSets)) {
          throw new Error("Quiz sets data is not in the expected format.");
        }

        const questions: Question[] = [];

        allQuizSets.forEach((quizSet: any) => {
          if (!Array.isArray(quizSet.questionset)) {
            throw new Error("Question set data is not in the expected format.");
          }

          quizSet.questionset.forEach((question: any) => {
            questions.push({
              _id: question._id,
              courseId: quizSet.courseId,            
              question: question.question,
              option1: question.option1,
              option2: question.option2,
              option3: question.option3,
              option4: question.option4,
              answerOption: question.answerOption
            });
          });
        });

        setQuestions(questions);
      } catch (error) {
        console.error(error);
      }
    }
    fetchQuestions(); // Call the fetchQuestions function
  }, [courseId]);

  
const handleClick = (answer: string) => {
  if (answer == questions[currentQuestion]?.answerOption) {
   setScore(score + 1);
  }
  
  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
  } else {
    setShowScore(true);
  }
}
  
           
  return (
    <div className="container mx-auto p-4 text-center bg-gradient-to-r from-green-200 to-green-500">
      <div className="min-h-screen flex flex-col justify-center">
        <h1 className='text-4xl font-bold mb-4'>Quiz App</h1>

        {questions.length > 0 ? (
  showScore ? (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Your Score: {score}/{questions.length}</h2>
      <button className="bg-blue-500 text-white py-2 px-4 rounded md hover:bg-blue-600" onClick={() => window.location.reload()}>
        Restart Quiz
      </button>
    </div>
  ) : (
    <div className='bg-slate-100 mx-52 rounded-md p-5'>
      <h2 className='text-xl font-semibold mb-4'>Question {currentQuestion + 1}/{questions.length}</h2>
      <p className='text-lg mb-4 font-semibold'>{questions[currentQuestion].question}</p>
      <div className='grid grid-cols-2 gap-4 mx-44'>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => handleClick(questions[currentQuestion].option1)}>
          {questions[currentQuestion].option1}
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => handleClick(questions[currentQuestion].option2)}>
          {questions[currentQuestion].option2}
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => handleClick(questions[currentQuestion].option3)}>
          {questions[currentQuestion].option3}
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => handleClick(questions[currentQuestion].option4)}>
          {questions[currentQuestion].option4}
        </button>
      </div>
    </div>
  )
) : (
  <p>Loading ....</p>
)}


      </div>
    </div>
  )
}

export default StudentQuizForm;
