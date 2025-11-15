module.exports = function buildEntry({
  ranking,
  country,
  name,
  age,
  points,
  tournaments_played
}) {
  return {
    ranking,
    country,
    name,
    age,
    points,
    tournaments_played
  };
};
