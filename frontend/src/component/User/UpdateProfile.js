import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { updateProfile , clearErrors , loadUser } from '../../actions/userAction';
import {useDispatch,useSelector} from 'react-redux';
import FaceIcon from '@material-ui/icons/Face';
import MailOutLineIcon from '@material-ui/icons/MailOutline';
import { useAlert } from 'react-alert';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import {useNavigate} from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import './UpdateProfile.css';

const UpdateProfile = () => {

    const history = useNavigate()

    const dispatch = useDispatch();

    const alert = useAlert()

    const {user} = useSelector(state=>state.user);

    const {loading , error , isUpdated} = useSelector(state=>state.profile);

    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [avatarPreview , setAvatarPreview] = useState("/Profile.png");
    const [avatar , setAvatar] = useState();

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        let myForm = new FormData();
        
        myForm.set('name',name);
        myForm.set('email',email);
        myForm.set('avatar',avatar);
        dispatch(updateProfile(myForm))
    }

   const updateProfileDataChange = (e) => {
        let reader = new FileReader();

        reader.onload = () => {
         if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
         }
        }
        reader.readAsDataURL(e.target.files[0]);
   };
   
   useEffect(()=>{
    if (user) {
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar.url);
    };

    if (error) {
        alert.error(error);
        dispatch(clearErrors());
    }

    if (isUpdated) {
        alert.success("Profile Updated Successfully");
        dispatch(loadUser());

        history('/account')

        dispatch({
            type:UPDATE_PROFILE_RESET
        })
    }
   },[alert,dispatch,error,history,isUpdated,user]);


  return (
  <Fragment>
    {loading ? (<Loader/>):( <Fragment>
      <div className="updateProfileContainer">
        <div className="updateProfileBox">
            <h2 className='updateProfileHeading'>Update Profile</h2>
            <form 
            onSubmit={updateProfileSubmit} 
            className="updateProfileForm" 
            encType='multipart/form-data'>

                <div className="updateProfileName">
                    <FaceIcon />
                    <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder='Name' 
                    value={name} 
                    onChange={(e)=>setName(e.target.value)} 

                    />
                </div>
                <div className="updateProfileEmail">
                    <MailOutLineIcon/>
                    <input
                     type="email" 
                     name="email" 
                     required 
                     placeholder='Email' 
                     value={email} 
                     onChange={(e)=>setEmail(e.target.value)}
                      />
                </div>
                <div className="register-image" id='registerImage'>
                    <img src={avatarPreview} alt="avatar Preview" />
                    <input 
                    type="file" 
                    name="avatar" 
                    accept='image/*' 
                    onChange={updateProfileDataChange} />
                </div>
                <input type="submit" value="Update" className='updateProfileBtn' />
            </form>
        </div>
    </div>
   </Fragment>)}
  </Fragment>
  )
}

export default UpdateProfile
