import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import axios from 'axios';

const addBookUrl = 'http://localhost:8000/api/books';

const BookForm = () => {
  
  const navigate = useNavigate();

  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');

  const handleTitleChange = (e) => {
    setTitleInput(e.currentTarget.value)
  }

  const handleContentChange = (e) => {
    setContentInput(e.currentTarget.value)
  }

  const postData = async () => {
    if(titleInput.trim() !== '' && contentInput.trim() !== ''){

      const book = {
        title: titleInput,
        content: contentInput
      };

      const options = {
        headers: { 'Content-Type': 'application/json' }
      };

      try {
        const res = await axios.post(`${addBookUrl}`, book, options) 
        // console.log(res.data);
        // setTitleInput('');
        // setContentInput(''); 
        navigate('/')
      } catch (error) {
        // throw(error);
        console.log(error)
      }

    } 
    else {
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    postData();
  }

  console.log('book-form rendering ..')
  return (
    <div className="row">

      <div className="col-xs-12 col-sm-12 col-md-6">
        <div className="d-block p-2 bg-secondary text-white">
            <span><b>New Book</b></span> 
        </div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Book Title:</label>
              <input type="text" className="form-control" name="title" value={titleInput} onChange={handleTitleChange} />
            </div>
            <div className="form-group">
              <label>Book Intro:</label>
              <input type="text" className="form-control" name="content" value={contentInput} onChange={handleContentChange} />
            </div>
            <button  type="submit" className="btn btn-primary">Add Book</button>
        </form>
      </div>

    </div>
  )

};

export default BookForm;
