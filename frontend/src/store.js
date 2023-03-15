import {createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { deleteProductReducer, getProductDetailsReducer, newProductReducer, newReviewReducer, productReducer, productReviewsReducer, reviewReducer } from "./reducers/productReducer";
import { userReducer , profileReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, MyOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";



const reducer = combineReducers({ 

    products:productReducer,
    productDetails:getProductDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:MyOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct:newProductReducer,
    product:deleteProductReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    productReviews:productReviewsReducer,
    review:reviewReducer
}
);

let initialState = {
    cart:{
        cartItems:localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems')) : [],
        
        shippingInfo:localStorage.getItem('shippingInfo')  ?
        JSON.parse(localStorage.getItem('shippingInfo')):{}
    }
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


export default store;
