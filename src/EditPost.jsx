import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams , useNavigate} from 'react-router-dom';

function EditPost() {
  const { id } = useParams();
  const [postData, setPostData] = useState({
    title: '',
    body: '',
  });

  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const Navigation = useNavigate()

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => {
        const { title, body } = response.data;
        setPostData({ title, body });
      })
      .catch(error => {
        console.error('Error fetching post:', error);
      });
  }, [id]);



  const handleFormSubmit = async (e) => {
    e.preventDefault();

    axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, postData)
      .then(response => {
        // setMessage(response.data); // Assuming the API response has a 'title' field
        setShowMessage(true);
        Navigation("/")

        const timeout = setTimeout(() => {
          setShowMessage(false);
        }, 3000);

        return () => clearTimeout(timeout);
      })
      .catch(error => {
        console.error('Error adding put:', error);
      });
  };

  const handleTitleChange = (e) => {
    setPostData({ ...postData, title: e.target.value });
  };

  const handleBodyChange = (e) => {
    setPostData({ ...postData, body: e.target.value });
  };
  return (
    <>
      <div className='container d-flex justify-content-center'>
        <div className="add-post-form w-50">
          <h2>Edit Post</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="title" className='fs-4 fw-bold mt-5 text-start'>Title</label>
              <input
                type="text"
                id="title"
                value={postData.title}
                onChange={handleTitleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="body" className='fs-4 fw-bold text-start'>Body</label>
              <textarea
                id="body"
                value={postData.body}
                onChange={handleBodyChange}
                required
              />
            </div>


            <button type="submit" className='w-50'>Save Changes</button>
          </form>
          <br />
          {showMessage && (
            <div className="message">
              <div class="alert alert-info" role="alert">
                {message.id} Data updated successfully!
              </div>
            </div>
          )}
        </div>
      </div>
    </>

  );
}

export default EditPost;
