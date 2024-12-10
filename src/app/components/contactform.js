'use client';

import { useState,  useEffect } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      if (image) {
        formDataToSend.append('image', image);
      }

      const NEXT_PUBLIC_API_URL = "http://contact-system-backend-env-1.eba-7qxzuebj.us-east-2.elasticbeanstalk.com/";
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/contact`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Submission failed');

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setImage(null);
      setPreview('');
      
      // Cleanup preview URL
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const [submissions, setSubmissions] = useState([]);

  // Add this useEffect to fetch submissions
  useEffect(() => {
    fetchSubmissions();
  }, [success]); // Refetch when new submission is successful

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submissions`);
      if (!response.ok) throw new Error('Failed to fetch submissions');
      const data = await response.json();
      setSubmissions(data);
    } catch (err) {
      console.error('Error fetching submissions:', err);
    }
  };

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Message sent successfully!
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2">Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded h-32"
          />
        </div>

        <div>
          <label className="block mb-2">Image (optional):</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {preview && (
            <div className="mt-2">
              <img 
                src={preview} 
                alt="Upload preview" 
                className="h-32 object-contain"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white rounded ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Sending...' : 'Submit'}
        </button>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recent Submissions</h2>
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div key={submission.id} className="border rounded-lg p-4 bg-white shadow">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">{submission.name}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(submission.created_at).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-600 mb-2">{submission.email}</p>
              <p className="text-gray-800">{submission.message}</p>
              {submission.image_url && (
                <div className="mt-2">
                  <img 
                    src={submission.image_url} 
                    alt="Submission attachment"
                    className="max-h-40 object-contain rounded"
                  />
                </div>
              )}
            </div>
          ))}
          {submissions.length === 0 && (
            <p className="text-gray-500 text-center">No submissions yet</p>
          )}
        </div>
      </div>
    </div>

    
    
  );
}