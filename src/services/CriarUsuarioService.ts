import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";

import Usuario from '../models/Usuario';
import UsuarioRepository from "../repositories/UsuarioRepository";

interface IUsuario {
  nome: string;
  email: string;
  senha: string;
}

class CriarUsuarioService {

  /**
   * 
   * Este método deve cadastrar um usuário
   * @param nome
   * @param email
   * @param senha 
   */
  public async salvar({ nome, email, senha }: IUsuario): Promise<Usuario> {

    const usuarioRepository = getCustomRepository(UsuarioRepository);

    const usuarioExistente = await usuarioRepository.findOne({where: {email}});

    if(usuarioExistente) {
      throw new Error('E-mail já cadastrado');
    }

    const senhaHash = await hash(senha, 8);

    const usuario = usuarioRepository.create({
      nome, 
      email, 
      senha: senhaHash
    });

    await usuarioRepository.save(usuario);

    return usuario;

  }
}

export default CriarUsuarioService;