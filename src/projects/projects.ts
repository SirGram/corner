import { Project } from "../types/types";

import comicVideo from "../assets/videos/comicstore.mp4";
import jgraderVideo from "../assets/videos/jgrader.mp4";
import takVideo from "../assets/videos/tak.mp4";

import comicStoreMDX_EN from "./comicstore_en.mdx";
import comicStoreMDX_ES from "./comicstore_es.mdx";
import jgraderMDX_EN from "./jgrader_en.mdx";
import jgraderMDX_ES from "./jgrader_es.mdx";
import takMDX_EN from "./tak_en.mdx";
import takMDX_ES from "./tak_es.mdx";

export const projects: Project[] = [
  {
    id: "1",
    date: {
      en: "March 2024",
      es: "Marzo 2024",
    },
    name: {
      en: "Comic Store",
      es: "Comic Store",
    },
    description: {
      en: "A Next.js application for comics and graphic novels. This app integrates with the Marvel API to display a wide range of comics, allowing users to filter through the collection, view detailed information, and add items to their cart.",
      es: "Aplicación en Next.js para ver cómics y novelas gráficas. Esta aplicación se integra con la API de Marvel para mostrar una amplia gama de contenido, permitiendo a los usuarios filtrar la colección, ver información detallada y agregar artículos al carrito.",
    },
    src: comicVideo,
    codeURL: "https://github.com/SirGram/comicstore",
    previewURL: "https:/comicstore.fly.dev",
    technologies: ["tailwind", "nextjs", "typescript", "react"],
    mdxContent: {
      en: comicStoreMDX_EN,
      es: comicStoreMDX_ES,
    },
  },
  {
    id: "2",
    date: {
      en: "May 2024",
      es: "Mayo 2024",
    },
    name: {
      en: "J-Grader",
      es: "J-Grader",
    },
    description: {
      en: "App that tests your Japanese vocabulary knowledge. It has several decks with different levels of difficulty. After you complete the test, the results will show you your score and the percentage of correct answers.",
      es: "Esta aplicación comprueba tus conocimientos de vocabulario japonés. Tiene varios mazos con diferentes niveles de dificultad. Después de completar la prueba, los resultados te mostrarán tu puntaje y el porcentaje de respuestas correctas.",
    },
    src: jgraderVideo,
    codeURL: "https://github.com/SirGram/j-grader",
    previewURL: "https://sirgram.github.io/j-grader/",
    technologies: ["tailwind", "vite", "typescript", "react"],
    mdxContent: {
      en: jgraderMDX_EN,
      es: jgraderMDX_ES,
    },
  },
  {
    id: "3",
    date: {
      en: "March 2024",
      es: "Marzo 2024",
    },
    name: {
      en: "Digidex",
      es: "Digidex",
    },
    description: {
      en: "A memory card game using a Digimon API. ",
      es: "Un juego de tarjetas de memoria que utiliza una API de Digimon. ",
    },
    codeURL:
      "https://github.com/SirGram/theodinproject/tree/main/react/digidex",
    previewURL: "https://sirgram.github.io/theodinproject/react/digidex/",
    technologies: ["react", "vite", "javascript"],
    archive: true,
  },
  {
    id: "4",
    date: {
      en: "April 2024",
      es: "Abril 2024",
    },
    name: {
      en: "CV Maker",
      es: "CV Maker",
    },
    description: {
      en: "Create and download a CV editing input fields using ReactPDF library.",
      es: "Crea y descarga un CV editando inputs usando la librería ReactPDF.",
    },
    codeURL: "https://github.com/SirGram/theodinproject/tree/main/react/cv-application",
    previewURL:
      "https://sirgram.github.io/theodinproject/react/cv-application/",
    technologies: ["javascript", "react", "vite"],
    archive: true,
  },
  {
    id: "5",
    date: {
      en: "December 2023",
      es: "Diciembre 2024",
    },
    name: {
      en: "3D TicTacToe",
      es: "3D TicTacToe",
    },
    description: {
      en: "A tictactoe game with player selection. 4x4x3 board.",
      es: "Un juego de tictactoe con selección de jugador. Tablero de 4x4x3.",
    },
    codeURL: "https://github.com/SirGram/theodinproject/tree/main/docs/javascript/tictactoe",
    previewURL:
      "https://sirgram.github.io/theodinproject/javascript/tictactoe/",
    technologies: ["javascript", "css", "html"],
    archive: true,
  },
  {
    id: "6",
    date: {
      en: "January 2024",
      es: "January 2024",
    },
    name: {
      en: "Knight Travails",
      es: "MyBookLib",
    },
    description: {
      en: "A small implementation of breadth first search algorithm in Vanilla JavaScript.",
      es: "Una pequeña implementación del algoritmo breadth first search en Vanilla JavaScript.",
    },
    codeURL: "https://github.com/SirGram/theodinproject/tree/main/docs/javascript/knight%20travails",
    previewURL:
      "https://sirgram.github.io/theodinproject/javascript/knight%20travails/",
    technologies: ["javascript", "css", "html"],
    archive: true,
  },
  {
    id: "7",
    date: {
      en: "November 2023",
      es: "Noviembre 2023",
    },
    name: {
      en: "MyBookLib",
      es: "MyBookLib",
    },
    description: {
      en: "A book library cover manager with some metadata.",
      es: "Un gestor de portadas de libros con algunos metadatos.",
    },
    codeURL: "https://github.com/SirGram/theodinproject/tree/main/docs/javascript/library",
    previewURL:
      "https://sirgram.github.io/theodinproject/javascript/library/",
    technologies: ["javascript", "css", "html"],
    archive: true,
  },
  {
    id: "8",
    date: {
      en: "June 2024",
      es: "Junio 2024",
    },
    name: {
      en: "Tak",
      es: "Tak",
    },
    description: {
      en: "A react 3 fiber multiplayer board game rendition. Uses socket.io for realtime interactions between players.",
      es: "Juego de mesa multiplayer con react 3 fiber. Utiliza socket.io para interacciones en tiempo real entre jugadores.",
    },
    codeURL: "https://github.com/SirGram/tak",
    previewURL:
      "https://tak.fly.dev/",
    technologies: ["typescript", "tailwind", "react", 'socketio', 'express', 'vite', 'blender'],
    src: takVideo,
    mdxContent: {
      en: takMDX_EN,
      es: takMDX_ES,
    },
  },
];
