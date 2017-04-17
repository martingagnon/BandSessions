export default function mapper(child) {
  const comments = (child.val().comments) ? mapComments(child.val().comments) : {};

  return {
    name: child.val().name,
    audio: child.val().audio,
    key: child.key,
    comments
  };
}

const mapComments = (comments) => {
  const keys = Object.keys(comments);
  return keys.map((key) => {
    return {key, ...comments[key]};
  });
};
