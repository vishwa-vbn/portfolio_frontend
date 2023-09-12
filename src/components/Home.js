import React, { useContext } from 'react';
import { myContext } from '../App';
import '../home.css';
import codingImage from '../template1.jpg';
import { Link as ScrollLink } from 'react-scroll';

const Home = () => {
  const windowResized = useContext(myContext);
  console.log(windowResized);
  return (
    <div className={`home-container ${windowResized ? 'active' : 'inactive'}`}>
      <div className="intro-content">
        <h1 className="intro-title">Hi,</h1>
        <h1 className="intro-title">I'm Vishwa</h1>
        <h1 className="intro-title">I'm a web developer</h1>
        <div className="description">
          <p>
            I'm a passionate web developer who builds beautiful websites that combine creativity and functionality.
          </p>
          <p>
            With a strong foundation in CSS3, HTML5, and JavaScript, I bring ideas to life through code. Let's create engaging web experiences together!
          </p>
          <p>
            Connect with me to discuss how I can help you achieve your goals.
          </p>
          <div className="contact-btn">
            <ScrollLink to="contact" className="cont-scroll" smooth={true} duration={500}>
              contact
            </ScrollLink>
          </div>
        </div>
      </div>
      <div className="image-container1">
        <img src={codingImage} alt="Coding" className="coding-image" />
      </div>
    </div>
  );
};

export default Home;
