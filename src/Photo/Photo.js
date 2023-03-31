import React from "react";

import "./photo.scss";

function Photo({ photo }) {
  return (
    <div className="photoContainer">
      <a
        href={photo.url}
        target="_blank"
        rel="noreferrer"
        className="photoLink"
      >
        <img
          src={photo.src.large}
          alt={photo.src.alt}
          className="photo"
          loading="lazy"
        />
      </a>
      <div className="photoOverlay">
        <a
          href={photo.photographer_url}
          target="_blank"
          rel="noreferrer"
          className="photographerLink"
        >
          © {photo.photographer}
        </a>
      </div>
    </div>
  );
}

export default Photo;
