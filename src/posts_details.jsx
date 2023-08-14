import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PostsDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => {
        setBlog(response.data);
      })
      .catch(error => {
        console.error('Error fetching blog data:', error);
      });

    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [id]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    const newCommentData = {
      postId: parseInt(id),
      name: "User", // You can customize this based on your needs
      email: "user@example.com", // You can customize this based on your needs
      body: newComment,
    };

    axios.post('https://jsonplaceholder.typicode.com/comments', newCommentData)
      .then(response => {
        setComments([...comments, response.data]);
        setNewComment('');
      })
      .catch(error => {
        console.error('Error adding comment:', error);
      });
  };

  return (
    <div className="blog-details">
      <h1>{blog.title}</h1>
      <p className="blog-body">{blog.body}</p>
      <div className="comment-box">
        <input className='w-75'
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add your comment here..."
        />
        <button onClick={handleCommentSubmit} className='ms-2'>Add Comment</button>
      </div>
      <h2>Comments:</h2>
      <ul className="comment-list">
        {comments.map(comment => (
          <li key={comment.id} className="comment-item">
            <h3>{comment.name}</h3>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsDetails;
