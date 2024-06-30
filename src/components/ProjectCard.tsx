import { useEffect, useRef, useState } from "react";
import { Project } from "../types/types";
import { technologyIcons } from "./TechIcons";
import VideoPreview from "./VideoPreview";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }: { project: Project }) {
  const sortedTechnologies = [...project.technologies].sort();

  return (
    <article className="flex flex-col lg:flex-row w-full h-fit justify-between border-base border-border rounded-base gap-10 p-4">
      <div className="relative flex flex-col flex-1 justify-between">
        <div>
          <div className="flex justify-between items-start w-full">
            <h1 className="text-5xl mb-6">{project.name}</h1>
            <div className="flex flex-wrap gap-2 border-base border-border p-2 rounded-base w-fit">
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
          <p className="mx-2 pb-2 text-left">{project.description}</p>
        </div>

        <div className="flex flex-col gap-2">
          {project.hasBlog && (
            <Link to={`/blog/${project.id}`} className="text-base hover:underline">
              <Button text="READ MORE" />
            </Link>
          )}
          <div className="flex w-full gap-2">
            <Button href={project.codeURL} text="&lt;/&gt;" />
            <Button href={project.previewURL} text="PREVIEW" />
          </div>
        </div>
      </div>
      <div className="overflow-hidden w-full lg:w-1/2 h-full items-center justify-center flex">
        <VideoPreview src={project.src} />
      </div>
    </article>
  );
}

function Button({ href, text }: { href?: string; text: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-10 hover:bg-base-200 transition-colors duration-300 w-full  border-border border-base rounded-base flex items-center justify-center"
    >
      {text}
    </a>
  );
}