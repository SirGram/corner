import { FaGithub, FaEnvelope } from "react-icons/fa";
import { useGlobalContext } from "../context/GlobalContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useGlobalContext();

  return (
    <footer
      id="contact"
      className="w-full bg-gradient-to-b from-base-100 to-base-200 dark:from-darkBase-100 dark:to-darkBase-200 text-text dark:text-darkText pt-14 pb-20 relative z-20"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            SirGram
          </span>
          <p className="text-sm mt-1">
            © {currentYear}
            {language === "en"
              ? " All rights reserved"
              : " Todos los derechos reservados"}
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end">
          <div className="flex space-x-4 mb-2">
            <a
              href="https://github.com/sirgram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text hover:text-gray-800 dark:text-darkText dark:hover:text-white transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={24} />
            </a>
            {/*  <a
              href="https://linkedin.com/in/YourLinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text hover:text-gray-800 dark:text-darkText dark:hover:text-white transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <FaLinkedin size={24} />
            </a> */}
            <a
              href="mailto:sirgramcg@gmail.com"
              className="text-text hover:text-gray-800 dark:text-darkText dark:hover:text-white transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <FaEnvelope size={24} />
            </a>
          </div>
          <p className="text-sm">
            {language === "en" ? "Contact: " : "Contacto: "}sirgramcg@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
}
