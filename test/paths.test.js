const chai = require("chai");
chai.should();
const paths = require("../lib/paths");

describe('in an array, get number of paths from a to b', () => {
  it('returns paths on a 1x1 world', () => {
    const world = [[]];

    paths(world).should.equals(0);
  });

  it('returns paths on a 1x2 world', () => {
    const world = [[1, 1]];

    paths(world).should.equals(1);
  });

  it('returns paths on a 2x1 world', () => {
    const world = [[1], [1]];

    paths(world).should.equals(1);
  });

  it('returns paths on a 2x2 world', () => {
    const world = [[1, 1], [1, 1]];

    paths(world).should.equals(2);
  });

  it('returns paths on a 3x3 world', () => {
    const world = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];

    paths(world).should.equals(6);
  });

  it('do not walk on inactivated cells', () => {
    const world = [[1, 0, 1], [1, 1, 1], [1, 1, 1]];

    paths(world).should.equals(3);
  });
});
