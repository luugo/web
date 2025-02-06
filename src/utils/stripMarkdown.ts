export const stripMarkdown = (markdown: string) => {
  let text = markdown;

  // Remove code blocks (```code```)
  text = text.replace(/```[\s\S]*?```/g, '');

  // Remove inline code (`code`)
  text = text.replace(/`[^`]*`/g, '');

  // Remove images: ![alt text](url)
  text = text.replace(/!\[.*?\]\(.*?\)/g, '');

  // Remove links but keep the link text: [text](url)
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Remove headings: starting with one or more # characters
  text = text.replace(/^\s*#{1,6}\s+/gm, '');

  // Remove blockquotes (lines starting with >)
  text = text.replace(/^\s*>+\s?/gm, '');

  // Remove bold and italic markers.
  // Bold: **text** or __text__
  text = text.replace(/(\*\*|__)(.*?)\1/g, '$2');
  // Italic: *text* or _text_
  text = text.replace(/(\*|_)(.*?)\1/g, '$2');

  // Remove list markers (unordered and ordered)
  // Unordered list markers: -, *, or +
  text = text.replace(/^\s*([-+*])\s+/gm, '');
  // Ordered list markers: numbers followed by a period
  text = text.replace(/^\s*\d+\.\s+/gm, '');

  // Remove stray markdown symbols (remaining asterisks, underscores, tildes)
  text = text.replace(/[*_~]/g, '');

  // Optionally, collapse multiple newlines into a single newline
  text = text.replace(/\n{2,}/g, '\n');

  // Trim leading/trailing whitespace
  return text.trim();
}