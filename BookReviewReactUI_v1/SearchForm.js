import React, { useState, memo } from 'react';
import axios from 'axios';

const searchUrl = 'http://localhost:8000/api/books/search?title='; 

const SearchForm = ({setBooks, setShowBook, setShowReviewForm}) => {

  const [filterText, setFilterText] = useState('');

  const getData = async () => {
    try {
      const res = await axios.get(`${searchUrl}${filterText}`)
      setBooks(res.data.data);
      setShowBook(false)
      setShowReviewForm(false)
      setFilterText('');
    } catch (error) {
      throw(error);
    }
  }

  const submitHandle = (e) => {
    e.preventDefault();
    getData();
  }

  console.log('searchform rendering ..') 
  return (
    <form onSubmit={submitHandle} className="input-group mb-3">
      <input
        type="text"
        value={filterText}
        onChange={event => setFilterText(event.target.value)}
        className="form-control"
      />
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  )

}

// export default SearchForm;
export default memo(SearchForm);