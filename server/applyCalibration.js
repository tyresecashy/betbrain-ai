import fs from "fs";

const config = {
  SAFE: 5.220,
  BOOST_MIN: 4.865,
  BOOST_MAX: 5.220
};

const strategist = `
export function runStrategy(fixtures) {

  const SAFE = [];
  const BOOST = [];
  const KING = [];

  for (const f of fixtures) {

    const score = f.scores.final;

    if (score >= ${config.SAFE}) {
      SAFE.push(f);
    }

    else if (score >= ${config.BOOST_MIN} && score < ${config.BOOST_MAX}) {
      BOOST.push(f);
    }

    else {
      KING.push(f);
    }
  }

  return { SAFE, BOOST, KING };
}
`;

fs.writeFileSync("./strategist.js", strategist);

console.log("✔ Strategist updated from calibration data");
