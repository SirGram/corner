import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaProjectDiagram, FaInfoCircle, FaCog } from "react-icons/fa";
import { useState, useEffect, useRef, useCallback } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { Language, Theme } from "../types/types";
import ReactCountryFlag from "react-country-flag";
import language from "react-syntax-highlighter/dist/esm/languages/hljs/1c";

const MENU_ITEMS = [
  { id: "home", icon: FaHome, labelEn: "Home", labelEs: "Inicio" },
  {
    id: "projects",
    icon: FaProjectDiagram,
    labelEn: "Projects",
    labelEs: "Proyectos",
  },
  {
    id: "contact",
    icon: FaInfoCircle,
    labelEn: "Contact",
    labelEs: "Contacto",
  },
];

const useClickOutside = (
  menuRef: React.RefObject<HTMLElement>,
  buttonRef: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef, buttonRef, callback]);
};

type SettingsMenuProps = {
  isExtended: boolean;
  setIsExtended: (isExtended: boolean) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  changeLanguage: (language: Language) => void;
  navigate: (path: string) => void;
  isScrolledToBottom: boolean;
};

const SettingsMenu = ({
  isExtended,
  setIsExtended,
  theme,
  setTheme,
  language,
  changeLanguage,
  navigate,
  isScrolledToBottom,
}: SettingsMenuProps) => {
  const stopPropagation = (e: React.MouseEvent | React.ChangeEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`absolute ${
        isScrolledToBottom ? "bottom-full mb-16" : "top-full mt-2"
      } left-0 right-0 p-4 bg-base-100 dark:bg-darkBase-100 rounded-base border-base border-border dark:border-darkBorder transition-all duration-300 ease-in-out ${
        isExtended
          ? "opacity-100 translate-y-0"
          : `opacity-0 ${
              isScrolledToBottom ? "translate-y-2" : "-translate-y-2"
            } pointer-events-none`
      }`}
      onClick={stopPropagation}
    >
      <div className="flex flex-col items-center gap-2">
        <select
          id="theme-select"
          value={theme}
          onChange={(e) => {
            stopPropagation(e);
            setTheme(e.target.value as Theme);
          }}
          className="p-2 w-full bg-base-200 hover:bg-base-300 dark:bg-darkBase-200 dark:hover:bg-darkBase-300 rounded-base"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <div className="relative inline-block w-full">
          <select
            id="language-select"
            value={language}
            onChange={(e) => changeLanguage(e.target.value as Language)}
            className="appearance-none w-full bg-base-200 hover:bg-base-300 dark:bg-darkBase-200 dark:hover:bg-darkBase-300 rounded-base pl-8 pr-4 py-2"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 w-fit ">
            <ReactCountryFlag
              countryCode={language === "en" ? "GB" : "ES"}
              svg
            />
          </div>
        </div>
        <button
          onClick={(e) => {
            stopPropagation(e);
            console.log("Archive button clicked");
            navigate("/archive");
            setIsExtended(false);
          }}
          className="p-2 w-full bg-base-200 hover:bg-base-300 dark:bg-darkBase-200 dark:hover:bg-darkBase-300 rounded-base"
        >
          {language === "en" ? "Archive" : "Archivo"}
        </button>
      </div>
    </div>
  );
};

export default function Menubar() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { setTheme, theme, language, setLanguage } = useGlobalContext();

  const [isExtended, setIsExtended] = useState(false);
  const menubarRef = useRef<HTMLDivElement>(null);
  const cogButtonRef = useRef<HTMLButtonElement>(null);

  const [isSpinning, setIsSpinning] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const checkScrollPosition = useCallback(() => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bodyHeight = document.body.offsetHeight;
    setIsScrolledToBottom(scrollPosition - bodyHeight > 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);
    return () => window.removeEventListener("scroll", checkScrollPosition);
  }, [checkScrollPosition]);

  const handleNavigation = useCallback(
    (id: string, index: number) => {
      const navigateAndScroll = () => {
        setActiveIndex(index);
        scrollToSection(id);
      };

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(navigateAndScroll, 100);
      } else {
        navigateAndScroll();
      }
    },
    [location.pathname, navigate, scrollToSection]
  );

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    const index = MENU_ITEMS.findIndex((item) => item.id === hash);
    if (index !== -1) setActiveIndex(index);
  }, [location]);

  const settingsMenuRef = useRef<HTMLDivElement>(null);

  useClickOutside(settingsMenuRef, cogButtonRef, () => setIsExtended(false));

  const getBackgroundStyle = useCallback(() => {
    const index = hoverIndex !== null ? hoverIndex : activeIndex;
    return {
      left: `${index * 33.33}%`,
      width: "33.33%",
      height: "100%",
      top: 0,
      bottom: 0,
    };
  }, [hoverIndex, activeIndex]);

  const handleClick = useCallback(() => {
    setIsSpinning(true);
    setIsExtended((prevState) => !prevState);
    setTimeout(() => setIsSpinning(false), 500);
  }, []);

  return (
    <nav
      className={`fixed transition-all duration-300 ease-in-out w-full flex justify-center items-start text-lg z-30 ${
        isScrolledToBottom
          ? "md:top-[calc(100%-10rem)] top-[calc(100%-16rem)]"
          : "top-2"
      }`}
    >
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
            {MENU_ITEMS.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.id, index);
                }}
                className={`p-3 hover:no-underline flex items-center gap-2 transition-colors duration-200 relative z-10`}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <item.icon className="md:hidden" />
                <span className="hidden md:block">
                  {language === "en" ? item.labelEn : item.labelEs}
                </span>
              </a>
            ))}
          </div>
          <button
            ref={cogButtonRef}
            onClick={handleClick}
            className="ml-2 p-2 bg-base-100 dark:bg-darkBase-100 rounded-base border-base border-border dark:border-darkBorder hover:bg-base-200 dark:hover:bg-darkBase-200 transition-colors duration-300"
          >
            <FaCog className={isSpinning ? "animate-spin" : ""} />
          </button>
        </div>
        <div className="relative w-full" ref={settingsMenuRef}>
          <SettingsMenu
            isExtended={isExtended}
            setIsExtended={setIsExtended}
            theme={theme}
            setTheme={setTheme}
            language={language}
            changeLanguage={setLanguage}
            navigate={navigate}
            isScrolledToBottom={isScrolledToBottom}
          />
        </div>
      </div>
    </nav>
  );
}
