import React, { useState, useEffect } from "react";
import './NotFound.css';

const NotFound = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='allSpots-wrapper1'>
      {isLoading ? (
        <div>LOADING...</div>
      ) : (
        <div>404 PAGE NOT FOUND</div>
      )}
    </div>
  );
};

export default NotFound;
