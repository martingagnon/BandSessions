export default function mapper(child) {
  return {
    comment: child.val().comment,
    time: child.val().time,
    emotion: child.val().emotion,
    user: child.val().user,
    id: child.key
  };
}
