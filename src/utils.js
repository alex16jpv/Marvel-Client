export const reduceText = (text, maxLength = 70) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};
