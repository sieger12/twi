import { ElementType } from "react";

interface RichTextProps {
  html: string;
  as?: ElementType;
  className?: string;
}

export function RichText({
  html,
  as: Component = "p",
  className,
}: RichTextProps) {
  return (
    <Component
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
