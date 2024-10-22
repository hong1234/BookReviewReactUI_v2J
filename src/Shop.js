import React, { useState, memo } from 'react';
import { Outlet, Link } from "react-router-dom";

import SearchForm from './SearchForm';
import BookList from './BookList';

function Shop() {

  const [books, setBooks] = useState([]);
  
  console.log('shop rendering ..')
  return (
    <div>
      <div className="row">
        <div className="col-4 col-sm-4 col-md-2">
          {/* <Link className="" to={'new'} onClick={()=>setAddBook(true)}> */}
          <Link to={'new'} ><button type="submit" className="btn btn-primary">Add Book</button></Link>
        </div>
        <div className="col-8 col-sm-8 col-md-4">
          <SearchForm setBooks={setBooks}/>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-sm-12 col-md-6">
          <BookList books={books} />
        </div>
        <div className="col-12 col-sm-12 col-md-6">
          {/* <Outlet context={[books]} /> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
    
}

export default Shop;
// export default memo(Shop);
