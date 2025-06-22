import React from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
    <Layout>
      <div className=" w-full min-h-screen g-gradient-to-bl from-gray-950 via-indigo-950 to-rose-950">
        {/* Header */}
       
        {/* Hero Section */}
        <div className="flex flex-col g-gradient-to-bl from-gray-950 via-indigo-950 to-rose-950 lg:flex-row justify-around items-center px-6 py-10 lg:py-20">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white p-5">
              Share, Learn, and Secure with Open-Source Cybersecurity Scripts
            </h1>
            <p className="text-gray-200 p-5 text-lg">
              Explore a collection of ethical hacking scripts, pentesting tools, and security resources—built by hackers, for hackers.
            </p>
         <Link to={'/Products'}>  <button className="w-40 p-3 bg-indigo-800 rounded-xl text-white text-lg hover:bg-indigo-700 transition duration-300">
              Scripts
            </button></Link> 
          </div>

          {/* GIF Image */}
          <div className="w-full lg:w-1/2 h-[300px] lg:h-[400px] mt-10 lg:mt-0 flex justify-center items-center">
            <img
              className="w-3/4 lg:w-full h-auto object-contain"
              src="https://giffiles.alphacoders.com/984/98436.gif"
              alt="Cybersecurity GIF"
            />
          </div>
        </div>
        <div className="w-full min-h-screen bg-gradient-to-bl from-gray-950 via-indigo-950 to-rose-950 flex flex-col items-center text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">🚀 About Us</h1>
      <p className="text-lg text-center max-w-3xl">
        Welcome to <span className="text-indigo-400 font-bold">CyberHub</span>, the ultimate hub for cybersecurity professionals, ethical hackers, and tech enthusiasts. Our platform is designed to{" "}
        <span className="font-bold">empower the cybersecurity community</span> by providing open-source scripts, penetration testing tools, and security resources to help protect digital landscapes.
      </p>

      <div className="mt-10 max-w-4xl text-center space-y-6">
        <h2 className="text-2xl font-semibold text-indigo-400">🔍 Who We Are</h2>
        <p>
          We are a team of <span className="font-bold">ethical hackers, security researchers, and developers</span> dedicated to making the internet a safer place. With the rise of cyber threats, we believe in{" "}
          <span className="font-bold">collaboration over isolation</span>—a space where cybersecurity experts can share knowledge, tools, and techniques to <span className="font-bold">fortify digital defenses</span>.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-400">🛡️ Our Mission</h2>
        <p>
          Our goal is to create a <span className="font-bold">secure, transparent, and open-source cybersecurity ecosystem</span> where professionals can learn, collaborate, and develop solutions to <span className="font-bold">combat real-world cyber threats</span>.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-400">✅ What We Offer</h2>
        <ul className="list-disc list-inside ">
          <li>🔹 <span className="font-bold">Open-Source Security Scripts</span>  A collection of cybersecurity automation tools.</li>
          <li>🔹 <span className="font-bold">Ethical Hacking Resources</span>  Learn penetration testing & bug bounty techniques.</li>
          <li>🔹 <span className="font-bold">Community-Driven Knowledge Sharing</span>  Collaborate with security experts.</li>
          <li>🔹 <span className="font-bold">Real-World Cyber Defense Strategies</span>  Stay ahead of cyber threats.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-indigo-400">🌍 Join the Movement</h2>
        <p>
          Whether you're a <span className="font-bold">white-hat hacker, security engineer, or beginner in cybersecurity</span>, CyberVault welcomes you to be part of a <span className="font-bold">growing global community</span>.
        </p>
      </div>

      
    </div>
        {/* Call-to-Action Section */}
        <section className="flex items-center justify-center px-6 py-12 bg-gray-900 text-white min-h-[50vh] text-center">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Collaborate seamlessly, accomplish more.
            </h2>
            <p className="text-lg text-gray-300">
              Work with your team, streamline your projects with synchronized management tools, and code from anywhere—all on one unified platform.
            </p>
          </div>
        </section>
      </div>
      </Layout>
    </>
  );
}

export default Home;