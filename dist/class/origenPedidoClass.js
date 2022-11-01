"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrigenPedido = void 0;
const server_1 = __importDefault(require("./server"));
const mongoose = require("mongoose");
// Modelos
const origenPedidoModel_1 = __importDefault(require("../models/origenPedidoModel"));
class OrigenPedido {
    constructor() { }
    crearOrigen(req, resp) {
        const idCreador = new mongoose.Types.ObjectId(req.usuario._id);
        const foranea = new mongoose.Types.ObjectId(req.body.foranea);
        const nombre = req.body.nombre;
        const estado = req.body.estado;
        const nuevoOrigen = new origenPedidoModel_1.default({
            idCreador,
            foranea,
            nombre,
            estado,
        });
        nuevoOrigen.save((err, origenDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            else {
                const server = server_1.default.instance;
                server.io.emit("cargar-origenes", {
                    ok: true,
                });
                return resp.json({
                    ok: true,
                    mensaje: `Origen de pedido creado`,
                    origenDB,
                });
            }
        });
    }
    editarOrigen(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = new mongoose.Types.ObjectId(req.body.id);
            const foranea = new mongoose.Types.ObjectId(req.body.foranea);
            const nombre = req.body.nombre;
            const estado = req.body.estado;
            const respOrigen = yield origenPedidoModel_1.default.findOne({ _id, foranea }).exec();
            if (!respOrigen) {
                return resp.json({
                    ok: false,
                    mensaje: `No se encontró un Origen de Pedido`,
                });
            }
            else {
                const query = {
                    nombre: nombre,
                    estado: estado,
                };
                if (!query.nombre) {
                    query.nombre = respOrigen.nombre;
                }
                origenPedidoModel_1.default.findOneAndUpdate({ _id, foranea }, query, { new: true }, (err, origenDB) => {
                    if (err) {
                        return resp.json({
                            ok: false,
                            mensaje: `Error interno`,
                            err,
                        });
                    }
                    else {
                        const server = server_1.default.instance;
                        server.io.emit("cargar-origenes", {
                            ok: true,
                        });
                        return resp.json({
                            ok: true,
                            mensaje: "Origen actualizado",
                            origenDB,
                        });
                    }
                });
            }
        });
    }
    obtenerOrigen(req, resp) {
        const _id = new mongoose.Types.ObjectId(req.get("id"));
        const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
        origenPedidoModel_1.default.findOne({ _id, foranea }, (err, origenDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            if (!origenDB) {
                return resp.json({
                    ok: false,
                    mensaje: `No se encontró un Origen de Pedido`,
                });
            }
            return resp.json({
                ok: true,
                origenDB,
            });
        });
    }
    obtenerOrigenes(req, resp) {
        const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
        origenPedidoModel_1.default.find({ foranea }, (err, origenesDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            return resp.json({
                ok: true,
                origenesDB,
            });
        });
    }
    obtenerOrigenesCriterio(req, resp) {
        const criterio = req.get("criterio");
        const regExpCrit = new RegExp(criterio, "i");
        const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
        origenPedidoModel_1.default.find({ $and: [{ $or: [{ nombre: regExpCrit }] }, { foranea }] }, (err, origenesDB) => {
            // estado: estado
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            return resp.json({
                ok: true,
                origenesDB,
            });
        });
    }
    eliminarOrigen(req, resp) {
        const _id = new mongoose.Types.ObjectId(req.get("id"));
        const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
        origenPedidoModel_1.default.findOne({ _id, foranea }, (err, origenDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            if (!origenDB) {
                return resp.json({
                    ok: false,
                    mensaje: `No se encontró un Origen de Pedido`,
                });
            }
            origenPedidoModel_1.default.findOneAndDelete({ _id, foranea }, {}, (err, origenDB) => {
                if (err) {
                    return resp.json({
                        ok: false,
                        mensaje: `Error interno`,
                        err,
                    });
                }
                else {
                    const server = server_1.default.instance;
                    server.io.emit("cargar-origenes", {
                        ok: true,
                    });
                    return resp.json({
                        ok: true,
                        origenDB,
                    });
                }
            });
        });
    }
}
exports.OrigenPedido = OrigenPedido;
