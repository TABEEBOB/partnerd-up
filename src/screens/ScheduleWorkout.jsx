import React, { useState } from 'react';
import { db } from '../firebase-config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const ScheduleWorkout = () => {
  const [scheduled, setScheduled] = useState(false);
  const [details, setDetails] = useState({ date: '', time: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'workouts'), {
      ...details,
      createdAt: serverTimestamp()
    });
    setScheduled(true);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Schedule a Workout</h2>
      {!scheduled ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            name="date"
            type="date"
            className="input"
            value={details.date}
            onChange={handleChange}
            required
          />
          <input
            name="time"
            type="time"
            className="input"
            value={details.time}
            onChange={handleChange}
            required
          />
          <input
            name="type"
            placeholder="Workout Type (e.g. Cardio)"
            className="input"
            value={details.type}
            onChange={handleChange}
            required
          />
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
            Propose Workout
          </button>
        </form>
      ) : (
        <div className="p-4 bg-green-100 rounded">
          <p><strong>Workout Scheduled!</strong></p>
          <p>{details.type} on {details.date} at {details.time}</p>
        </div>
      )}
    </div>
  );
};

export default ScheduleWorkout;
