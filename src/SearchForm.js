import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const searchUrl = 'http://localhost:8000/api/books/search?title='; 

const SearchForm = ({ setBooks }) => {
  
  const [filterText, setFilterText] = useState('');
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get(`${searchUrl}${filterText}`)
      // setBooks(res.data.data);// php-api
      setBooks(res.data);// java-api
      setFilterText('');
      navigate('/books')
    } catch (error) {
      // throw(error);
      console.log(error)
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
        onChange={e => setFilterText(e.target.value)}
        className="form-control" 
      />
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  )

}

export default SearchForm;
// export default memo(SearchForm);
