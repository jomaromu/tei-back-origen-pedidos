import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// Interface
import { OrigenPedidoInterface } from "../interfaces/origenPedido";

// crear esquema
const Schema = mongoose.Schema;

const origenPedidoSchema = new Schema({
  idCreador: {
    type: Schema.Types.ObjectId,
    ref: "userWorker",
    required: [true, "Es necesario el ID del creador"],
  },
  nombre: { type: String },
  estado: { type: Boolean, default: true },
  foranea: {
    type: Schema.Types.ObjectId,
    ref: "userWorker",
  },
});

// validacion para único elemento
origenPedidoSchema.plugin(uniqueValidator, { message: "{PATH}, ya existe!!" });

export = mongoose.model<OrigenPedidoInterface>(
  "origenPedido",
  origenPedidoSchema
);
