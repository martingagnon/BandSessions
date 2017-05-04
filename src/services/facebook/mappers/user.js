export default function mapper(user) {
  return {
    id: user.id,
    name: user.name,
    picture: user.picture.data.url
  };
}
