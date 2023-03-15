import React, { Fragment , useState , useEffect } from 'react';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useDispatch , useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import './UpdatePassword.css';



const UpdatePassword = () => {

    const dispatch = useDispatch();

    const {loading , error , isUpdated} = useSelector((state)=>state.profile);

    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");

    const alert = useAlert();

    const history = useNavigate();


    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('oldPassword',oldPassword);
        myForm.set('newPassword',newPassword);
        myForm.set('confirmPassword',confirmPassword);
        dispatch(updatePassword(myForm));
    }

    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Password updated successfully");

            history(`/account`);

            dispatch({type:UPDATE_PASSWORD_RESET});
        }
    },[error,alert , isUpdated , dispatch , history])

  return (
   <Fragment>
    {loading ? (<Loader/>):(
         <Fragment>
         <MetaData title={"Change Password"}/>
        <div className="UpdatePasswordContainer">
            <div className="updatePasswordBox">
            <div className="updatePasswordHeading">Update Password</div>
                <form onSubmit={updatePasswordSubmit} className='updatePasswordForm'>
                    <div className="oldPassword">
                    <VpnKeyIcon/>
                        <input 
                        type="password"
                        required 
                        placeholder='Old Password' 
                        value={oldPassword} 
                        onChange={(e)=>setOldPassword(e.target.value)}
                         />
                    </div>
                    <div className="newPassword">
                        <LockOpenIcon/>
                        <input 
                        type="password" 
                        required
                        placeholder='New Password' 
                        value={newPassword} 
                        onChange={(e)=>setNewPassword(e.target.value)}
                         />
                    </div>
                    <div className="confirmNewPassword">
                    <LockIcon/>                      
                        <input 
                        type="password" 
                        required 
                        placeholder='Confirm Password' 
                        value={confirmPassword} 
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                         />
                    </div>
                    <input type="submit" value="Change" className='updatePasswordBtn' />
                </form>
            </div>
        </div>
    </Fragment>)}
   </Fragment>
  )
}

export default UpdatePassword
