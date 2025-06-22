import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import AddScript from './Addscript';
import ScriptList from './ScriptList';
import Layout from '../components/Layout';

function Dashboard() {
  const [scripts, setScripts] = useState([]);

  // Fetch user's scripts
  useEffect(() => {
    const fetchScripts = async () => {
      if (!auth.currentUser) return;

      // Fetch scripts created by the user
      const scriptsQuery = query(collection(db, 'scripts'), where('createdBy', '==', auth.currentUser.uid));
      const scriptsSnapshot = await getDocs(scriptsQuery);
      const scriptsData = scriptsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setScripts(scriptsData);
    };

    fetchScripts();
  }, []);

  // Add a new script
  const handleAddScript = async (newScript) => {
    try {
      const docRef = await addDoc(collection(db, 'scripts'), {
        ...newScript,
        createdBy: auth.currentUser.uid,
      });
      setScripts([...scripts, { id: docRef.id, ...newScript }]);
    } catch (error) {
      console.error('Error adding script:', error);
    }
  };

  // Delete a script
  const handleDeleteScript = async (scriptId) => {
    try {
      await deleteDoc(doc(db, 'scripts', scriptId));
      setScripts(scripts.filter(script => script.id !== scriptId));
    } catch (error) {
      console.error('Error deleting script:', error);
    }
  };

  // Update a script
  const handleUpdateScript = async (scriptId, updatedScript) => {
    try {
      await updateDoc(doc(db, 'scripts', scriptId), updatedScript);
      setScripts(scripts.map(script =>
        script.id === scriptId ? { ...script, ...updatedScript } : script
      ));
    } catch (error) {
      console.error('Error updating script:', error);
    }
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-bl from-gray-950 via-indigo-950 to-rose-950   p-8">
      <div className="max-w-4xl mx-auto">
        {/* Dashboard Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-100">Dashboard</h1>
          <p className="text-gray-300 mt-2">Manage your scripts and tools</p>
        </header>

        {/* Add Script Form */}
        <section className=" p-6 rounded-lg shadow-md bg-gray-900 mb-8">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Add a New Script</h2>
          <AddScript  onAddScript={handleAddScript} />
        </section>

        {/* Display User's Scripts */}
        <section className="bg-gray-900 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">Your Scripts</h2>
          <ScriptList
            scripts={scripts}
            onDeleteScript={handleDeleteScript}
            onUpdateScript={handleUpdateScript}
          />
        </section>
      </div>
    </div>
    </Layout>
  );
}

export default Dashboard;