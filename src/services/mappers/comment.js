export default function mapper(child) {
  return {
    comment: child.val().comment,
    time: child.val().time,
    emoji: child.val().emoji,
    user: child.val().user,
    id: child.key
  };
}
