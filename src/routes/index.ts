import { Router } from "express";

import lancamentosRouter from './lancamentos.routes';

const routes = Router();

routes.use('/lancamentos', lancamentosRouter);

export default routes;