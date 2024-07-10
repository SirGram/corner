import React, { useState, useEffect } from "react";

const getRandomDots = () => Math.floor(Math.random() * 4) + 1;

interface DominoPieceProps {
  letter: string;
  index: number;
  isFlipped: boolean;
  onFlip: () => void;
  resetFlippedStates: () => void;
}

const DominoPiece: React.FC<DominoPieceProps> = ({
  letter,
  index,
  isFlipped,
  onFlip,
  resetFlippedStates,
}) => {
  const [dots, setDots] = useState(getRandomDots());
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const shakeInterval = setInterval(() => {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        resetFlippedStates();
        setDots(getRandomDots());
      }, 500);
    }, 10000);

    return () => clearInterval(shakeInterval);
  }, [resetFlippedStates]);

  const shakeKeyframes = `
    @keyframes shake {
      0% { transform: translate(1px, 1px) rotate(0deg); }
      10% { transform: translate(-1px, -2px) rotate(-1deg); }
      20% { transform: translate(-3px, 0px) rotate(1deg); }
      30% { transform: translate(3px, 2px) rotate(0deg); }
      40% { transform: translate(1px, -1px) rotate(1deg); }
      50% { transform: translate(-1px, 2px) rotate(-1deg); }
      60% { transform: translate(-3px, 1px) rotate(0deg); }
      70% { transform: translate(3px, 1px) rotate(-1deg); }
      80% { transform: translate(-1px, -1px) rotate(1deg); }
      90% { transform: translate(1px, 2px) rotate(0deg); }
      100% { transform: translate(1px, -2px) rotate(-1deg); }
    }
  `;

  return (
    <div
      className={`inline-block mx-1 w-16 text-center bg-white border-2 border-black rounded-lg shadow-md 
                  transition-all duration-300 ease-in-out cursor-pointer
                  ${isFlipped ? "bg-black text-white" : "text-black"}`}
      onClick={onFlip}
      style={{
        animationDelay: `${index * 2000}ms`,
        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        animation: isShaking ? "shake 0.5s infinite" : "none",
      }}
    >
      <style>{shakeKeyframes}</style>
      <div className="px-3 py-2 text-3xl font-bold border-b-2 border-current">
        {letter}
      </div>
      <div className="p-2 flex flex-wrap justify-around h-10 items-center">
        {[...Array(dots)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              isFlipped ? "bg-white" : "bg-black"
            } transition-all duration-300 ease-in-out`}
            style={{
              opacity: isShaking ? 0 : 1,
              transform: `scale(${isShaking ? 0 : 1})`,
              transitionDelay: `${i * 50}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const name = "SirGram";
  const [flippedStates, setFlippedStates] = useState<boolean[]>(
    new Array(name.length).fill(false)
  );
  const resetFlippedStates = () =>
    setFlippedStates(new Array(name.length).fill(false));

  const handleFlip = (index: number) => {
    setFlippedStates((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col justify-center items-center bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
      <div className="flex flex-wrap justify-center">
        {name.split("").map((letter, index) => (
          <div
            key={index}
            className="animate-bounce"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <DominoPiece
              letter={letter}
              index={index}
              isFlipped={flippedStates[index]}
              onFlip={() => handleFlip(index)}
              resetFlippedStates={resetFlippedStates}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
