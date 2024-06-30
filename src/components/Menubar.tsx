import { NavLink } from "react-router-dom";
import { FaHome, FaProjectDiagram, FaInfoCircle } from "react-icons/fa";
import { useState } from "react";

export default function Menubar() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <nav className="fixed top-2 flex justify-center w-full items-start text-xl z-30">
      <div className="flex gap-3 p-2 rounded-base border-base border-border bg-base relative overflow-hidden">
     
          <div
            className="absolute  bg-base-200 transition-all duration-300 ease-out rounded-base h-full"
            style={{
              left: `${activeIndex * 33.33}%`,
              width: "33.33%", 
              height: "100%",
              top: 0,
              bottom: 0,
            }}
          />
      
        <NavLink
          to="/"
          className={`p-3 flex items-center gap-2 transition-colors duration-200 relative z-10 `}
          onMouseEnter={() => setActiveIndex(0)}
        >
          <FaHome className="md:hidden" />
          <span className="hidden md:block">Home</span>
        </NavLink>
        <NavLink
          to="/projects"
          className={`p-3 flex gap-2 items-center transition-colors duration-200 relative z-10 `}
          onMouseEnter={() => setActiveIndex(1)}
        >
          <FaProjectDiagram className="md:hidden" />
          <span className="hidden md:block">Projects</span>
        </NavLink>
        <NavLink
          to="/about"
          className={`p-3 flex gap-2 items-center transition-colors duration-200 relative z-10 `}
          onMouseEnter={() => setActiveIndex(2)}
        >
          <FaInfoCircle className="md:hidden" />
          <span className="hidden md:block">About</span>
        </NavLink>
      </div>
    </nav>
  );
}
