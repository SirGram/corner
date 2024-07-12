import { useNavigate } from "react-router-dom";
import { projects } from "../projects/projects";
import ProjectCard from "./ProjectCard";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting] as const;
}

export default function Projects() {
  const navigate = useNavigate();

  const parseDate = (dateString: string): Date => {
    const [month, year] = dateString.split(" ");
    const monthIndex = new Date(Date.parse(month + " 1, 2012")).getMonth();
    return new Date(parseInt(year), monthIndex);
  };

  const [hasAppeared, setHasAppeared] = useState<number[]>([]);

  const handleCardAppeared = (index: number) => {
    if (!hasAppeared.includes(index)) {
      setHasAppeared((prev) => [...prev, index]);
    }
  };
  const { language } = useGlobalContext();

  const buttonText = language === "en" ? "Old projects" : "Otros proyectos";

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:p-10">
        {projects
          .filter((project) => !project.archive)
          .sort((a, b) => {
            return (
              parseDate(b.date.en).getTime() - parseDate(a.date.en).getTime()
            );
          })
          .map((project, index) => {
            // Create a ref and isIntersecting state for each ProjectCard
            const [ref, isIntersecting] = useIntersectionObserver({
              threshold: 0.1,

              triggerOnce: true,
            });

            // Handle card appearance
            useEffect(() => {
              if (isIntersecting) {
                handleCardAppeared(index);
              }
            }, [isIntersecting, index]);

            return (
              <div
                key={index}
                ref={ref}
                className={`${
                  project.src ? "lg:col-span-2" : ""
                } transition-all duration-1000 transform ${
                  hasAppeared.includes(index)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            );
          })}
      </div>
      <button
        onClick={() => navigate("/archive")}
        className="border-border hover:bg-base-200 bg-base-100 dark:bg-darkBase-100 dark:hover:bg-darkBase-200 border-base dark:border-darkBorder px-4 mx-auto w-fit h-10 rounded-base"
      >
        {buttonText}
      </button>
    </div>
  );
}
