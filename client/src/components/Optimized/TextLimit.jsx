export const TextLimit = ({ text, limit = 25 }) => {
  const truncatedText =
    text.length > limit ? text.substring(0, limit) + "..." : text;

  return <p>{truncatedText}</p>;
};
