import { technologyIcons } from "../components/TechIcons";

export type Theme = "light" | "dark";
export type Language = "en" | "es";

export type Project = {
  id: string;
  date: {
    en: string;
    es: string;
  };
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };

  src: string;
  codeURL: string;
  previewURL: string;
  hasBlog: boolean;
  technologies: Technology[];
    mdxContent?: {
      en: React.ComponentType;
      es: React.ComponentType;
  }
};

type Technology = keyof typeof technologyIcons;
