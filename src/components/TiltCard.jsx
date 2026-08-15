import React, { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

const TiltCard = ({ children, options = {}, className = '', ...rest }) => {
  const tiltRef = useRef(null);

  useEffect(() => {
    const element = tiltRef.current;
    
    const defaultOptions = {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
      perspective: 1000,
      scale: 1.02,
      transition: true,
    };

    VanillaTilt.init(element, {
      ...defaultOptions,
      ...options
    });

    return () => {
      if (element && element.vanillaTilt) {
        element.vanillaTilt.destroy();
      }
    };
  }, [options]);

  return (
    <div 
      ref={tiltRef} 
      className={className} 
      {...rest} 
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

export default TiltCard;
