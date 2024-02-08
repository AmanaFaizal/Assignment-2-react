import logo from './logo.svg';
import './App.scss';
import Item from './pages/Item';
import SingleItem from './pages/SingleItem';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Checkout from './pages/Checkout';
import Category from './pages/Category';
import Categories from './pages/Categories';

const App = () => { //Main Component
  return (
    <>
     
    <BrowserRouter>
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route index element={<Home />} />
        <Route path="/items" element={<Item />} />
        <Route path="/items/:id" element={<SingleItem />} /> 
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<Category />} /> 
        <Route path="/checkout" element={<Checkout />} />
      </Route>
      
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
