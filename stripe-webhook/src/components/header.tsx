import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-100 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-xl font-semibold">Stripe</a>
        <div className='flex items-center gap-2 '>
          <a href="https://www.linkedin.com/in/jacksonkasi" className="mx-2" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/jacksonkasi1/" className="mx-2" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://instagram.com/jacksonkasi555" className="mx-2" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
