import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
const About = () => {
  const visitLinkedin = () => {
    window.location = "https://www.linkedin.com/in/muhammad-hamza-khattak-8002b718b";
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
              src="https://res.cloudinary.com/mr-hamza/image/upload/v1662383260/avatars/io8yqm6onlonnm0zghgs.jpg"
              alt="Founder"
            />
            <Typography>Muhammad Hamza Khattak</Typography>
            <Button onClick={visitLinkedin} color="primary">
              Visit linkedin
            </Button>
            <span>
              This is a sample wesbite made by @mr.hamxa942. Only with the
              purpose to teach MERN Stack on the channel Programmer
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a href="https://web.facebook.com/mr.hamxa942" target="blank">
              <FacebookIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://twitter.com/hamzaktk485" target="blank">
              <TwitterIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
