const memoization = function (width, height) {
  return {
    data: new Array(width * height),
    index: function (position) {
      return position[0] * width + position[1];
    },
    get: function (position) {
      return this.data[this.index(position)];
    },
    set: function (position, value) {
      this.data[this.index(position)] = value;
    },
    evaluate: function (position, f) {
      const value = f();
      this.set(position, value);
      return value;
    }
  }
};

function paths(world) {
  const width = world.length;
  const height = world[0].length;
  const LEFT = 0;
  const BOTTOM = 1;
  const memo = memoization(width, height);

  function walk(position, direction) {
    if (direction === LEFT)
      return [position[0] + 1, position[1]];
    else if (direction === BOTTOM)
      return [position[0], position[1] + 1];
    throw new Error(`invalid direction: ${direction}`);
  }

  function explore(position) {
    function outside() {
      return position[0] === width || position[1] === height;
    }

    function wall() {
      return world[position[0]][position[1]] === 0;
    }

    if (outside() || wall()) {
      return 0;
    }
    if (memo.get(position) !== undefined) {
      return memo.get(position);
    }
    if (position[0] === width - 1 && position[1] === height - 1) {
      return 1;
    }
    return memo.evaluate(position, () => { return explore(walk(position, LEFT)) + explore(walk(position, BOTTOM)) });
  }
  return explore([0, 0]);
}

module.exports = paths;
