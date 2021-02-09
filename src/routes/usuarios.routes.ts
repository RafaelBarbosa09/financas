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
  } catch (error) {
    return response.status(400).json({error: 'Erro ao tentar cadastrar'});
  }
});

export default usuariosRouter;