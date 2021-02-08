import { Router } from "express";

import financasRouter from './financas.routes';

const routes = Router();

routes.use('/financas', financasRouter);

export default routes;