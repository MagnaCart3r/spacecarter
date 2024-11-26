import React from 'react';
import { ArrowLeft, Github, Rocket, Globe } from 'lucide-react';

interface AboutProps {
  onBack: () => void;
}

export const About: React.FC<AboutProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Explorer
      </button>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Developer Card */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 transform hover:scale-[1.02] transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
              <Globe className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Carter Ewanfoh</h2>
              <p className="text-gray-400">Full-Stack Developer</p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">
            A tech-savvy full-stack developer with a passion for space exploration. 
            An enthusiast of pseudoscience, Anunnaki, and Project Blue Beam, 
            I closely follow multi-planetary missions.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="https://github.com/carewfoh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>

        {/* Project Card */}
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 transform hover:scale-[1.02] transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
              <Rocket className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">SpaceCarter</h2>
              <p className="text-gray-400">Mars Explorer</p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed mb-4">
            Introducing SpaceCarter, an innovative app developed to bring the wonders 
            of Mars exploration right to your fingertips. This app allows users to 
            view live photos shared by NASA's Mars Rover, providing a real-time 
            window into the Red Planet.
          </p>
          <p className="text-gray-300 leading-relaxed">
            A special note of appreciation to NASA for providing the Demo API keys, 
            which were instrumental in the development of this application. Your 
            support and resources have enabled us to create a platform that inspires 
            curiosity and brings space exploration closer to everyone.
          </p>
        </div>
      </div>
    </div>
  );
};