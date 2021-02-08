import { Router } from "express";

const financasRouter = Router();

financasRouter.get('/', (request, response) => {
  response.json({message: 'Hello World'});
});

export default financasRouter;