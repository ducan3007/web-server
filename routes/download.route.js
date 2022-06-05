import express from "express";

const download_route = express.Router();

download_route.route("/:file_name").get((req, res) => {
  const file_name = req.params.file_name;
  res.download(`./files/${file_name}`, (error) => {
    if (error) {
      res.status(404).send("File not found");
    }
  });
});

export default download_route;
