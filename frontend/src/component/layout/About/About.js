import React from 'react';
import './AboutSection.css';
import {Button , Typography , Avatar} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import AccountBoxIcon from '@material-ui/icons/AccountBox'

const About = () => {
    const visitFever = () => {
    window.location = "https://vast-rose-ox-belt.cyclic.app";
  };
    
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dzgvacnbq/image/upload/v1677145065/products/IMG_20210718_215201-01-01-01-01-01_inuyob.jpg"
              alt="Founder"
            />
            <Typography>Aqib Javed</Typography>
            <Button onClick={visitFever} color="primary" target={"blank"}>
             Visit MY Portfolio
            </Button>
            <span>
            Mern Full Stack  Web Developer right here,
with a deep-rooted web development knowledge & can develop fully-functional
website using
HTML , CSS , JavaScript , React J's , Node J's , Express J's & Mongo DB
technologies.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://web.facebook.com/aqibjaved128"
              target="blank"
            >
              <FacebookIcon className="instagramSvgIcon" />
            </a>

            <a
              href="https://vast-rose-ox-belt.cyclic.app"
              target="blank"
            >
              <AccountBoxIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
