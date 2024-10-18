import	React from 'react'
import { Routes, Route } from 'react-router-dom'; 

import Shop from './Shop';
import BookForm from './BookForm';
import Layout from "./Layout";

export default function App() {
  return (
	<div>
	  <main>
		<Routes>
		  <Route path="/" element={<Layout />}>
			<Route index element={<Shop/>} />
			<Route path='/addbook' element={<BookForm/>} />
		  </Route>
		</Routes>
	  </main>
	</div>		
  )
}

