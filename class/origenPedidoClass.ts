import { Response } from "express";
import { CallbackError } from "mongoose";
import Server from "./server";
const mongoose = require("mongoose");

// Interfaces
import { OrigenPedidoInterface } from "../interfaces/origenPedido";

// Modelos
import origenPedidoModel from "../models/origenPedidoModel";

export class OrigenPedido {
  constructor() {}

  crearOrigen(req: any, resp: Response): void {
    const idCreador = new mongoose.Types.ObjectId(req.usuario._id);
    const foranea = new mongoose.Types.ObjectId(req.body.foranea);
    const nombre = req.body.nombre;
    const estado: boolean = req.body.estado;

    const nuevoOrigen = new origenPedidoModel({
      idCreador,
      foranea,
      nombre,
      estado,
    });

    nuevoOrigen.save((err: CallbackError, origenDB: OrigenPedidoInterface) => {
      if (err) {
        return resp.json({
          ok: false,
          mensaje: `Error interno`,
          err,
        });
      } else {
        const server = Server.instance;
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

  async editarOrigen(req: any, resp: Response): Promise<any> {
    const _id = new mongoose.Types.ObjectId(req.body.id);
    const foranea = new mongoose.Types.ObjectId(req.body.foranea);
    const nombre = req.body.nombre;
    const estado: boolean = req.body.estado;

    const respOrigen = await origenPedidoModel.findOne({ _id, foranea }).exec();

    if (!respOrigen) {
      return resp.json({
        ok: false,
        mensaje: `No se encontró un Origen de Pedido`,
      });
    } else {
      const query = {
        nombre: nombre,
        estado: estado,
      };

      if (!query.nombre) {
        query.nombre = respOrigen.nombre;
      }

      origenPedidoModel.findOneAndUpdate(
        { _id, foranea },
        query,
        { new: true },
        (err: CallbackError, origenDB: any) => {
          if (err) {
            return resp.json({
              ok: false,
              mensaje: `Error interno`,
              err,
            });
          } else {
            const server = Server.instance;
            server.io.emit("cargar-origenes", {
              ok: true,
            });
            return resp.json({
              ok: true,
              mensaje: "Origen actualizado",
              origenDB,
            });
          }
        }
      );
    }
  }

  obtenerOrigen(req: any, resp: Response): void {
    const _id = new mongoose.Types.ObjectId(req.get("id"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    origenPedidoModel.findOne(
      { _id, foranea },
      (err: CallbackError, origenDB: OrigenPedidoInterface) => {
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
      }
    );
  }

  obtenerOrigenes(req: any, resp: Response): void {
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
    origenPedidoModel.find(
      { foranea },
      (err: CallbackError, origenesDB: Array<OrigenPedidoInterface>) => {
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
      }
    );
  }

  obtenerOrigenesCriterio(req: any, resp: Response): void {
    const criterio = req.get("criterio");
    const regExpCrit = new RegExp(criterio, "i");
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    origenPedidoModel.find(
      { $and: [{ $or: [{ nombre: regExpCrit }] }, { foranea }] },
      (err: CallbackError, origenesDB: Array<OrigenPedidoInterface>) => {
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
      }
    );
  }

  eliminarOrigen(req: any, resp: Response): void {
    const _id = new mongoose.Types.ObjectId(req.get("id"));
    const foranea = new mongoose.Types.ObjectId(req.get("foranea"));

    origenPedidoModel.findOne(
      { _id, foranea },
      (err: CallbackError, origenDB: OrigenPedidoInterface) => {
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

        origenPedidoModel.findOneAndDelete(
          { _id, foranea },
          {},
          (err: CallbackError, origenDB: any) => {
            if (err) {
              return resp.json({
                ok: false,
                mensaje: `Error interno`,
                err,
              });
            } else {
              const server = Server.instance;
              server.io.emit("cargar-origenes", {
                ok: true,
              });
              return resp.json({
                ok: true,
                origenDB,
              });
            }
          }
        );
      }
    );
  }
}
