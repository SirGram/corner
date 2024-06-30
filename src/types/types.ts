import { technologyIcons } from "../components/TechIcons";

export type Project = {
    id: string;
    name: string;
    description: string;
    src: string;
    codeURL: string;
    previewURL: string;
    hasBlog: boolean;
    technologies: Technology[];    
    mdxContent?: React.ComponentType;
}

type Technology = keyof typeof technologyIcons;
