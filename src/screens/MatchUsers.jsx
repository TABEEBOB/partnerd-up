import React from 'react';
import { useUser } from '../context/UserContext';

const mockMatches = [
  {
    name: 'Jordan',
    location: '90210',
    level: 'Intermediate',
    preferences: 'Cardio, Yoga',
    availability: 'Evenings',
  },
  {
    name: 'Taylor',
    location: '10001',
    level: 'Beginner',
    preferences: 'Strength, HIIT',
    availability: 'Mornings',
  },
];

const MatchUsers = ({ next }) => {
  const { user } = useUser();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Welcome, {user.name}!</h2>
      <p>Based on your preferences, here are your suggested matches:</p>
      {mockMatches.map((match, i) => (
        <div key={i} className="border p-4 rounded bg-white shadow">
          <p><strong>Name:</strong> {match.name}</p>
          <p><strong>Location:</strong> {match.location}</p>
          <p><strong>Level:</strong> {match.level}</p>
          <p><strong>Preferences:</strong> {match.preferences}</p>
          <p><strong>Availability:</strong> {match.availability}</p>
          <button
            onClick={next}
            className="mt-2 bg-indigo-600 text-white px-4 py-1 rounded"
          >
            Connect
          </button>
        </div>
      ))}
    </div>
  );
};

export default MatchUsers;
