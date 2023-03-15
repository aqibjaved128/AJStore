import React from 'react';
import './Contact.css';
import {Button} from '@material-ui/core';

const Contact = () => {
  return (
    <div className="contactContainer">
        <a href="mailto:aqibjaved121921@gmail.com" className='mailBtn'>
        <Button>Contact:aqibjaved121921@gmail.com</Button>
        </a>
    </div>
  )
}

export default Contact
