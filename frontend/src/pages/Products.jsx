import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Layout from '../components/Layout';

function Product() {
  const [scripts, setScripts] = useState([]);
  const [copiedScriptId, setCopiedScriptId] = useState(null); // Track which script's code was copied

  // Fetch public scripts
  useEffect(() => {
    const fetchScripts = async () => {
      const scriptsQuery = query(collection(db, 'scripts'), where('isPublic', '==', true));
      const scriptsSnapshot = await getDocs(scriptsQuery);
      const scriptsData = scriptsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setScripts(scriptsData);
    };

    fetchScripts();
  }, []);

  // Function to copy code to clipboard
  const copyCodeToClipboard = (code, scriptId) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopiedScriptId(scriptId); // Set the copied script ID
        setTimeout(() => setCopiedScriptId(null), 2000); // Reset after 2 seconds
      })
      .catch((error) => {
        console.error('Failed to copy code:', error);
      });
  };

  return (
    <Layout>
      <div className="w-full min-h-screen bg-gradient-to-bl from-gray-950 via-indigo-950 to-rose-950 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Display Public Scripts */}
            {scripts.map((script) => (
              <div
                key={script.id}
                className="w-full h-fit bg-indigo-900 shadow-md rounded-md p-6 flex flex-col items-center justify-center text-white relative"
              >
                <h2 className="text-xl font-bold text-white mb-4">Script</h2>
                <div className="w-full h-auto bg-indigo-700 p-6 rounded-md shadow flex flex-col items-start justify-center overflow-hidden">
                  <div className="text-lg font-semibold text-left">
                    <h3 className="text-2xl font-bold">{script.title}</h3>
                    {/* Code Snippet with Copy Button */}
                    <div className="relative">
                      <pre className="text-sm whitespace-pre-wrap bg-gray-800 p-4 rounded-md mt-2 mb-2">
                        {script.code}
                      </pre>
                      <button
                        onClick={() => copyCodeToClipboard(script.code, script.id)}
                        className="absolute bottom-2 right-2 bg-gray-700 text-white px-2 py-1 rounded-md hover:bg-gray-600 transition-colors text-xs"
                      >
                        {copiedScriptId === script.id ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <h4 className="text-xl font-bold">Usage</h4>
                    <p>{script.usage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Product;