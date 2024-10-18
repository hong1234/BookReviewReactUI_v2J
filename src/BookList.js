import React, { useState, memo } from 'react';
import { sortBy } from 'lodash';
import { Link } from "react-router-dom";

const SORTS = {
  NONE: list => list,
  ID: list => sortBy(list, ['id']),
  TITLE: list => sortBy(list, ['title']),
  // AUTHOR: list => sortBy(list, ['author']),
  // COMMENT: list => sortBy(list, ['num_comments']).reverse(),
  // POINT: list => sortBy(list, ['points']).reverse(),
};

const BookList = ({books}) => {

  const [sort, setSort] = useState({
    sortKey: 'NONE',
    isReverse: false,
  });

  const handleSort = sortKey => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    setSort({ sortKey, isReverse });
  };

  const sortFunction = SORTS[sort.sortKey];

  if (!books.length) {  // or !books if useState();
    return null;
  }

  const sortedList = sort.isReverse
  ? sortFunction(books).reverse()
  : sortFunction(books);

  const linkList = sortedList.map((book) => {
    return (
      <li key={book.id} className="list-group-item">
        <Link to={`${book.id}`} >{book.title}</Link>
      </li>
    );
  });

  console.log('book-list rendering ..')
  return (
    <div>
      <div className="d-block p-2 bg-secondary text-white">
        <span><b>Book Search Results</b></span>
      </div>
      <div>
        <span><button type="button" onClick={() => handleSort('ID')} className="btn btn-light" >sort by ID</button></span>
        <span><button type="button" onClick={() => handleSort('TITLE')} className="btn btn-light" >sort by Title</button></span>
      </div>
      <div >
        <ul className="list-group">
          {linkList}
        </ul>
      </div>
      <p>Please select a book.</p>
    </div>
  )
}

export default BookList;
// export default memo(BookList);