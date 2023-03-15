import React, { Fragment , useState , useEffect } from 'react';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useDispatch , useSelector } from 'react-redux';
import { clearErrors , forgotPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import './ForgotPassword.css';
import MetaData from '../layout/MetaData';

const ForgotPassword = () => {

    const [email , setEmail] = useState("");

    const dispatch = useDispatch();

    const {loading , error , message} = useSelector((state)=>state.forgotPassword);

    const alert = useAlert();
    
    const forgotPasswordSubmit = (e) => {
       e.preventDefault();

       const myForm = new FormData();

       myForm.set('email',email);

       dispatch(forgotPassword(myForm));
    }

    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
        }
    },[error,dispatch,alert, message])
  return (
    <Fragment>
        {loading ? (<Loader/>):(
            <Fragment>
            <MetaData title={"Forgot Password"}/>
        <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
                <h2 className='forgotPasswordHeading'>Forgot Password</h2>
                <form onSubmit={forgotPasswordSubmit} className='forgotPasswordForm'>
                    <div className="forgotPasswordEmail">
                    <MailOutlineIcon/>
                    <input 
                    type="email" 
                    name="email" 
                    placeholder='Email' 
                    required 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)}
                     />

                    </div>
                    <input type="submit" value="Forgot Password" className='forgotPasswordBtn' />
                </form>
            </div>
        </div>
    </Fragment>
    )}
    </Fragment>
   )
}

export default ForgotPassword
