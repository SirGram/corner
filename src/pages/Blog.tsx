import { useParams } from "react-router-dom";
import { Project } from "../types/types";
import { projects } from "../projects/projects";
import VideoPreview from "../components/VideoPreview";
import { MDXProvider } from "@mdx-js/react";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import slugify from "slugify";
import { technologyIcons } from "../components/TechIcons";
import Button from "../components/Button";
import { useGlobalContext } from "../context/GlobalContext";

interface Heading {
  id: string;
  text: string | null;
  level: number;
}

function useActiveId(itemIds: string[]): string {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observers = new Map();

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        observers.get(entry.target).isIntersecting = entry.isIntersecting;
      });

      const visibleHeadings = Array.from(observers.entries())
        .filter(([, observer]) => observer.isIntersecting)
        .map(([element]) => element.id);

      if (visibleHeadings.length > 0) {
        setActiveId(visibleHeadings[0]);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-20% 0% -60% 0%",
      threshold: 1.0,
    });

    itemIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observers.set(element, { isIntersecting: false });
        observer.observe(element);
      }
    });

    return () => {
      observers.clear();
      observer.disconnect();
    };
  }, [itemIds]);

  return activeId;
}

interface ColorPaletteProps {
  colors: string[];
}

export function ColorPalette({ colors }: ColorPaletteProps) {
  return (
    <div className="flex flex-wrap gap-4 my-4 w-fit mx-auto p-2 justify-center border-border border-base dark:border-darkBorder rounded-base">
      {colors.map((color, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className="w-16 h-16 rounded-md shadow-md"
            style={{ backgroundColor: color }}
          ></div>
          <span className="mt-2 text-sm">{color}</span>
        </div>
      ))}
    </div>
  );
}
interface RoadmapItemProps {
  number: number;
  title: string;
  isLast: boolean;
}

interface DevelopmentRoadmapProps {
  steps: string[];
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ number, title, isLast }) => (
  <div className="flex items-start gap-4">
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary dark:bg-darkPrimary text-white">
        {number}
      </div>
      {!isLast && (
        <div className="w-0.5 h-12 bg-primary dark:bg-darkPrimary opacity-50" />
      )}
    </div>
    <div className="flex-1 pb-8 ">
      <div className="flex items-center gap-2">
        <span className="text-lg font-medium">{title}</span>
      </div>
    </div>
  </div>
);

export const DevelopmentRoadmap: React.FC<DevelopmentRoadmapProps> = ({
  steps,
}) => {
  return (
    <div className="max-w-2xl mx-auto p-6 rounded-lg border border-base dark:border-darkBorder">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Development Roadmap
      </h2>
      <div className="">
        {steps.map((step, index) => (
          <RoadmapItem
            key={index}
            number={index + 1}
            title={step}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default function Blog() {
  const { id } = useParams<{ id: string }>();
  const project: Project | undefined = projects.find(
    (project) => project.id === id
  );

  console.log(project);

  const { language } = useGlobalContext();
  const MDXContent = project?.mdxContent?.[language];
  type HeadingProps = DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >;

  const components = {
    h1: (props: HeadingProps) => {
      const id = props.id || slugify((props.children as string) || "heading");
      return <h1 id={id} {...props} />;
    },
    h2: (props: HeadingProps) => {
      const id = props.id || slugify((props.children as string) || "heading");
      return <h2 id={id} {...props} />;
    },
    h3: (props: HeadingProps) => {
      const id = props.id || slugify((props.children as string) || "heading");
      return <h3 id={id} {...props} />;
    },
  };

  const [headings, setHeadings] = useState<Heading[]>([]);

  const activeId = useActiveId(headings.map((heading) => heading.id));

  useEffect(() => {
    if (MDXContent) {
      const newHeadings = Array.from(
        document.querySelectorAll("h1, h2, h3")
      ).map((element, index): Heading => {
        const text = element.textContent;
        const id = element.id || slugify(text || `heading-${index}`);
        if (!element.id) {
          element.id = id;
        }
        return {
          id,
          text,
          level: Number(element.tagName.substring(1)),
        };
      });
      setHeadings(newHeadings);

      // code block overflow
      const codeBlocks = document.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        const parentNode = block.parentNode as Element;
        if (parentNode && !parentNode.classList.contains("code-wrapper")) {
          const wrapper = document.createElement("div");
          wrapper.className =
            "code-wrapper max-h-[20rem] overflow-auto border-base dark:border-darkBorder border-border rounded-base";
          parentNode.insertBefore(wrapper, block);
          wrapper.appendChild(block);

          // Remove conflicting classes from the pre element
          block.classList.remove("overflow-auto", "max-h-[20rem]");
          block.classList.add("overflow-visible", "m-0");
        }
      });
    }
  }, [MDXContent]);

  useEffect(() => {
    console.log(activeId);
  }, [activeId]);

  if (!project) return null;
  return (
    <div className="flex flex-col lg:flex-row mb-20">
      <aside className="w-fit p-4 lg:sticky top-20 h-fit mx-auto flex justify-center  z-20">
        <nav>
          <ul>
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={`
                  ${
                    heading.level === 1
                      ? "ml-0"
                      : heading.level === 2
                      ? "ml-2"
                      : "ml-4"
                  }
                  ${activeId === heading.id ? "font-bold" : ""}
                `}
              >
                <a
                  href={`#${heading.id}`}
                  className={`block p-1 rounded-md transition-all duration-200 ${
                    activeId === heading.id
                      ? "text-primary dark:text-darkPrimary border-base border-border dark:border-darkBorder"
                      : "text-current hover:text-primary dark:hover:text-darkPrimary border-base border-transparent"
                  }`}
                  style={{ margin: "4px 0" }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <section className="h-full w-full  max-w-[50rem] mx-auto flex flex-col justify-center items-center">
        <div className="border-base dark:border-darkBorder border-border rounded-base p-4 m-2 ">
          <div className="flex flex-1  w-full mb-6">
            <div className="flex flex-col flex-1 w-full">
              <h1 className="text-left w-full mb-6">
                {project.name[language]}
              </h1>
              <span className="text-left w-full text-xl">
                {project.date[language]}
              </span>
            </div>
            <div>
              <div className="flex flex-col h-full  justify-between ">
                <Button href={project.codeURL} text="&lt;/&gt;" />
                <Button href={project.previewURL} text="PREVIEW" />
              </div>
            </div>
          </div>
          {project.src && <VideoPreview src={project.src} preview={false} />}
          <div className="flex flex-wrap gap-4 mt-4">
            {project.technologies.sort().map((tech, index) => (
              <div key={index} className="flex items-center gap-2" title={tech}>
                <div className="size-6">{technologyIcons[tech]()}</div>
                <div>{tech.charAt(0).toUpperCase() + tech.slice(1)}</div>
              </div>
            ))}
          </div>
        </div>

        <article className=" p-4 flex flex-col gap-2  w-full">
          {MDXContent && (
            <MDXProvider components={components}>
              <MDXContent />
            </MDXProvider>
          )}
        </article>
      </section>
    </div>
  );
}
