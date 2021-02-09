import { getCustomRepository } from "typeorm";
import Lancamento from "../models/Lancamento";
import LancamentoRepository from "../repositories/LancamentoRepository";
import UsuarioRepository from "../repositories/UsuarioRepository";

interface ILancamento {
  descricao: string;
  data: Date;
  valor: number;
  tipo: string;
  usuario_id: string;
}

class CriarLancamentoService {
  public async salvar({ descricao, data, valor, tipo, usuario_id }: ILancamento): Promise<Lancamento> {

    const lancamentoRepository = getCustomRepository(LancamentoRepository);
    const usuarioRepository = getCustomRepository(UsuarioRepository);

    const usuarioEncontrado = usuarioRepository.findOne(usuario_id);

    const lancamento = await lancamentoRepository.create({
      descricao, 
      data, 
      valor, 
      tipo,
      usuario_id
    });

    await lancamentoRepository.save(lancamento);

    return lancamento;

  }
}

export default CriarLancamentoService;