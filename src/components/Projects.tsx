import { projects } from "../projects/projects";
import ProjectCard from "./ProjectCard";



export default function Projects() {
  return (
    <div className="flex flex-col gap-4 p-10">
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  );
}
