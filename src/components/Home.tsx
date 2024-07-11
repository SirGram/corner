import React, { useState } from "react";
import { technologyIcons } from "./TechIcons";

const DominoPiece: React.FC<{
  icon: React.FC;
  angle: number;
  tech: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ icon: Icon, angle, tech, isSelected, onClick }) => {
  return (
    <div
      className={`w-16 h-32  bg-base-100 dark:bg-darkBase-100 border-2 border-border dark:border-darkBorder rounded-lg shadow-md flex flex-col absolute transition-all duration-300 cursor-pointer ${
        isSelected ? "scale-125 z-10" : ""
      }`}
      style={{
        transform: `rotate(${angle}deg) translateY(-80px) ${
          isSelected ? "translateY(-20px) scale(1.2)" : ""
        }`,
        transformOrigin: "center ",
        top: "33%",
        left: "40%",
      }}
      onClick={onClick}
    >
      <div
        className={`flex-1  border-b-2 border-border dark:border-darkBorder p-2 flex items-center justify-center`}
      >
        <div
          className="flex flex-1"
          style={{ transform: `rotate(${-angle}deg)` }}
        >
          <Icon />
        </div>
      </div>
      <div className="flex-1 p-2 flex items-center justify-center">
        <span className="text-xs font-bold">{tech}</span>
      </div>
    </div>
  );
};

export default function Home() {
  const technologies = Object.entries(technologyIcons);
  const numDominos = technologies.length;
  const angleStep = 360 / numDominos;

  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 dark:from-darkBase-100 dark:to-darkBase-200 p-8 flex flex-col md:flex-row items-center gap-10 justify-center relative">
      <div className="relative w-[350px] h-[350px] bg-gradient-to-br rounded-full shadow-2xl z-10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="z-20 w-48 h-48 rounded-full bg-accent dark:bg-darkAccent border-base border-border flex items-center justify-center overflow-hidden transition-all duration-300">
            {selectedTech ? (
              <div className="text-white text-center">
                <span className="text-2xl font-bold">
                  {selectedTech.toUpperCase()}
                </span>
              </div>
            ) : (
              <span className="text-white text-3xl font-bold">TECH STACK</span>
            )}
          </div>
        </div>
        <div className="absolute inset-0 flex">
          {technologies.map(([tech, icon], index) => (
            <DominoPiece
              key={tech}
              icon={icon}
              tech={tech}
              angle={index * angleStep}
              isSelected={tech === selectedTech}
              onClick={() => setSelectedTech(tech)}
            />
          ))}
        </div>
      </div>
      <h1 className="text-7xl text-primary dark:text-darkPrimary md:-mt-40">
        SIRGRAM
      </h1>
    </div>
  );
}
