const express = require("express");
const { fork } = require("child_process");
const { Router } = express;
const randomRouter = Router();

module.exports = randomRouter;

randomRouter.get("/", (req, res) => {
  //return res.json({puerto: req.port}) activar para verificar los puertos en los que cae esta ruta con nginx (del 8081 al 8085)
  const numeros = req.query.cant || 100000000;
  const forked = fork("../entrega15/randomNumbers.js", ["--c", numeros]);

  forked.on("message", (nums) => {
    //forked.send(numeros)
    return res.json(nums);
  });
});
