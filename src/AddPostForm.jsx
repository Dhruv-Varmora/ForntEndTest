import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPostForm() {
  const [inputval, setInputval] = useState({
    userId: 11, // Set userId to 1 by default
    title: "",
    body: "",
  });
 
  const [showMessage, setShowMessage] = useState(false);
  const Navigation = useNavigate()

  const handleChange = (e) => {
    setInputval({ ...inputval, [e.target.name]: e.target.value });
  };



  const handleSubmi = () => {
    try {
       axios.post('https://jsonplaceholder.typicode.com/posts', inputval,).then(function (result) {
        
        if (result.status=== 201) {
          setShowMessage([result.data,]);
          
          Navigation("/")
        }
        
      })
    }
    catch (error) {
      console.log(error, "error")
    }
  }
  return (
    <div className="add-post-form">
      <div className="form-group">
        <label htmlFor="title" className='fs-4 fw-bold mt-5 text-start'>Title</label>
        <input
          type="text"
          name='title'
          value={inputval.title}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="body" className='fs-4 fw-bold text-start'>Body</label>
        <textarea
          name='body'
          value={inputval.body}
          onChange={(e) => handleChange(e)}
        />
      </div>
     
      <button className='w-50' onClick={handleSubmi}>add post</button>
      
    </div>
  );
}

export default AddPostForm;
