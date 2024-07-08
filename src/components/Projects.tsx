import { useNavigate } from "react-router-dom";
import { projects } from "../projects/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const navigate = useNavigate();

  const parseDate = (dateString: string): Date => {
    const [month, year] = dateString.split(' ');
    const monthIndex = new Date(Date.parse(month + " 1, 2012")).getMonth();
    return new Date(parseInt(year), monthIndex);
  };

  return (
    <div className="flex flex-col gap-4 p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-10">
        {projects
          .filter((project) => !project.archive)
          .sort((a, b) => {
            // Convert date strings to Date objects and compare
            return parseDate(b.date.en).getTime() - parseDate(a.date.en).getTime();
          })
          .map((project, index) => (
            <div
              key={index}
              className={`${project.src ? "lg:col-span-2" : ""}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
      </div>
      <button
        onClick={() => navigate("/archive")}
        className="border-border dark:border-darkBorder hover:bg-base-200 bg-base-100 dark:bg-darkBase-100 dark:hover:bg-darkBase-200 border-base px-4 mx-auto w-fit h-10 rounded-base"
      >
        Old projects
      </button>
    </div>
  );
}