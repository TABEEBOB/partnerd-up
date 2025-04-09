import React, { useState } from 'react';
import MatchUsers from './screens/MatchUsers';
import Messaging from './screens/Messaging';
import ScheduleWorkout from './screens/ScheduleWorkout';

const App = () => {
  const [step, setStep] = useState(0);
  const next = () => setStep(step + 1);

  const screens = [
    <MatchUsers next={next} />,
    <Messaging next={next} />,
    <ScheduleWorkout />,
  ];

  return <div className="p-6 max-w-2xl mx-auto">{screens[step]}</div>;
};

export default App;
