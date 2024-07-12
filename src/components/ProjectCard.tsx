import { Project } from "../types/types";
import { technologyIcons } from "./TechIcons";
import VideoPreview from "./VideoPreview";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useGlobalContext } from "../context/GlobalContext";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const sortedTechnologies = [...project.technologies].sort();
  const { language } = useGlobalContext();

  return (
    <article
      className={`flex flex-col ${
        project.src ? "lg:flex-row" : ""
      } w-full h-fit justify-between items-center border-base dark:border-darkBorder border-border rounded-base gap-10 p-4 `}
    >
      <div
        className={`flex flex-1 h-full   flex-col ${
          project.src ? "lg:w-1/2" : "w-full"
        }   `}
      >
        <div className="flex flex-col flex-1">
          <div className="flex justify-between  items-start w-full gap-2">
            <div className="flex flex-col ">
              <h1 className="text-5xl mb-2">{project.name[language]}</h1>
              <h5 className="ml-1 mb-4 text-base-300 dark:text-darkBase-300">
                {project.date[language]}
              </h5>
            </div>
            <div className="flex flex-wrap gap-2 border-base dark:border-darkBorder border-border p-2 rounded-base w-fit">
              {sortedTechnologies.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2"
                  title={tech}
                >
                  <div className="size-6">{technologyIcons[tech]()}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="mx-2 pb-2 text-justify">
            {project.description[language]}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {project.mdxContent && (
            <Link
              to={`/blog/${project.id}`}
              className="text-base hover:underline"
            >
              <Button text={language === "en" ? "READ MORE" : "LEER MÁS"} />
            </Link>
          )}
          <div className="flex w-full gap-2">
            <Button href={project.codeURL} text="&lt;/&gt;" />
            <Button
              href={project.previewURL}
              text={language === "en" ? "PREVIEW" : "VISTA PREVIA"}
            />
          </div>
        </div>
      </div>
      {project.src && (
        <div className="overflow-hidden w-full lg:w-1/2 h-full items-center justify-center flex">
          <VideoPreview src={project.src} />
        </div>
      )}
    </article>
  );
}
