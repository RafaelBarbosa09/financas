import { getCustomRepository } from "typeorm";

import Lancamento from "../models/Lancamento";
import LancamentoRepository from "../repositories/LancamentoRepository";

interface ILancamento {
  descricao: string;
  data: Date;
  valor: number;
  tipo: string;
  usuario_id: string;
}

class CriarLancamentoService {

/**
 * Este método deve cadastrar um lançamento
 * @param descricao
 * @param data
 * @param valor
 * @param tipo
 * @param usuario_id
 */
  public async salvar({ descricao, data, valor, tipo, usuario_id }: ILancamento): Promise<Lancamento> {

    const lancamentoRepository = getCustomRepository(LancamentoRepository);

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