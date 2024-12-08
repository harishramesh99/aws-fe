'use client';

import { useState, useEffect } from 'react';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submissions`)
      .then(res => res.json())
      .then(data => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Submissions</h1>
      <div className="grid gap-4">
        {submissions.map(submission => (
          <div key={submission.id} className="border p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">{submission.name}</h2>
              <span className="text-gray-500">{new Date(submission.created_at).toLocaleString()}</span>
            </div>
            <div className="text-gray-600 mb-2">{submission.email}</div>
            <p className="mb-4">{submission.message}</p>
            {submission.image_url && (
              <img 
                src={submission.image_url} 
                alt="Submission attachment" 
                className="max-h-48 object-contain rounded"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}