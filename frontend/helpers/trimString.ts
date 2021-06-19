const trimString = (string: string, length: number): string => {
  const trimmedString = `${string} `.substr(0, length);
  return (
    trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
    ) + `${trimmedString.length < string.length ? '...' : ''}`
  );
};

export default trimString;
