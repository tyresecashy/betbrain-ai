import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { fixtures } from "./data.js";
import { validateFixtures } from "./validator.js";
import { analyzeFixtures } from "./analyzer.js";
import { runStrategy } from "./strategist.js";
import { buildSlip } from "./slipBuilder.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {

  if (req.url === "/" && req.method === "GET") {
    const html = fs.readFileSync(path.join(__dirname, "index.html"));
    res.writeHead(200, { "Content-Type": "text/html" });
    return res.end(html);
  }

  if (req.url === "/generate-slip" && req.method === "GET") {

    try {
      const valid = validateFixtures(fixtures).valid;
      const analyzed = analyzeFixtures(valid);
      const strategy = runStrategy(analyzed);
      const slip = buildSlip(strategy);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(slip, null, 2));

    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({
        error: "ENGINE_ERROR",
        message: err.message
      }));
    }
  }

  res.writeHead(404);
  res.end("Not Found");
});

server.listen(3000, () => {
  console.log("BetKing AI running on http://localhost:3000");
});
