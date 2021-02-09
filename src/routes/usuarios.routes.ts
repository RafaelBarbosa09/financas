import { Router } from "express";
import CriarUsuarioService from "../services/CriarUsuarioService";

const usuariosRouter = Router();

usuariosRouter.post('/', async (request, response) => {
  try {
    const { nome, email, senha} = request.body;

    const criarUsuarioService = new CriarUsuarioService();
  
    const usuario = await criarUsuarioService.salvar({
      nome, 
      email, 
      senha
    });

    return response.json(usuario);
  } catch (e) {
    return response.status(400).json({error: e.message});
  }
});

export default usuariosRouter;