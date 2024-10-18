import React, { useState } from 'react'; 
import axios from 'axios';

const reviewUrl = 'http://localhost:8000/api/reviews/';

const ReviewForm = ({state, dispatch}) => {

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
        content: contentInput
      };

      const options = {
        headers: { 'Content-Type': 'application/json' }
      };

      try {
        const res =  await axios.post(`${reviewUrl}${state.book.id}`, review, options) 
        state.book.reviews.push(res.data.data); // push review returned from server
        dispatch({type: 'addReview', payload: false})
        clearForm()
      } catch (error) {
        // throw(error);
        console.log(error.message)
      }
    } 
    else {
    }
  }

  const submitHandle = e => {
    e.preventDefault();
    postData();
  }

  if (!state.showReviewForm) {
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
          <input type="text" className="form-control" name="name" value={nameInput} onChange={event => setNameInput(event.target.value)} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="text" className="form-control" name="email" value={emailInput} onChange={event => setEmailInput(event.target.value)} />
        </div>
        <div className="form-group">
          <label>Your Review:</label>
          <input type="text" className="form-control" name="content" value={contentInput} onChange={event => setContentInput(event.target.value)} />
        </div>
        <button  type="submit" className="btn btn-primary">Add Review</button>
      </form>
    </div>
  )
  
}

export default ReviewForm;
