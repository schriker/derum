const trimString = (string: string, length: number) => {
  const trimmedString = `${string} `.substr(0, length);
  return trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')),
  );
};

export default trimString;
