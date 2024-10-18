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

const BookList = ({books, setBook, setShowBook, setShowReviewForm}) => {

  const [sort, setSort] = useState({
    sortKey: 'NONE',
    isReverse: false,
  });

  const handleSort = sortKey => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    setSort({ sortKey, isReverse });
  };

  const sortFunction = SORTS[sort.sortKey];

  const bookDetail = async (bookId) => {
    try {
      const res = await axios.get(`${bookUrl}${bookId}`)
      setBook(res.data.data);
      setShowBook(true);
      setShowReviewForm(false)
    } catch (error) {
      throw(error);
    }
  }

  const handleClick = (bookId) => {
    bookDetail(bookId)
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
        <span><button type="button" onClick={() => handleSort('ID')} className='btn btn-light'>sort by ID</button></span>
        <span><button type="button" onClick={() => handleSort('TITLE')} className='btn btn-light'>sort by Title</button></span>
      </div>
      <div>
        <ul className="list-group">
          {sortedList.map((book) => 
            <li key={book.id} className="list-group-item">
              <button key={book.id} type="button" onClick={() => handleClick(book.id)} className="btn btn-link">{book.title}</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

// export default BookList;
export default memo(BookList);