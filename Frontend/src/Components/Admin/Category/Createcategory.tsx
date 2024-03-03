import { useState } from 'react';
import { axiosInstanceAdmin } from '../../../api/axiosinstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


function AddCategory() {
  const navigate = useNavigate();
  const [title,setTitle] =useState<string>("");
  const [description,setDescription] = useState<string>("");
const handleSubmit =(e :React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault();
  axiosInstanceAdmin.post('/addcategory',{title,description})
  .then((response)=>{
    if(response.data.message){
      toast.success(response.data.message)
      navigate('/getallcategory')
    }
  })
  
}
 

  return (
    <div className="max-w-md mx-auto mt-8 bg-pink-100 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold px-6 py-4 bg-blue-500 text-white rounded-t-lg">Add Category</h2>
    <form onSubmit={handleSubmit} className="p-6">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Category Title</label>
        <input 
          type="text" 
          id="title" 
          name="title"
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter category title"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none" />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea 
          id="description"
          name="description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description" 
          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"></textarea>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Submit</button>
      </div>
    </form>
  </div>
  
  );
}

export default AddCategory;
