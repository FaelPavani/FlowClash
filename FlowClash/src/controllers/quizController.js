// var quizModel = require("../models/quizModel");

// function plotar(req, res) {
//   var quizAtual = req.params.quizAtual;

//   quizModel.plotar(quizAtual).then((resultado) => {
//     if (resultado.length > 0) {
//       res.status(200).json(resultado);
//     } else {
//       res.status(204).json([]);
//     }
//   }).catch(function (erro) {
//     console.log(erro);
//     console.log("Houve um erro ao buscar o quiz ", erro.sqlMessage);
//     res.status(500).json(erro.sqlMessage);
//   });
// }