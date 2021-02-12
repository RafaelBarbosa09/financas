import { Router } from "express";
import AutenticarUsuarioService from "../services/AutenticarUsuarioService";

const sessionsRouter = Router();

interface ISession {
  id: string;
  email: string;
  senha?: string;
  criado_em: Date;
  alterado_em: Date;
}

/**
 * Este método deve criar uma sessão para gerar o token do usuário logado.
 */
sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, senha } = request.body;

    const autenticarUsuarioService = new AutenticarUsuarioService();

    const { usuario, token } = await autenticarUsuarioService.autenticar({
      email,
      senha
    });

    const usuarioCadastrado: ISession = {
      id: usuario.id,
      email: usuario.nome,
      senha: usuario.senha,
      criado_em: usuario.criado_em,
      alterado_em: usuario.alterado_em
    }

    delete usuarioCadastrado.senha;

    return response.json({ usuarioCadastrado, token });
  } catch (e) {
    return response.status(400).json({error: e.message});
  }
});

export default sessionsRouter;