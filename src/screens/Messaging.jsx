import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';

const Messaging = ({ next }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'messages'), (snapshot) => {
      const msgs = snapshot.docs.map(doc => doc.data());
      setMessages(msgs);
    });
    return () => unsub();
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;
    await addDoc(collection(db, 'messages'), {
      from: 'You',
      text: message,
      timestamp: serverTimestamp()
    });
    setMessage('');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Chat with Jordan</h2>
      <div className="bg-white p-4 rounded shadow h-60 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <strong>{msg.from}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-grow p-2 border rounded"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSend} className="bg-indigo-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
      <button onClick={next} className="mt-4 bg-gray-300 px-4 py-2 rounded">Next</button>
    </div>
  );
};

export default Messaging;
