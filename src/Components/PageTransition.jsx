import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
    const containerRef = useRef(null);
    const location = useLocation(); // Detect route changes

    useLayoutEffect(() => {
        // GSAP animation for entering the component
        gsap.fromTo(
            containerRef.current,
            { opacity: 0, },
            { opacity: 1, duration: 0.7 }
        );
    }, [location.pathname]); // Re-run animation on pathname change

    return <div ref={containerRef}>{children}</div>;
};

export default PageTransition;
