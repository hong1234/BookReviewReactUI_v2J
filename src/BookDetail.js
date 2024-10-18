import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import ReviewForm from './ReviewForm';

const bookUrl = 'http://localhost:8000/api/books/';

const BookDetail = () => {
  // const [books] = useOutletContext()
  const {bookId} = useParams();
  const [lastId, setLastId] = useState();
  
  const [book, setBook] = useState();  // null  default
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const getBook = async () => {
    try {
      const res = await axios.get(`${bookUrl}${bookId}`)
      // setBook(res.data.data); // php-api
      setBook(res.data); // java-api
      setLastId(bookId);
      setShowReviewForm(false)
    } catch (error) {
      // throw(error);
      console.log(error)
    }
  }

  useEffect(() => {
    if (bookId !== lastId){
      getBook();  
    } 
  });

  if (bookId !== lastId) {
    return null;
  }

  console.log('book-detail rendering ..')
  return (
    <div>
      <ReviewForm book={book} showReviewForm={showReviewForm} setShowReviewForm={setShowReviewForm}/>
      
      <div className="card text-white bg-success mb-3">
        <div className="card-header">Detail</div>
        <div className="card-body">
          <h5 className="card-title">Title: {book.title}</h5>
          <p className="card-text">Content: {book.content}</p>
          <h5 className="card-text">Reviews:</h5>
          {book.reviews.map((review) =><p key={review.id} className="">{review.email} - {review.content}</p>)}
          <button type="button" onClick={() => setShowReviewForm(!showReviewForm)} className="btn btn-secondary">{
            showReviewForm ? (
              "Remove ReviewForm" 
            ) : (
              "Add Review"
            )
          }</button>
        </div>
      </div>
    </div>
  )

}

export default BookDetail;