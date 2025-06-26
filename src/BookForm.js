import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import axios from 'axios';

const addBookUrl = 'http://localhost:8000/api/books';

const BookForm = () => {
  const navigate = useNavigate();

  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');

  const clearForm = () => {
    setTitleInput('');
    setContentInput('');
  }

  const postData = async () => {
    if(titleInput.trim() !== '' && contentInput.trim() !== ''){
      
      const book = {
        title: titleInput,
        content: contentInput
      };

      const options = {
        headers: { 
          'Content-Type': 'application/json' 
        },
        auth: {
          username: 'admin',
          password: 'admin'
        }
      };

      try {
        const res = await axios.post(`${addBookUrl}`, book, options) 
        // console.log(res.data);
        // clearForm() 
        navigate('/books')
      } catch (error) {
        // throw(error);
        console.log(error)
      }
    } 
    else {
    }
  }

  const handleTitleChange = (e) => {
    setTitleInput(e.currentTarget.value)
  }

  const handleContentChange = (e) => {
    setContentInput(e.currentTarget.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  }

  console.log('book-form rendering ..');
  return (
    <div>
      <div className="d-block p-2 bg-secondary text-white">
        <span><b>New Book</b></span> 
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Book Title:</label>
          <input type="text" name="title" value={titleInput} onChange={handleTitleChange} className="form-control" />
        </div>
        <div className="form-group">
          <label>Book Intro:</label>
          <input type="text" name="content" value={contentInput} onChange={handleContentChange} className="form-control" />
        </div>
        <button  type="submit" className="btn btn-primary">Add Book</button>       
      </form>
    </div>
  )

}

export default BookForm;
