import {useState} from 'react'
import {toast} from 'react-hot-toast'
import { axiosInstanceTutor } from '../../../api/axiosinstance';
import { useParams } from 'react-router-dom';

function AddQuiz() {
    const { id :courseId} = useParams();
    console.log(courseId, "courseiddd");
    const [questionset, setQuestionset] = useState<any[]>([]);
    const [question, setQuestion] = useState<string>("");
    const [option1, setOption1] = useState<string>("");
    const [option2, setOption2] = useState<string>("");
    const [option3, setOption3] = useState<string>("");
    const [option4, setOption4] = useState<string>("");
    const [answerOption, setAnswerOption] = useState<string>("option1");
    const [count, setCount] = useState<number>(0);

// this function is for adding each question to array
    const handleAddQuiz = () => {
        // Check if all fields are filled
        if (
          question.trim() === '' ||
          option1.trim() === '' ||
          option2.trim() === '' ||
          option3.trim() === '' ||
          option4.trim() === '' ||
          answerOption.trim() === ''
        ) {
          toast.error('Please fill all fields');
          return;
        }    
        // Regular expression to validate question and options
        const pattern = /^[A-Za-z\s.\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/;
    
        // Validate question and options against pattern
        if (
          !pattern.test(question.trim()) ||
          !pattern.test(option1.trim()) ||
          !pattern.test(option2.trim()) ||
          !pattern.test(option3.trim()) ||
          !pattern.test(option4.trim())
        ) {
          toast.error('Question and options can only contain letters, symbols, and spaces');
          return;
        }
    
        // Create new question object
        const newQuestion = {
          question,
          option1,
          option2,
          option3,
          option4,
          answerOption,
        };
    
        // Update questionset state with new question
        setQuestionset([...questionset, newQuestion]);
    
        // Clear input fields and increment count
        setQuestion('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setAnswerOption('');
        setCount(count + 1);
    
        // Optionally, show a success message
        toast.success('Question added successfully');
      };


      const handleQuizSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          if (questionset.length <= 0) {
            alert("No questions to submit");
          } else {
            await axiosInstanceTutor.post('/addquiz', { questionset, courseId, count });
            toast.success('Quiz submitted successfully');
            // onClose(false);
          }
        } catch (error) {
            toast.success("error");
        }
      };


    return (
        <>
              <div>
        <div className="flex justify-center">
          {/* <ToastContainer position="top-center" autoClose={3000} /> */}
        </div>

        <div className="flex justify-between items-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" onClick={handleQuizSubmit}>
            Submit Quiz
          </button>
        </div>

        <div className="text-center mt-4">
          <h3>Add a Question?</h3>
          <h4> Question: {count + 1}</h4>
        </div>

        <form className="m-5 p-5 border-2 border-gray-300" onSubmit={handleAddQuiz}>
          <div className="mb-3">
            <label htmlFor="question" className="block">Question</label>
            <input id="question" type="text" className="w-full px-3 py-2 border rounded" placeholder="Type your Question Here" value={question} onChange={(e) => setQuestion(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="option1" className="block">Option 1</label>
            <input id="option1" type="text" className="w-full px-3 py-2 border rounded" placeholder="Write your Options" value={option1} onChange={(e) => setOption1(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="option2" className="block">Option 2</label>
            <input id="option2" type="text" className="w-full px-3 py-2 border rounded" placeholder="Write your Options" value={option2} onChange={(e) => setOption2(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="option3" className="block">Option 3</label>
            <input id="option3" type="text" className="w-full px-3 py-2 border rounded" placeholder="Write your Options" value={option3} onChange={(e) => setOption3(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="option4" className="block">Option 4</label>
            <input id="option4" type="text" className="w-full px-3 py-2 border rounded" placeholder="Write your Options" value={option4} onChange={(e) => setOption4(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="answerOption" className="block">Correct Answer</label>
            <select id="answerOption" className="w-full px-3 py-2 border rounded" value={answerOption} onChange={(e) => setAnswerOption(e.target.value)}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
          </div>

          <div className="mb-3">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={handleAddQuiz}>Add this question</button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={handleQuizSubmit}>Cancel</button>
          </div>
        </form>
      </div>
        </>
    )
}

export default AddQuiz;
