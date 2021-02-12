import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";

import Usuario from "../models/Usuario";
import UsuarioRepository from "../repositories/UsuarioRepository";
import authConfig from '../config/autorizacao';

interface IAutenticacao {
  email: string;
  senha: string;
}

interface IUsuario {
  usuario: Usuario;
  token: string;
}

class AutenticarUsuarioService {

  /**
 * Este método deve criar uma sessão para gerar o token do usuário logado.
 * @param email
 * @param senha 
 */
  public async autenticar({ email, senha }: IAutenticacao): Promise<IUsuario> {

    const usuarioRepository = getCustomRepository(UsuarioRepository);

    const usuario = await usuarioRepository.findOne({ 
      where: { email } 
    });

    if(!usuario) {
      throw new Error('E-mail ou senha inválidos.');
    }

    const senhaCorreta = await compare(senha, usuario.senha);

    if(!senhaCorreta) {
      throw new Error('E-mail ou senha inválidos.');
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: usuario.id,
      expiresIn: authConfig.jwt.expiresIn
    });

    return { 
      usuario,
      token
    };
    
  }
}

export default AutenticarUsuarioService;