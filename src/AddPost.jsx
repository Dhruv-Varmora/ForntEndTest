import React from 'react';
import AddPostForm from './AddPostForm.jsx';

function AddPost() {
  return (
    <>
      <div className='container d-flex justify-content-center'>
        <div className='w-50'>
          <h2>Add Post</h2>
          <AddPostForm />
        </div>
      </div>
    </>
  );
}

export default AddPost;
