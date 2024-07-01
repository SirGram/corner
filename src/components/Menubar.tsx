import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaProjectDiagram, FaInfoCircle } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Menubar() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id:string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (id: string, index: number) => {
    if (location.pathname === "/") {
      scrollToSection(id);
    } else {
      navigate("/");
      setTimeout(() => scrollToSection(id), 100);
    }
    setActiveIndex(index);
  };

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'home') setActiveIndex(0);
    else if (hash === 'projects') setActiveIndex(1);
    else if (hash === 'about') setActiveIndex(2);
  }, [location]);

  const getBackgroundStyle = () => {
    const index = hoverIndex !== null ? hoverIndex : activeIndex;
    return {
      left: `${index * 33.33}%`,
      width: "33.33%",
      height: "100%",
      top: 0,
      bottom: 0,
    };
  };

  return (
    <nav className="fixed top-2 flex justify-center w-full items-start text-lg z-30">
      <div className="flex gap-3 px-1 bg-base-100 rounded-base border-base border-border bg-base relative overflow-hidden">
        <div
          className="absolute bg-base-200 transition-all duration-300 ease-out rounded-base h-full"
          style={getBackgroundStyle()}
        />
        <a
          
          href="#home"
          onClick={(e) => { e.preventDefault(); handleNavigation('home', 0); }}
          className={`p-3 hover:no-underline flex items-center gap-2 transition-colors duration-200 relative z-10`}
          onMouseEnter={() => setHoverIndex(0)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <FaHome className="md:hidden" />
          <span className="hidden md:block">Home</span>
        </a>
        <a
          href="#projects"
          onClick={(e) => { e.preventDefault(); handleNavigation( 'projects', 1); }}
          className={`p-3 flex hover:no-underline gap-2 items-center transition-colors duration-200 relative z-10`}
          onMouseEnter={() => setHoverIndex(1)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <FaProjectDiagram className="md:hidden" />
          <span className="hidden md:block">Projects</span>
        </a>
        <a
          href="#about"
          onClick={(e) => { e.preventDefault(); handleNavigation('about', 2); }}
          className={`p-3 flex gap-2 hover:no-underline items-center transition-colors duration-200 relative z-10`}
          onMouseEnter={() => setHoverIndex(2)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <FaInfoCircle className="md:hidden" />
          <span className="hidden md:block">About</span>
        </a>
      </div>
    </nav>
  );
}