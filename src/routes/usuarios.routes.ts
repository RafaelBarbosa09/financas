import { isSameQuarter } from "date-fns";
import { Router } from "express";
import CriarUsuarioService from "../services/CriarUsuarioService";

const usuariosRouter = Router();

interface IUsuario {
  id: string;
  nome: string;
  email: string;
  senha?: string;
  criado_em: Date;
  alterado_em: Date;
}

/**
 * Este método deve cadastrar um usuário
 */
usuariosRouter.post('/', async (request, response) => {
  try {
    const { nome, email, senha} = request.body;

    const criarUsuarioService = new CriarUsuarioService();
  
    const usuario = await criarUsuarioService.salvar({
      nome, 
      email, 
      senha
    });

    const usuarioCadastrado: IUsuario = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      criado_em: usuario.criado_em,
      alterado_em: usuario.alterado_em
    }

    delete usuarioCadastrado.senha;

    return response.json(usuarioCadastrado);
  } catch (e) {
    return response.status(400).json({error: e.message});
  }
});

export default usuariosRouter;