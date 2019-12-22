import { NextApiResponse, NextApiRequest } from "next";

const handler = (_: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify([
      {
        date: "2019-10-14",
        delta: -2,
        workTimes: [],
        breaks: []
      },
      {
        date: "2019-10-15",
        delta: +1,
        workTimes: [],
        breaks: []
      },
      {
        date: "2019-10-16",
        delta: +1,
        workTimes: [],
        breaks: []
      },
      {
        date: "2019-10-17",
        delta: +1,
        workTimes: [],
        breaks: []
      },
      {
        date: "2019-10-18",
        delta: +1,
        workTimes: [],
        breaks: []
      },
      {
        date: "2019-10-19",
        delta: +1,
        workTimes: [],
        breaks: []
      },
      {
        date: "2019-10-20",
        delta: +1,
        workTimes: [
          {
            start: "2019-10-25T07:00:00.000Z",
            end: "2019-10-25T15:00:00.000Z"
          }
        ],
        breaks: [
          {
            duration: {
              hours: 1,
              minutes: 15
            }
          }
        ]
      }
    ])
  );
};

export default handler;
