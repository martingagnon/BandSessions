export default function mapper(child) {
  return {
    name: child.val().name,
    audio: child.val().audio,
    id: child.key
  };
}
