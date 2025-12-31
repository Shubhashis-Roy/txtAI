import React from 'react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '80px 60px',
        background: 'linear-gradient(135deg, #eef2ff 0%, #f9fafb 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '40px',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Hero Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          fontSize: '4rem',
          fontWeight: 700,
          color: '#111827',
          lineHeight: 1.2,
        }}
      >
        Welcome to Spur AI
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          fontSize: '1.25rem',
          maxWidth: '650px',
          color: '#374151',
          lineHeight: 1.6,
        }}
      >
        Need help with your order? Our AI assistant is here to answer your questions instantly—whether it's tracking your package, understanding our return policy, or exploring our latest deals. Get support anytime, hassle-free.
      </motion.p>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
        }}
      >
        {[
          {
            title: 'Fast Shipping',
            desc: 'Get your orders delivered quickly, with free shipping on purchases over $50.',
          },
          {
            title: 'Easy Returns',
            desc: 'Changed your mind? Enjoy simple returns within 30 days—no questions asked.',
          },
          {
            title: '24/7 Assistance',
            desc: 'Our AI support is available anytime to help you with orders, tracking, and FAQs.',
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              cursor: 'pointer',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '10px', color: '#111827' }}>
              {card.title}
            </h3>
            <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.5 }}>
              {card.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
}
