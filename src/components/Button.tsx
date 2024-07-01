export default function Button({ href, text }: { href?: string; text: string }) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 h-10 dark:hover:bg-base-200 hover:bg-base-200 transition-colors duration-300 w-full  border-border border-base rounded-base flex items-center justify-center"
      >
        {text}
      </a>
    );
  }