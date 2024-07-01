import { useParams } from "react-router-dom";
import { Project } from "../types/types";
import { projects } from "../projects/projects";
import VideoPreview from "../components/VideoPreview";
import { MDXProvider } from "@mdx-js/react";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import slugify from "slugify";

interface Heading {
  id: string;
  text: string | null;
  level: number;
}

function useActiveId(itemIds: string[]): string {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    console.log("Setting up IntersectionObserver with ids:", itemIds);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log(
            "Intersection detected:",
            entry.target.id,
            entry.isIntersecting
          );
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -60% 0%" }
    );

    itemIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
        console.log("Observing element:", id);
      } else {
        console.log("Element not found:", id);
      }
    });

    return () => {
      itemIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

interface ColorPaletteProps {
  colors: string[];
}

export function ColorPalette({ colors }: ColorPaletteProps) {
  return (
    <div className="flex flex-wrap gap-4 my-4">
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

export default function Blog() {
  const { id } = useParams<{ id: string }>();
  const project: Project | undefined = projects.find(
    (project) => project.id === id
  );

  const MDXContent = project?.mdxContent;
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
    ColorPalette: ColorPalette,
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
    }
  }, [MDXContent]);

  useEffect(() => {
    console.log(activeId);
  }, [activeId]);

  if (!project) return null;
  return (
    <div className="flex">
      <aside className="w-64 p-4 fixed top-20 h-screen overflow-auto z-20">
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
                  className={
                    activeId === heading.id
                      ? "text-red-600"
                      : "text-current hover:text-red-400"
                  }
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <section className="border-base border-border rounded-base p-4 h-full w-full max-w-[50rem] mx-auto flex flex-col justify-center items-center">
        <h1 className="text-left w-full mb-6">{project.name}</h1>
        <VideoPreview src={project.src} preview={false} />

        <article className="max-w-[50rem] p-4">


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
