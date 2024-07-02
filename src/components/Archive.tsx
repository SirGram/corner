import { projects } from "../projects/projects";
import ProjectCard from "./ProjectCard";

export default function Archive() {
  // Sort projects by date (assuming the date is in a sortable format)
  const sortedProjects = projects
    .filter(project => project.archive)
    .sort((a, b) => new Date(b.date.en).getTime() - new Date(a.date.en).getTime());

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-10">
      {sortedProjects.map((project, index) => (
        <div key={index} className={`${project.src ? 'lg:col-span-2' : ''}`}>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}