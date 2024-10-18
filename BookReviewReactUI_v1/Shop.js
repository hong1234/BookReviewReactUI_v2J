import React, { useState } from 'react';
import SearchForm from './SearchForm';
import BookList from './BookList';
import BookDetail from './BookDetail';
import ReviewForm from './ReviewForm';

function Shop() {

  const [books, setBooks] = useState([]);
  const [book, setBook] = useState();  // null  default
  const [showBook, setShowBook] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  let book_detail = <div></div>;
  let review_form = <div></div>;

  if (showBook) {
    book_detail = <BookDetail book={book} showReviewForm={showReviewForm} setShowReviewForm={setShowReviewForm}/>;
  }

  if (showReviewForm) {
    review_form = <ReviewForm book={book} setShowReviewForm={setShowReviewForm}/> ;
  }

  console.log('shop rendering ..')
  return (
    <div>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6">
          <SearchForm setBooks={setBooks} setShowBook={setShowBook} setShowReviewForm={setShowReviewForm}/>
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6">
          <BookList books={books} setBook={setBook} setShowBook={setShowBook} setShowReviewForm={setShowReviewForm}/>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6">
          { review_form }
          <br/>
          { book_detail }
        </div>
      </div>  
        
    </div>
  )
    
}

export default Shop;
