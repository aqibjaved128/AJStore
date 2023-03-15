import  { Fragment, useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import "./Home.css";
import MetaData from '../layout/MetaData.js';
import { clearErrors, getProduct } from '../../actions/productAction.js';
import {useSelector,useDispatch} from "react-redux";
import Loader from '../layout/Loader/Loader.js';
import { useAlert } from 'react-alert';
import ProductCard from './ProductCard.js';


const Home = () => {

    const alert = useAlert()
    const dispatch = useDispatch();

    const {loading,error,products} = useSelector(state=>state.products)

    useEffect(()=>{
        if (error) {
        alert.error(error)
        dispatch(clearErrors())
        }
        dispatch(getProduct())
    },[dispatch,error,alert])
  return (
     <Fragment>
        {loading ? (<Loader />):(    <Fragment>
       <MetaData title={"AJ STORE"}/>
        <div className="banner">
            <p>Welcome to AJ Store</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
                <button>Scroll <CgMouse/></button>
            </a>
        </div>

        <h2 className='homeHeading' id='container'>Featured Products</h2>
        <div className="container" >
        {products && products.map((product)=> <ProductCard product={product} key={product._id}/>)}
        </div>
    </Fragment>)}
     </Fragment>
  )
}

export default Home
