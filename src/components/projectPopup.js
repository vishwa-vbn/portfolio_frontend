import React, { useState, useMemo, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useParams, useNavigate } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faRocket } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import './ProjectPopup.css';

const ProjectPage = ({ project }) => {
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const goBack = () => {
    window.location.href = '/projects';
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const openLink = (link) => {
    if (link) {
      window.open(link, '_blank');
    }
  };

  const imageItems = useMemo(() => {
    return project.uiuxImages.map((image, index) => (
      <div key={index}>
        <img
          src={URL.createObjectURL(
            new Blob([new Uint8Array(image.data)], { type: 'image/jpeg' })
          )}
          alt={`Project Slide ${index}`}
        />
      </div>
    ));
  }, [project.uiuxImages]);

  useEffect(() => {
    return () => {
      project.uiuxImages.forEach((image) => {
        URL.revokeObjectURL(
          URL.createObjectURL(new Blob([new Uint8Array(image.data)], { type: 'image/jpeg' }))
        );
      });
    };
  }, [project.uiuxImages]);

  return (
    <>
      <button className="back-btn" onClick={goBack}>
        <FontAwesomeIcon icon={faAngleLeft} />
        Back
      </button>

      <div className="project-page">
        <div className="description">
          <p>
            {showFullDescription
              ? project.description
              : project.description.substring(0, 200)}
            {project.description.length > 200 && !showFullDescription && (
              <button className="read-more-btn" onClick={toggleDescription}>
                Read more
              </button>
            )}
          </p>
        </div>
        <div className="image-gallery">
          <Carousel
            showThumbs={false}
            showStatus={false}
            dotClassName="custom-dot"
            style={{ width: '80%' }}
          >
            {imageItems}
          </Carousel>
        </div>
        <div className="buttons-container">
          <button className="link-button" onClick={() => openLink(project.deployedLink)}>
            <FontAwesomeIcon className="project-icon" icon={faRocket} />
            Deployed
          </button>
          <button className="link-button" onClick={() => openLink(project.githubRepoLink)}>
            <FontAwesomeIcon className="project-icon" icon={faGithub} />
            GitHub
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
