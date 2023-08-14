import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        console.log('Post deleted');
        // Refresh the post list after successful delete
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div className="container ">
      <h2 className='mb-4'>Post List</h2>
      <div className='d-flex justify-content-end'>
      <button className='mb-4 addpost'><Link className='link' to="/add">Add Post</Link></button>
      </div>
      
      <div className='d-flex justify-content-center'>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {posts.map(post => (
              <tr key={post.id}>
                <td className='posttitle'>{post.title}</td>
                <td className='postbutton'>
                  <td className='edit'><button ><Link className='link' to={`/edit/${post.id}`}>Edit</Link></button></td>
                  <td className='view'><button><Link className='link' to={`/view/${post.id}`}>View</Link></button></td>
                  <td className='delete'><button onClick={() => handleDelete(post.id)}>Delete</button></td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Post;

