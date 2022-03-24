export default function* (amount: number = 10) {
  let current = 0;

  while (current < amount) {
    yield current += 1;
  }
}
