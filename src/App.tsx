import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import CatList from './components/CatList'
import CatDetailsPage from './components/CatDetailsPage';

import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CatList />
  },
  {
    path: '?breed=:breed_id',
    element: <CatList />
  },
  {
    path: '/:id',
    element: <CatDetailsPage />
  }
])

function App() {
  return (
    <Container>
      <RouterProvider router = {router} />
    </Container>
  );
}

export default App; 
