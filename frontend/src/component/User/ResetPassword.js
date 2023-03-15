import React, { Fragment, useState } from 'react';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import './ResetPassword.css';
import MetaData from '../layout/MetaData';
import { resetPassword , clearErrors } from '../../actions/userAction';
import { useDispatch , useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const history = useNavigate();

    const {token} = useParams();

    const {loading,error , success} = useSelector((state)=>state.forgotPassword)

    const [password, setPassword] = useState("");

    const [confirmPassword , setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
          e.preventDefault();
          const myForm = new FormData();

          myForm.set('password',password);
          myForm.set('confirmPassword',confirmPassword);
          dispatch(resetPassword(token,myForm))
    }

    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password reset successfully");

            history('/login');
        }
    },[error,dispatch ,alert , success , history])
  return (
   <Fragment>
    {loading ? (<Loader/>):(
         <Fragment>
    <MetaData title={"Reset Password"}/>
        <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
                <h2 className='resetPasswordHeading'>Reset Password</h2>
                <form onSubmit={resetPasswordSubmit} className='resetPasswordForm'>
                    <div>
                        <LockOpenIcon/>
                        <input 
                        type="password" 
                        required 
                        placeholder='New Password' 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                         />
                    </div>
                    <div>
                        <LockIcon/>
                        <input 
                        type="password" 
                        required 
                        placeholder='Confirm Password' 
                        value={confirmPassword} 
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                         />
                    </div>
                    <input type="submit" value="Reset Password" className='resetPasswordBtn' />
                </form>
            </div>
        </div>
    </Fragment>
    )}
   </Fragment>
  )
}

export default ResetPassword
