import React, { useState, memo } from 'react';
import axios from 'axios';
import { sortBy } from 'lodash';

const bookUrl = 'http://localhost:8000/api/books/';

const SORTS = {
  NONE: list => list,
  ID: list => sortBy(list, ['id']),
  TITLE: list => sortBy(list, ['title']),
  // AUTHOR: list => sortBy(list, ['author']),
  // COMMENT: list => sortBy(list, ['num_comments']).reverse(),
  // POINT: list => sortBy(list, ['points']).reverse(),
};

const BookList = ({books, dispatch}) => {

  const [sort, setSort] = useState({
    sortKey: 'NONE',
    isReverse: false,
  });

  const handleSort = sortKey => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    setSort({ sortKey, isReverse });
  };

  const sortFunction = SORTS[sort.sortKey];

  const showDetail = async (bookId) => {
    try {
      const res = await axios.get(`${bookUrl}${bookId}`)
      const dataset = {
        book: res.data.data,
        showDetail: true,
        showReviewForm: false
      }
      dispatch({type: 'showBook', payload: dataset})
    } catch (error) {
      // throw(error);
      console.log(error)
    }
  }

  if (!books.length) {  // or !books if useState(); 
    return null;
  }

  const sortedList = sort.isReverse
  ? sortFunction(books).reverse()
  : sortFunction(books);

  console.log('book-list rendering ..')
  return (
    <div>
      <div className="d-block p-2 bg-secondary text-white">
        <span><b>Book Search Results</b></span>
      </div>
      <div>
        <span><button type="button" onClick={() => handleSort('ID')}>sort by ID</button></span>
        <span><button type="button" onClick={() => handleSort('TITLE')}>sort by Title</button></span>
      </div>
      <div className="list-group">
        {sortedList.map((book) => 
            <button key={book.id} type="button" onClick={() => showDetail(book.id)} className="list-group-item list-group-item-action">{book.title}</button>
        )}
      </div>
    </div>
  );
}

export default memo(BookList);