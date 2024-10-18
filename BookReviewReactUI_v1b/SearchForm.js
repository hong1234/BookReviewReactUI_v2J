import React, { useState, memo } from 'react';  
import axios from 'axios'; 

const searchUrl = 'http://localhost:8000/api/books/search?title='; 

const SearchForm = ({dispatch}) => {

  const [filterText, setFilterText] = useState('');

  const getData = async () => {
    try {
      const res = await axios.get(`${searchUrl}${filterText}`)
      const dataset = {
        books: res.data.data,
        showDetail: false,
        showReviewForm: false
      }
      dispatch({type: 'filter', payload: dataset});
      setFilterText('');
    } catch (error) {
      // throw(error);
      console.log(error.message)
    }
  }

  const submitHandle = (e) => {
    e.preventDefault();
    getData();
  }

  console.log('search-form rendering ..')
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

export default memo(SearchForm);