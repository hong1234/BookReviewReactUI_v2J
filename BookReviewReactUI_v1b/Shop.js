import React, { useReducer } from 'react';

import ReviewForm from './ReviewForm';
import SearchForm from './SearchForm';
import BookList from './BookList';
import BookDetail from './BookDetail';

const initialState = {
  books: [],
  book: null, 
  showDetail: false,  
  showReviewForm: false
};
  
function shopReducer(state, action) { 
  switch(action.type){
    case 'filter':
    case 'showBook':
      return {...state, ...action.payload}
    case 'addReview':
    case 'showReviewForm':
      return {...state, showReviewForm: action.payload}
    default:
      return initialState
  }
}

function Shop() {

  const [state, dispatch] = useReducer(shopReducer, initialState)

  console.log('shop rendering ..')
  return (
    <div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6">
          <SearchForm dispatch={dispatch} />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6">
          <BookList books={state.books} dispatch={dispatch} />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6">
          <ReviewForm state={state} dispatch={dispatch} />
          <br/>
          <BookDetail state={state} dispatch={dispatch} />
        </div>
      </div>
    </div>
  )
    
}

export default Shop;
