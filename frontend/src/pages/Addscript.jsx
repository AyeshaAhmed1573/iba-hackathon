import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
function AddScript({ onAddScript }) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [usage, setUsage] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddScript({ title, code, usage, isPublic });
    setTitle('');
    setCode('');
    setUsage('');
    setIsPublic(true);
  };

  return (
    <div className=" mb-6 ">
      <h2 className="text-xl font-bold mb-2">Add Script</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded-md outline-gray-300 outline-2 shadow-md shadow-white text-gray-100 mt-2"
        />
        <textarea
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-2 rounded-md outline-gray-300 outline-2 shadow-md shadow-white text-gray-100 mt-6"
        />
        <input
          type="text"
          placeholder="Usage"
          value={usage}
          onChange={(e) => setUsage(e.target.value)}
          className="w-full p-2 rounded-md outline-gray-300 outline-2 shadow-md shadow-white text-gray-100 mt-6"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          <span className='text-white'>Make Public</span>
        </label>
        <button type="submit" className="bg-indigo-800 text-white p-2 rounded-md">
          Add Script
        </button>
      </form>
    </div>
  );
}

export default AddScript;