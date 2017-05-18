export default function mapper(child) {
  return {
    name: child.val().name,
    audio: child.val().audio,
    duration: child.val().duration,
    id: child.key
  };
}
