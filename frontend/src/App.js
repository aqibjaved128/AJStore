import './App.css';
import {BrowserRouter ,Routes,Route} from "react-router-dom"
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import WebFont from 'webfontloader';
import React, { useState , useEffect } from 'react';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions.js';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './component/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Admin/Dashboard';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import Contact from './component/layout/Contact/Contact';
import About from './component/layout/About/About';
import ProtectedRoute from './component/Routes/ProtectedRoutes';
import NotFound from './component/layout/Not Found/NotFound';


function App() {

  const {isAuthenticated,user} = useSelector((state)=>state.user);

  const [stripeApiKey , setStripeApiKey] = useState("");

  async function getStripeApiKey () {
    const {data} = await axios.get(`/api/v1/stripeapikey`);

    setStripeApiKey(data.stripeApiKey);


  }

  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Roboto","Sans Lucida"]
         
      }
    })
    store.dispatch(loadUser());

    getStripeApiKey();
  },[])

   window.addEventListener("contextmenu", (e) => e.preventDefault()); 


  
    return (
  <BrowserRouter>
    <Header/>
    {isAuthenticated && <UserOptions user={user} />}

    <Routes>
   
      <Route extact path='/' element={<Home/>}/>

      <Route extact path='/product/:id' element={<ProductDetails/>}/>

      <Route extact path='/products' element={<Products/>}/>

      <Route extact path='/contact' element={<Contact/>}/>

      <Route extact path='/about' element={<About/>} />

      <Route extact path='/search' element={<Search/>}/>

      <Route  path='/products/:keyword' element={<Products/>}/>

      <Route extact path='/login' element={<LoginSignUp/>} />
     
      <Route extact path='/account' element={isAuthenticated ?<Profile/>:<LoginSignUp/>}/>

      <Route extact path='/me/update' element={isAuthenticated? <UpdateProfile/>:<LoginSignUp/>} />

      <Route extact path='/password/update' element={isAuthenticated?<UpdatePassword/>:<LoginSignUp/>}/>

      <Route extact path='/password/forgot' element={<ForgotPassword/>} />

      <Route extact path='/password/reset/:token' element={<ResetPassword/>}/>

      <Route extact path='/cart' element={<Cart/>}/>

      <Route extact path='/login/shipping' element={isAuthenticated ? <Shipping/>:<LoginSignUp/>} />

      <Route extact path='/order/confirm' element={isAuthenticated ? <ConfirmOrder/>:<LoginSignUp/>} />

       
      {stripeApiKey && (  <Route path="/process/payment" element={ <Elements stripe={loadStripe(stripeApiKey)}>
         {isAuthenticated ? <Payment/>:<LoginSignUp/>} 
      </Elements> } />  )}    

      <Route extact path='/success' element={isAuthenticated ? <OrderSuccess/>:<LoginSignUp/>} /> 

      <Route extact path='/orders' element={isAuthenticated ? <MyOrders/>:<LoginSignUp/>} />

      <Route extact path='order/:id' element={isAuthenticated?<OrderDetails/>:<LoginSignUp/>} />


      <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}  isAdmin={user && user.role === "admin"?true:false} adminRoute={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
       
       <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}  isAdmin={user && user.role === "admin"?true:false} adminRoute={true}>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"?true:false}>
              <NewProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"?true:false}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"?true:false}>
              <OrderList />
            </ProtectedRoute>
          }
        />

        
         <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"?true:false}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />

                
       <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"?true:false}>
              <UsersList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"?true:false}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} adminRoute={true} isAdmin={user && user.role === "admin"?true:false}>
              <ProductReviews />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound/>} />
    
      
    </Routes>     
    <Footer/>
  </BrowserRouter>
  );
}

export default App;
