import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddPostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      userId: 1, // Set userId to 1 by default
      title: title,
      body: body,
    };

    axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
      .then(response => {
        setTitle('');
        setBody('');

    setMessage(response.data); // Assuming the API response has a 'title' field
        setShowMessage(true);

        const timeout = setTimeout(() => {
          setShowMessage(false);
        }, 5000);

        return () => clearTimeout(timeout);
      })
      .catch(error => {
        console.error('Error adding post:', error);
      });
  };

  return (
    <div className="add-post-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className='fs-4 fw-bold mt-5 text-start'>Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body" className='fs-4 fw-bold text-start'>Body</label>
          <textarea
            id="body"
            value={body}
            onChange={handleBodyChange}
            required
          />
        </div>
        <button type="submit" className='w-50'>Add Post</button>
      </form>
      <br/>
      {showMessage && (
        <div className="message">
          <div class="alert alert-success" role="alert">
          {message.id} Data inserted successfully!
</div>
        </div>
      )}
    </div>
  );
}

export default AddPostForm;
