const calculate_points = finish => {
  const ranges = [
    {range: [1], points: 15},
    { range: [2, 3], points: 12 },
    { range: [4, 8], points: 8 },
    { range: [9, 16], points: 5 },
    { range: [17, 32], points: 3 },
    { range: [33, 64], points: 2 },
    { range: [65, 128], points: 1 }
  ]

  let match = ranges.find(({ range }) => range.includes(finish));
  return match ? match.points : 0;
}


module.exports = {
  calculate_points,
}