import express from "express";

export const serveRest = (data) => {
  const app = express();

  app.get("/devices", (_, res) => res.send(data));

  app.listen(4000, () =>
    console.log("REST Server ready at http://localhost:4000")
  );
};
