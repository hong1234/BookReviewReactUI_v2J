import	React from 'react'
import { Routes, Route } from 'react-router-dom'; 

import Layout from './Layout';
import Home from './Home';
import Shop from './Shop';
import BookForm from './BookForm';
import BookDetail from './BookDetail';

export default function App() {
  return (
	<div>
	  <Routes>
	  	<Route path='/' element={<Layout />}>
	  	  <Route index element={<Home/>} />

		  <Route path='books' element={<Shop/>}>
		    <Route path=':bookId' element={<BookDetail/>} />
			<Route path='new' element={<BookForm/>} />
		  </Route>
		  
		</Route>
	  </Routes>
	</div>		
  )
}

