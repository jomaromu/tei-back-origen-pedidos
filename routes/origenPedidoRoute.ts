import { Response, Request, Router } from "express";
import { verificaToken } from "../auth/auth";
import { OrigenPedido } from "../class/origenPedidoClass";

const origenRouter = Router();

origenRouter.post(
  "/crearOrigen",
  [verificaToken],
  (req: Request, resp: Response) => {
    const crearOrigen = new OrigenPedido();
    crearOrigen.crearOrigen(req, resp);
  }
);

origenRouter.put(
  "/editarOrigen",
  [verificaToken],
  (req: Request, resp: Response) => {
    const editarOrigen = new OrigenPedido();
    editarOrigen.editarOrigen(req, resp);
  }
);

origenRouter.get(
  "/obtenerOrigen",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerOrigen = new OrigenPedido();
    obtenerOrigen.obtenerOrigen(req, resp);
  }
);

origenRouter.get(
  "/obtenerOrigenes",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerOrigenes = new OrigenPedido();
    obtenerOrigenes.obtenerOrigenes(req, resp);
  }
);

origenRouter.get(
  "/obtenerOrigenesCriterio",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerOrigenesCriterio = new OrigenPedido();
    obtenerOrigenesCriterio.obtenerOrigenesCriterio(req, resp);
  }
);

origenRouter.get(
  "/obtenerOrigenes",
  [verificaToken],
  (req: Request, resp: Response) => {
    const obtenerOrigenes = new OrigenPedido();
    obtenerOrigenes.obtenerOrigenes(req, resp);
  }
);

origenRouter.delete(
  "/eliminarOrigen",
  [verificaToken],
  (req: Request, resp: Response) => {
    const eliminarOrigen = new OrigenPedido();
    eliminarOrigen.eliminarOrigen(req, resp);
  }
);

export = origenRouter;
