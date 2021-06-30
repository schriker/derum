const findStringStartEndIndex = (
  value: string,
  cursorPosition: number
): { begin: number; end: number } => {
  const previousSpaceIndex = value.lastIndexOf(' ', cursorPosition - 2);
  const nextSpaceIndex = value.indexOf(' ', cursorPosition - 1);
  const begin = previousSpaceIndex < 0 ? 0 : previousSpaceIndex + 1;
  const end = nextSpaceIndex < 0 ? value.length : nextSpaceIndex + 1;

  return { begin, end };
};

export default findStringStartEndIndex;
