import React, { useState } from "react";
import { technologyIcons } from "./TechIcons";
import { useGlobalContext } from "../context/GlobalContext";
import robot from "../assets/images/robot.png";

interface DominoPieceProps {
  icon: React.ComponentType;
  angle: number;
  tech: string;
  isSelected: boolean;
  onClick: () => void;
}

const DominoPiece: React.FC<DominoPieceProps> = ({
  icon: Icon,
  angle,
  tech,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`w-16 h-32 bg-base-100 dark:bg-darkBase-100 border-2 border-border dark:border-darkBorder rounded-lg shadow-md flex flex-col absolute transition-all duration-300 cursor-pointer ${
        isSelected ? "scale-125 z-10" : ""
      }`}
      style={{
        transform: `rotate(${angle}deg) translateY(-80px) ${
          isSelected ? "translateY(-20px) scale(1.2)" : ""
        }`,
        transformOrigin: "center",
        top: "33%",
        left: "40%",
      }}
      onClick={onClick}
    >
      <div className="flex-1 border-b-2 border-border dark:border-darkBorder p-2 flex items-center justify-center">
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

const RobotWithSpeechBubble: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative ">
      <div
        className="relative inline-block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={robot}
          alt="robot"
          className="w-full h-auto object-contain animate-float"
        />
        {isHovered && (
          <div
            className="absolute left-1/2 transform -translate-x-1/2 
            bg-white dark:bg-darkBase-100  shadow-lg
            animate-fade-in bottom-full  "
          >
            <div className="relative">
              <p className="text-sm dark:text-darkText whitespace-nowrap font-medium bg-base-100 dark:bg-darkBase-100 border-border dark:border-darkBorder border h-full w-full p-5 rounded-lg z-40">
                I do not think therefore I do not am
              </p>
              {/* Speech bubble triangle */}
              <div
                className="absolute -bottom-10  right-6 transform -translate-x-1/2 border border-border dark:border-darkBorder
                w-8 h-8 bg-white dark:bg-darkBase-100 rotate-45 -z-10 rounded-lg"
              />
              <div
                className="absolute -bottom-14  right-14 transform -translate-x-1/2 border border-border dark:border-darkBorder
                w-4 h-4 bg-white dark:bg-darkBase-100 rotate-45 rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const technologies = Object.entries(technologyIcons);
  const numDominos = technologies.length;
  const angleStep = 360 / numDominos;
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const { language } = useGlobalContext();

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
      <div className="md:h-screen relative flex flex-col items-center justify-center ">
        <div className="z-20 flex items-center justify-center">
          <div className="w-32 md:w-96">
            <RobotWithSpeechBubble />
          </div>
        </div>
        <div className="flex flex-col items-center z-20">
          <h1 className="text-7xl font-bold  bg-clip-text ">SIRGRAM</h1>
          <span className="text-xl">
            {language === "en"
              ? "Web Development "
              : "Desarrollo web"}
          </span>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, 10px); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }

          .animate-float {
            animation: float 3s ease-in-out infinite;
          }

          .animate-fade-in {
            animation: fadeIn 0.2s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
