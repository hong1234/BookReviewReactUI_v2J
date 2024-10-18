import React, { useState } from 'react';
import axios from 'axios';

const reviewUrl = 'http://localhost:8000/api/reviews/';

const ReviewForm = ({book, showReviewForm, setShowReviewForm}) => {

  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [contentInput, setContentInput] = useState('');
  
  const clearForm = () => {
    setNameInput('');
    setEmailInput('');
    setContentInput('');
  }

  const postData = async () => {
    if(nameInput.trim() !== '' && emailInput.trim() !== '' && contentInput.trim() !== ''){
      
      const review = {
        name: nameInput,
        email: emailInput,
        content: contentInput,
        likeStatus: 'High'
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
        const res = await axios.post(`${reviewUrl}${book.id}`, review, options) 
        // book.reviews.push(res.data.data); // push review returned from server PHP
        book.reviews.push(res.data); // push review returned from server Java
        clearForm()
        setShowReviewForm(false)
      } catch (error) {
        // throw(error);
        console.log(error)
      }
    } 
    else {
    }
  }

  const submitHandle = (e) => {
    e.preventDefault();
    postData();
  }

  if (!showReviewForm) {
    return null;
  }

  console.log('review-form rendering ..')
  return (
    <div>
      <div className="d-block p-2 bg-secondary text-white">
        <span><b>Add Review</b></span> 
      </div>
      <form onSubmit={submitHandle}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={nameInput} onChange={e => setNameInput(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="text" name="email" value={emailInput} onChange={e => setEmailInput(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Your Review:</label>
          <input type="text" name="content" value={contentInput} onChange={e => setContentInput(e.target.value)} className="form-control" />
        </div>
        <button  type="submit" className="btn btn-primary">Add Review</button>
      </form>
      <br/>
    </div>
  )
  
}

export default ReviewForm;
