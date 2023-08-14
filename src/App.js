import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import AddPostForm from './AddPostForm.jsx'
import PostsDetails from './posts_details';
// import AddPostForm from './AddPostForm';
import Post from './Post';
import AddPost from './AddPost';
import EditPost from './EditPost';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Post />} />
          <Route path="/Add" element={<AddPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/view/:id" element={<PostsDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
