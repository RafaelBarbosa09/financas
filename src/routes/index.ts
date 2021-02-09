import { Router } from "express";

import lancamentosRouter from './lancamentos.routes';
import usuariosRouter from './usuarios.routes';

const routes = Router();

routes.use('/lancamentos', lancamentosRouter);
routes.use('/usuarios', usuariosRouter);

export default routes;