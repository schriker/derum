const findStringStartEndIndex = (
  value: string,
  cursorPosition: number
): { begin: number; end: number } => {
  const previous_space_index = value.lastIndexOf(' ', cursorPosition - 2);
  const next_space_index = value.indexOf(' ', cursorPosition - 1);
  const begin = previous_space_index < 0 ? 0 : previous_space_index + 1;
  const end = next_space_index < 0 ? value.length : next_space_index + 1;

  return { begin, end };
};

export default findStringStartEndIndex;
