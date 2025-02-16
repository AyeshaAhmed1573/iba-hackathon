import React, { useState } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
function ScriptList({ scripts, onDeleteScript, onUpdateScript }) {
  const [editingScriptId, setEditingScriptId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedCode, setUpdatedCode] = useState('');
  const [updatedUsage, setUpdatedUsage] = useState('');
  const [updatedIsPublic, setUpdatedIsPublic] = useState(true);

  const handleEdit = (script) => {
    setEditingScriptId(script.id);
    setUpdatedTitle(script.title);
    setUpdatedCode(script.code);
    setUpdatedUsage(script.usage);
    setUpdatedIsPublic(script.isPublic);
  };

  const handleSave = (scriptId) => {
    onUpdateScript(scriptId, {
      title: updatedTitle,
      code: updatedCode,
      usage: updatedUsage,
      isPublic: updatedIsPublic,
    });
    setEditingScriptId(null);
  };

  return (
    <div className=' '>
      <h2 className="text-xl font-bold text-gray-300  mb-4">Your Scripts</h2>
      {scripts.map((script) => (
        <div key={script.id} className="bg-indigo-800 to bg-gray-700 p-4 rounded-md mb-4">
          {editingScriptId === script.id ? (
            <div className="space-y-2">
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="w-full p-2 rounded-md"
              />
              <textarea
                value={updatedCode}
                onChange={(e) => setUpdatedCode(e.target.value)}
                className="w-full p-2 rounded-md"
              />
              <input
                type="text"
                value={updatedUsage}
                onChange={(e) => setUpdatedUsage(e.target.value)}
                className="w-full p-2 rounded-md"
              />
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={updatedIsPublic}
                  onChange={(e) => setUpdatedIsPublic(e.target.checked)}
                />
                <span>Make Public</span>
              </label>
              <button
                onClick={() => handleSave(script.id)}
                className="bg-green-600 text-white p-2 rounded-md"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-bold">{script.title}</h3>
              <pre className="text-sm whitespace-pre-wrap">{script.code}</pre>
              <p className="text-sm">{script.usage}</p>
              <p className="text-sm">{script.isPublic ? 'Public' : 'Private'}</p>
              <button
                onClick={() => handleEdit(script)}
                className="bg-indigo-800 text-white p-2 rounded-md mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteScript(script.id)}
                className="bg-red-600 text-white p-2 rounded-md"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ScriptList;