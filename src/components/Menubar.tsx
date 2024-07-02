import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaProjectDiagram, FaInfoCircle, FaCog } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { Language, Theme } from "../types/types";

export default function Menubar() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { setTheme, theme, language, changeLanguage } = useGlobalContext();

  const [isExtended, setIsExtended] = useState(false);
  const menubarRef = useRef<HTMLDivElement>(null);

  const cogButtonRef = useRef<HTMLButtonElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
    const hash = location.hash.replace("#", "");
    if (hash === "home") setActiveIndex(0);
    else if (hash === "projects") setActiveIndex(1);
    else if (hash === "about") setActiveIndex(2);
  }, [location]);

  // Set isExtended to false when clicking outside of the menubar if isExtended is true
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menubarRef.current &&
        !menubarRef.current.contains(event.target as Node) &&
        cogButtonRef.current &&
        !cogButtonRef.current.contains(event.target as Node)
      ) {
        setIsExtended(false);
        console.log("Clicked outside, menubar is now closed.");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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

  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    setIsSpinning(true);
    setIsExtended(prevState => !prevState);
    setTimeout(() => {
      setIsSpinning(false);
    }, 500);
  };

  return (
    <nav className="fixed top-2 flex justify-center w-full items-start text-lg z-30">
      <div className="flex flex-col items-center">
        <div className="flex items-center">
          <div
            ref={menubarRef}
            className="flex gap-3 px-1 bg-base-100 dark:bg-darkBase-100 rounded-base border-base border-border dark:border-darkBorder bg-base relative overflow-hidden"
          >
            <div
              className="absolute bg-base-200 dark:bg-darkBase-200 transition-all duration-300 ease-out rounded-base h-full"
              style={getBackgroundStyle()}
            />
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("home", 0);
              }}
              className={`p-3 hover:no-underline flex items-center gap-2 transition-colors duration-200 relative z-10`}
              onMouseEnter={() => setHoverIndex(0)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <FaHome className="md:hidden" />
              <span className="hidden md:block">Home</span>
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("projects", 1);
              }}
              className={`p-3 flex hover:no-underline gap-2 items-center transition-colors duration-200 relative z-10`}
              onMouseEnter={() => setHoverIndex(1)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <FaProjectDiagram className="md:hidden" />
              <span className="hidden md:block">Projects</span>
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("about", 2);
              }}
              className={`p-3 flex gap-2 hover:no-underline items-center transition-colors duration-200 relative z-10`}
              onMouseEnter={() => setHoverIndex(2)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <FaInfoCircle className="md:hidden" />
              <span className="hidden md:block">About</span>
            </a>
          </div>
          <button
            ref={cogButtonRef}
            onClick={handleClick}
            className="ml-2 p-2 bg-base-100 dark:bg-darkBase-100 rounded-base border-base border-border dark:border-darkBorder hover:bg-base-200 dark:hover:bg-darkBase-200 transition-colors duration-300"
          >
            <FaCog className={isSpinning ? "animate-spin" : ""} />
          </button>
        </div>
        <div className="relative w-full">
          <div
            className={`absolute left-0 right-0 mt-2 p-4 bg-base-100 dark:bg-darkBase-100 rounded-base border-base border-border dark:border-darkBorder transition-all duration-300 ease-in-out ${
              isExtended
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5 pointer-events-none"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <select
                id="theme-select"
                value={theme}
                onChange={(e) => setTheme(e.target.value as Theme)}
                className="p-2 w-full bg-base-200 hover:bg-base-300 dark:bg-darkBase-200 dark:hover:bg-darkBase-300 rounded-base"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
              <select
                id="language-select"
                value={language}
                onChange={(e) => changeLanguage(e.target.value as Language)}
                className="p-2 w-full bg-base-200 hover:bg-base-300 dark:bg-darkBase-200 dark:hover:bg-darkBase-300 rounded-base"
              >
                <option value="en">ENG</option>
                <option value="es">SPA</option>
              </select>
              <button
                onClick={() => navigate("/archive")}
                className="p-2 w-full bg-base-200 hover:bg-base-300 dark:bg-darkBase-200 dark:hover:bg-darkBase-300 rounded-base"
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
