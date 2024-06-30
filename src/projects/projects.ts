import { Project } from "../types/types";

import comicVideo from "../assets/videos/comicstore.mp4";
import jgraderVideo from "../assets/videos/jgrader.mp4";

import comicStoreMDX from "./comicstore.mdx";


export const projects: Project[] = [
  {
    id:'1',
    name: "Comic Store",
    description:
      "A Next.js application for comics and graphic novels. This app integrates with the Marvel API to display a wide range of comics, allowing users to filter through the collection, view detailed information, and add items to their cart.",
    src: comicVideo,
    codeURL: "https://github.com/SirGram/comicstore",
    previewURL: "https:/comicstore.fly.dev",
    hasBlog: true,
    technologies: ["tailwind", "nextjs", "typescript", "react"],
    mdxContent: comicStoreMDX,
  },
  {
    id:'2',
    name: "JP Grader",
    description:
      "Tests your Japanese vocabulary knowledge. It has several decks with different levels of difficulty. After you complete the test, the results will show you your score and the percentage of correct answers.",
    src: jgraderVideo,
    codeURL: "https://github.com/SirGram/j-grader",
    previewURL: "https://sirgram.github.io/j-grader/",
    hasBlog: true,
    technologies: ["tailwind", "vite", "typescript", "react"],
  },
];