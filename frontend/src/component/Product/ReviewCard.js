import React from 'react';
import profileImage from '../../images/Profile.png';
import { Rating } from '@material-ui/lab';

const ReviewCard = ({review}) => {
    const options = {
      value:review.rating,
      precision:0.5,
      readOnly : true  
   }
  return (
    <div className='reviewCard'>
      <img src={profileImage} alt="User" />
      <p>{review.name}</p>
      <Rating {...options}/>
      <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard
