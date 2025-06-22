import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Layout from '../components/Layout';
import { useLocation } from 'react-router-dom';
import './Products.css';

function Product() {
  const [scripts, setScripts] = useState([]);
  const [copiedScriptId, setCopiedScriptId] = useState(null); // Track which script's code was copied
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Fetch public scripts
  const fetchScripts = async () => {
    setLoading(true);
    const scriptsQuery = query(collection(db, 'scripts'), where('isPublic', '==', true));
    const scriptsSnapshot = await getDocs(scriptsQuery);
    const scriptsData = scriptsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setScripts(scriptsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchScripts();
    // Refetch scripts whenever the location changes to this page
    // This ensures scripts are up-to-date when navigating back
    // eslint-disable-next-line
  }, [location.pathname]);

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
          <div className="flex justify-end mb-4">
            <button
              onClick={fetchScripts}
              className="bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Display Public Scripts */}
            {scripts.map((script) => (
              <div
                key={script.id}
                className="w-full h-fit bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 bg-opacity-60 shadow-2xl rounded-3xl p-6 pt-14 flex flex-col items-center justify-between text-white relative transition-transform transform hover:scale-105 hover:shadow-2xl border border-indigo-400 backdrop-blur-lg animate-fade-in"
                style={{ minHeight: '370px', fontFamily: 'Poppins, Inter, sans-serif', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
              >
                {/* Public Badge - now above the title */}
                <span className="absolute top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-white/20 z-10 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 4h-1v-4h-1m-4 4h-1v-4h-1" /></svg>
                  Public
                </span>
                <h3 className="text-2xl font-extrabold text-indigo-100 mb-2 tracking-wide text-center w-full truncate drop-shadow-lg" style={{letterSpacing: '0.03em'}}> {script.title} </h3>
                <div className="w-full flex-1 flex flex-col justify-between">
                  {/* Code Snippet with Copy Button */}
                  <div className="relative mb-4">
                    <pre className="text-sm whitespace-pre-wrap bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-800 bg-opacity-80 p-4 rounded-xl mt-2 mb-2 border-2 border-indigo-500/30 overflow-x-auto max-h-40 shadow-inner font-mono text-indigo-100 transition-all duration-300" style={{backdropFilter: 'blur(4px)'}}>
                      {script.code}
                    </pre>
                    <button
                      onClick={() => copyCodeToClipboard(script.code, script.id)}
                      className="absolute bottom-3 right-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:from-pink-500 hover:to-yellow-500 transition-all text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-300 border-2 border-white/20"
                      style={{boxShadow: '0 4px 14px 0 rgba(0,0,0,0.25)'}}
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' className='inline-block mr-1' width='16' height='16' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 16h8M8 12h8m-7 8h6a2 2 0 002-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2z' /></svg>
                      {copiedScriptId === script.id ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-lg font-bold text-indigo-200 mb-1 tracking-wide">Usage</h4>
                    <p className="text-indigo-100 text-sm break-words leading-relaxed">{script.usage}</p>
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