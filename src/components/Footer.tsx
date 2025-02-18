import { FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-lg mb-2">Created by <span className="font-bold">Alejandrette</span></p>
        <a 
          href="https://github.com/alejandrette" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center justify-center text-white hover:text-orange-500 transition-colors"
        >
          <FaGithub className="mr-2" /> Visit my GitHub
        </a>
        <p className="mt-4 text-xs">© 2025 SoundWave Store. All rights reserved.</p>
      </div>
    </footer>
  )
}
