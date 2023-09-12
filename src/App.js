import React, { useState, useEffect,createContext,useNavigate } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link as ScrollLink } from 'react-scroll';
import Home from './components/Home';
import Projects from './components/Projects';
import ProjectPage from './components/projectPopup';
import Contact from './components/Contact';
import Blog from './components/Blog';
import axios from 'axios';
import './App.css';
import Frameworks from './components/Frameworks';
import logo from './H (1).png';
import Login from './components/loginPage'
import Review from './components/Review';
import UpProject from './components/uploadProject';
import UpSkill from './components/skillUpload';
import ProjectHome from './components/projectHome';
import UserDashboard from './components/dashboard';
import { useContext } from 'react';
export const myContext= createContext();

const App = ( {children}) => {

  const [windowSize, setWindowSize] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
 const [windowResized,setWindowResized]= useState(false);
 const [isNavbarExpanded, setIsNavbarExpanded] = useState(false);

 const isReviewPage = window.location.href.includes('/review');
 const isUploadProject = window.location.href.includes('/upProject');
 const isUpskill = window.location.href.includes('/upSkill');
 const isPorject = window.location.href.includes('/projects');
 const isDashBoard = window.location.href.includes('/dashboard');
 const isLogin = window.location.href.includes('/login');





  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setWindowResized(!windowResized);
    setIsNavbarExpanded(!isNavbarExpanded);
  };

  const handleBackward = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth <= 1000);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);















  useEffect(() => {
    if (isNavbarExpanded) {
      document.body.classList.add('expanded-navbar');
    } else {
      document.body.classList.remove('expanded-navbar');
    }
  }, [isNavbarExpanded]);

  const handleNavbarExpand = () => {
    const shouldExpandNavbar = window.innerWidth >= 1000; 
    setIsNavbarExpanded(shouldExpandNavbar);
  };

  useEffect(() => {
    handleNavbarExpand();

    window.addEventListener('resize', handleNavbarExpand);

    return () => {
      window.removeEventListener('resize', handleNavbarExpand);
    };
  }, []);





  return (
    <>
    <myContext.Provider value={windowResized}>
      <Router>
        {!windowSize ? (
          <nav>
            <img src={logo} alt="logo" className="logo-img" onClick={handleBackward} />
            <ul>
              <li>
                <a href="https://www.instagram.com/vishva_.1301/">
                  <FontAwesomeIcon className="social social-icons1" icon={faInstagram} />
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/vishwa.naik.9659">
                  <FontAwesomeIcon className="social social-icons2" icon={faFacebook} />
                </a>
              </li>
              <li>
                <a href="https://github.com/vishwa-vbn/">
                  <FontAwesomeIcon className="social social-icons3" icon={faGithub} />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/vishwa-vbn/">
                  <FontAwesomeIcon className=" social social-icons4" icon={faLinkedin} />
                </a>
              </li>
              <li>
                <ScrollLink to="projects" className="projects-btn" smooth={true} duration={500}>
                  Projects
                </ScrollLink>
              </li>
            </ul>
          </nav>
        ) : (
          <nav className={`vertical ${showMenu? 'expanded': ''}`}>
            <img src={logo} alt="logo" className="logo-img" onClick={handleBackward}/>
            <div className="menu-icon" onClick={toggleMenu}>
              <FontAwesomeIcon className="bar" icon={faBars}></FontAwesomeIcon>
            </div>
            {showMenu && (
              <ul className="vertical-nav">
                <>
                  <li>
                    <a href="https://www.instagram.com/your_account">
                      <FontAwesomeIcon className="social social-icons1" icon={faInstagram} />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/your_account">
                      <FontAwesomeIcon className="social social-icons2" icon={faFacebook} />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.github.com/your_account">
                      <FontAwesomeIcon className="social social-icons3" icon={faGithub} />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/your_account">
                      <FontAwesomeIcon className=" social social-icons4" icon={faLinkedin} />
                    </a>
                  </li>
                  <li>
                    <ScrollLink to="projects" className="projects-btn" smooth={true} duration={500}>
                      Projects
                    </ScrollLink>
                  </li>
                </>
              </ul>
            )}
          </nav>
        )}
        <Routes>
        {!isReviewPage && <Route path="/login" element={<Login />} />}

          {!isReviewPage && <Route path="/" element={<Home />} />}
          {!isReviewPage && <Route path="/projects" exact element={<Projects />} />}
          {!isReviewPage && <Route path="/tech" element={<Frameworks />} />}
          {!isReviewPage && <Route path="/project/:projectId" element={<ProjectPage />} />}
          {!isReviewPage && <Route path="/contact" element={<Contact />} />}
          {!isReviewPage && <Route path="/blog" element={<Blog />} />}
          {isReviewPage && <Route path="/review" element={<Review />} />}


          {!isReviewPage && <Route exact path="/dashboard" element={<UserDashboard  />} /> }


          {!isReviewPage &&  <Route path="/upskill" element={<UpSkill  />} />}
          
          {!isReviewPage &&  <Route path="/upProject" element={<UpProject  />} />}
        </Routes>
      </Router>

      {!isReviewPage && !isUploadProject && !isUpskill && !isPorject && !isDashBoard && !isLogin &&(
        <>
          <Frameworks />
          <ProjectHome />
          <Blog />
          <Contact />
      </>
     )}

      </myContext.Provider>
    </>
  );
};

export default App;