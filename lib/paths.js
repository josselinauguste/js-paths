function paths(world) {
  const width = world[0].length;
  const height = world.length;
  const LEFT = 0;
  const BOTTOM = 1;

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

    if (position[0] === width - 1 && position[1] === height - 1) {
      return 1;
    }
    if (outside() || wall()) {
      return 0;
    }
    return explore(walk(position, LEFT)) + explore(walk(position, BOTTOM));
  }
  return explore([0, 0]);
}

module.exports = paths;
