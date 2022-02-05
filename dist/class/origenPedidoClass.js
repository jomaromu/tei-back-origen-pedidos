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
// Modelos
const origenPedidoModel_1 = __importDefault(require("../models/origenPedidoModel"));
class OrigenPedido {
    constructor() { }
    crearOrigen(req, resp) {
        const idCreador = req.usuario._id;
        const nombre = req.body.nombre;
        const nuevoOrigen = new origenPedidoModel_1.default({
            idCreador: idCreador,
            nombre: nombre,
        });
        nuevoOrigen.save((err, origenDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            return resp.json({
                ok: true,
                mensaje: `Origen de pedido creado`,
                origenDB,
            });
        });
    }
    editarOrigen(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.get("id");
            const nombre = req.body.nombre;
            const estado = req.body.estado;
            // const estado = req.get('estado');
            // const estado: boolean = castEstado(estadoHeader);
            const respOrigen = yield origenPedidoModel_1.default.findById(id).exec();
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
                // console.log(query.estado)
                origenPedidoModel_1.default.findByIdAndUpdate(id, query, { new: true }, (err, origenDB) => {
                    if (err) {
                        return resp.json({
                            ok: false,
                            mensaje: `Error interno`,
                            err,
                        });
                    }
                    return resp.json({
                        ok: true,
                        mensaje: "Origen actualizado",
                        origenDB,
                    });
                });
            }
        });
    }
    obtenerOrigen(req, resp) {
        const id = req.get("id");
        origenPedidoModel_1.default.findById(id, (err, origenDB) => {
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
        const estado = req.get("estado");
        // const estado: boolean = castEstado(estadoHeader);
        origenPedidoModel_1.default.find({}, (err, origenesDB) => {
            // estado: estado
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            // if (origenesDB.length === 0) {
            //     return resp.json({
            //         ok: false,
            //         mensaje: `No se encontró un Origen de Pedido`
            //     });
            // }
            return resp.json({
                ok: true,
                origenesDB,
            });
        });
    }
    obtenerOrigenesCriterio(req, resp) {
        const criterio = req.get("criterio");
        const regExpCrit = new RegExp(criterio, "i");
        origenPedidoModel_1.default.find({ nombre: regExpCrit }, (err, origenesDB) => {
            // estado: estado
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            // if (origenesDB.length === 0) {
            //     return resp.json({
            //         ok: false,
            //         mensaje: `No se encontró un Origen de Pedido`
            //     });
            // }
            return resp.json({
                ok: true,
                origenesDB,
            });
        });
    }
    eliminarOrigen(req, resp) {
        const id = req.get("id");
        origenPedidoModel_1.default.findById(id, (err, origenDB) => {
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
            origenPedidoModel_1.default.findByIdAndDelete(id, {}, (err, origenEliminadoDB) => {
                if (err) {
                    return resp.json({
                        ok: false,
                        mensaje: `Error interno`,
                        err,
                    });
                }
                return resp.json({
                    ok: true,
                    origenEliminadoDB,
                });
            });
        });
    }
}
exports.OrigenPedido = OrigenPedido;
