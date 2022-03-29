const { forEach } = require('../index');

let numbers

beforeEach(() => {
  numbers = [1,2,3]
})

it('should sum an array', () => {
  let total = 0;
  forEach(numbers, value => {
    total += value;
  });

  assert.strictEqual(total, 6);

  numbers.push(1)
});

it('beforeEach is run before each', () => {
  assert.equal(numbers.length, 3)
})
