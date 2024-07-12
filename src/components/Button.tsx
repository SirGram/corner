export default function Button({
  href,
  text,
}: {
  href?: string;
  text: string;
}) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 h-10 dark:hover:bg-darkBase-200 hover:bg-base-200  transition-colors duration-300 w-full border-border border-base dark:border-darkBorder rounded-base flex items-center justify-center"
      >
        {text}
      </a>
    );
  } else {
    return (
      <button className="px-4 h-10 dark:hover:bg-darkBase-200 hover:bg-base-200  transition-colors duration-300 w-full border-border border-base dark:border-darkBorder rounded-base flex items-center justify-center">
        {text}
      </button>
    );
  }
}
