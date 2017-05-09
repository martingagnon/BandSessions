export default function (child) {
  return {
    name: child.val().name,
    picture: child.val().picture,
    id: child.key
  };
}
