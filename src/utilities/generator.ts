export default function* (amount: number = 10) {
  let current = 1;

  while (current < amount) {
    yield current += 1;
  }
}
