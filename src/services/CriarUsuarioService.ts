import { getCustomRepository } from "typeorm";

import Usuario from '../models/Usuario';
import UsuarioRepository from "../repositories/UsuarioRepository";

interface IUsuario {
  nome: string;
  email: string;
  senha: string;
}

class CriarUsuarioService {

  public async salvar({ nome, email, senha }: IUsuario): Promise<Usuario> {

    const usuarioRepository = getCustomRepository(UsuarioRepository);

    const usuarioExistente = await usuarioRepository.findOne({where: {email}});

    if(usuarioExistente) {
      throw new Error('E-mail já cadastrado');
    }

    const usuario = usuarioRepository.create({
      nome, 
      email, 
      senha
    });

    await usuarioRepository.save(usuario);

    return usuario;

  }
}

export default CriarUsuarioService;