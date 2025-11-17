module.exports = function buildEntry({
  ranking,
  country,
  name,
  age,
  points,
  tournamentsPlayed
}) {
  return {
    ranking,
    country,
    name,
    age,
    points,
    tournamentsPlayed
  };
};
