import { Project } from "../types/types";

import comicVideo from "../assets/videos/comicstore.mp4";
import jgraderVideo from "../assets/videos/jgrader.mp4";

import comicStoreMDX_EN from "./comicstore_en.mdx";
import comicStoreMDX_ES from "./comicstore_es.mdx";
import jgraderMDX_EN from "./jgrader_en.mdx";
import jgraderMDX_ES from "./jgrader_es.mdx";

export const projects: Project[] = [
  {
    id: '1',
    date: {
      en: "May 2024",
      es: "Mayo 2024"
    },
    name: {
      en: "Comic Store",
      es: "Comic Store"
    },
    description: {
      en: "A Next.js application for comics and graphic novels. This app integrates with the Marvel API to display a wide range of comics, allowing users to filter through the collection, view detailed information, and add items to their cart.",
      es: "Aplicación en Next.js para ver cómics y novelas gráficas. Esta aplicación se integra con la API de Marvel para mostrar una amplia gama de contenido, permitiendo a los usuarios filtrar la colección, ver información detallada y agregar artículos al carrito."
    },
    src: comicVideo,
    codeURL: "https://github.com/SirGram/comicstore",
    previewURL: "https:/comicstore.fly.dev",
    hasBlog: true,
    technologies: ["tailwind", "nextjs", "typescript", "react"],
    mdxContent: {
      en: comicStoreMDX_EN,
      es: comicStoreMDX_ES
    },
  },
  {
    id: '2',
    date: {
      en: "June 2024",
      es: "Junio 2024"
    },
    name: {
      en: "J-Grader",
      es: "J-Grader"
    },
    description: {
      en: "Tests your Japanese vocabulary knowledge. It has several decks with different levels of difficulty. After you complete the test, the results will show you your score and the percentage of correct answers.",
      es: "Comprueba tus conocimientos de vocabulario japonés. Tiene varios mazos con diferentes niveles de dificultad. Después de completar la prueba, los resultados te mostrarán tu puntaje y el porcentaje de respuestas correctas."
    },
    src: jgraderVideo,
    codeURL: "https://github.com/SirGram/j-grader",
    previewURL: "https://sirgram.github.io/j-grader/",
    hasBlog: true,
    technologies: ["tailwind", "vite", "typescript", "react"],
    mdxContent: {
      en: jgraderMDX_EN,
      es: jgraderMDX_ES
    },
  },
];
