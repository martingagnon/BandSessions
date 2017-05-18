export default function mapper(child) {
  return Object.assign(child.val(), {id: child.key});
}
