'use client';

import React, { useState } from 'react';
import ContactForm from './contactform';

const LandingPage = () => {
  const [showContact, setShowContact] = useState(false);

  if (showContact) {
    return <ContactForm onNavigateHome={() => setShowContact(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center max-w-6xl mx-auto w-full">
        <div className="text-2xl font-bold text-blue-600">Your Brand</div>
        <nav>
          <button 
            onClick={() => setShowContact(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-20 w-full">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Our Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing features and solutions that will transform your experience.
            Join us today and start your journey.
          </p>
          <button 
            onClick={() => setShowContact(true)}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Get Started
          </button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {[
            { title: 'Feature 1', desc: 'Amazing feature description goes here' },
            { title: 'Feature 2', desc: 'Another great feature explained' },
            { title: 'Feature 3', desc: 'One more awesome feature detailed' }
          ].map((feature, idx) => (
            <div key={idx} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4">Your Brand</h3>
              <p className="text-gray-400">
                Making the world a better place through innovative solutions.
              </p>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-white">
                  Twitter
                </button>
                <button className="text-gray-400 hover:text-white">
                  LinkedIn
                </button>
                <button className="text-gray-400 hover:text-white">
                  Facebook
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-white">About Us</button></li>
                <li><button className="text-gray-400 hover:text-white">Services</button></li>
                <li><button className="text-gray-400 hover:text-white">Blog</button></li>
                <li><button onClick={() => setShowContact(true)} className="text-gray-400 hover:text-white">Contact</button></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><button className="text-gray-400 hover:text-white">Documentation</button></li>
                <li><button className="text-gray-400 hover:text-white">Help Center</button></li>
                <li><button className="text-gray-400 hover:text-white">Privacy Policy</button></li>
                <li><button className="text-gray-400 hover:text-white">Terms of Service</button></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <div className="flex flex-col space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-gray-800 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 Your Brand. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;