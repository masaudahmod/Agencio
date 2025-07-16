import express from "express";

const app = express();

app.get("/", (_, res) => {
  return res.json(
    "Hello from the server! Your request is like a clean commit—it's been received, and we're already processing it. Stay tuned for the response, which will be as polished as a well-crafted pull request!"
  );
});

export { app };
