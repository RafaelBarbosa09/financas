import { Router } from "express";

import lancamentosRouter from './lancamentos.routes';
import usuariosRouter from './usuarios.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/lancamentos', lancamentosRouter);
routes.use('/usuarios', usuariosRouter);
routes.use('/sessions', sessionsRouter);

export default routes;