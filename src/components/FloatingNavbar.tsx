import React from 'react';


export function FloatingNavbar() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 40px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000,
      }}
    >
       <img
            src="https://spur-uploads.s3.ap-south-1.amazonaws.com/360/7799_spurlogobluebg.svg"
            alt="Spur"
            style={{
              width: "40px",
              height: "40px",
            }}
          />
    </div>
  );
}
