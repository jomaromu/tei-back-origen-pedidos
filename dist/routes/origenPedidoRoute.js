"use strict";
const express_1 = require("express");
const auth_1 = require("../auth/auth");
const origenPedidoClass_1 = require("../class/origenPedidoClass");
const origenRouter = (0, express_1.Router)();
origenRouter.post('/crearOrigen', [auth_1.verificaToken], (req, resp) => {
    const crearOrigen = new origenPedidoClass_1.OrigenPedido();
    crearOrigen.crearOrigen(req, resp);
});
origenRouter.put('/editarOrigen', [auth_1.verificaToken], (req, resp) => {
    const editarOrigen = new origenPedidoClass_1.OrigenPedido();
    editarOrigen.editarOrigen(req, resp);
});
origenRouter.get('/obtenerOrigen', [auth_1.verificaToken], (req, resp) => {
    const obtenerOrigen = new origenPedidoClass_1.OrigenPedido();
    obtenerOrigen.obtenerOrigen(req, resp);
});
origenRouter.get('/obtenerOrigenes', [auth_1.verificaToken], (req, resp) => {
    const obtenerOrigenes = new origenPedidoClass_1.OrigenPedido();
    obtenerOrigenes.obtenerOrigenes(req, resp);
});
origenRouter.get('/obtenerOrigenes', [auth_1.verificaToken], (req, resp) => {
    const obtenerOrigenes = new origenPedidoClass_1.OrigenPedido();
    obtenerOrigenes.obtenerOrigenes(req, resp);
});
origenRouter.delete('/eliminarOrigen', [auth_1.verificaToken], (req, resp) => {
    const eliminarOrigen = new origenPedidoClass_1.OrigenPedido();
    eliminarOrigen.eliminarOrigen(req, resp);
});
module.exports = origenRouter;
