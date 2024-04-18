import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Question {
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
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get("https://opentdb.com/api.php?amount=10");
        const formattedQuestions = response.data.results.map((question: any) => ({
          ...question,
          question: decodeEntities(question.question),
          incorrect_answers: question.incorrect_answers.map(decodeEntities),
          correct_answer: decodeEntities(question.correct_answer)
        }));
        setQuestions(formattedQuestions);
      } catch (error) {
        console.error(error);
      }
    }
    fetchQuestions(); // Call the fetchQuestions function
  }, []);

  const decodeEntities = (html: string) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
  }

  const handleClick = (answer: string) => {
    if (answer === questions[currentQuestion].correct_answer) {
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
                {questions[currentQuestion].incorrect_answers.map((option: string, index: number) => (
                  <button className=" bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" key={index} onClick={() => handleClick(option)}>
                    {option}
                  </button>
                ))}
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={() => handleClick(questions[currentQuestion].correct_answer)}>
                  {questions[currentQuestion].correct_answer}
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
