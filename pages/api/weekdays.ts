import { NextApiResponse, NextApiRequest } from "next";
import weekdays from "../../weekdays";
import { Weekday } from "..";

let cache: Weekday[];

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    cache = req.body;
  } else {
    if (!cache) {
      cache = weekdays;
    }
  }
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify(cache));
};

export default handler;
