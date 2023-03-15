import React, { Fragment, useState } from 'react';
import {SpeedDial,SpeedDialAction} from '@material-ui/lab';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import  Backdrop  from '@material-ui/core/Backdrop';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch , useSelector } from 'react-redux';
import { logout } from '../../../actions/userAction';

const UserOptions = ({user}) => {
    const [open , setOpen] = useState(false);

    const history = useNavigate();

    const alert = useAlert();

    const dispatch = useDispatch();

    const {cartItems} = useSelector((state)=>state.cart)

    const options = [
        {icon:<ListAltIcon/>, name:"Orders" , func : orders},
        {icon:<PersonIcon/> , name:"Profile" , func : account},
        {icon:<ShoppingCartIcon style={{color:cartItems.length > 0 ? "tomato":"unset"}} /> , name:`Cart(${cartItems.length})`, func : cart},
        {icon:<ExitToApp/> , name:"Logout" , func : logoutUser },
       
    ];

    if (user.role === 'admin') {
        options.unshift({icon:<DashboardIcon/> , name:"Dashboard" , func: dashboard})
    }

    function dashboard() {
        history(`/admin/dashboard`)
    };

    function orders() {
        history(`/orders`)
    };

    function account() {
        history(`/account`)
    };

    function cart() {
        history(`/cart`)
    }

    function logoutUser() {
        dispatch(logout())
        alert.success("Logout Successfully")
    };

  return (
    <Fragment>
    <Backdrop open={open} style={{zIndex : "10"}}/>
    <SpeedDial
    ariaLabel='SpeedDail tooltip example'
    onClose={()=>setOpen(false)}
    onOpen={()=>setOpen(true)}
    open={open}
    direction="down"
    className='speedDail'
    style={{zIndex:"11"}}
    icon={
        <img
            className='speedDailIcon'
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt='Profile'
        />
    }
    >

    {options.map((item)=>(
        <SpeedDialAction
    key={item.name}
    icon={item.icon}
    tooltipTitle={item.name}
    onClick={item.func} 
    tooltipOpen={window.innerWidth <= 600 ? true:false}
         />))}

    </SpeedDial>

    </Fragment>
  )
}

export default UserOptions
