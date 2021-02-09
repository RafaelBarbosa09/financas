import { getCustomRepository } from "typeorm";
import Lancamento from "../models/Lancamento";
import LancamentoRepository from "../repositories/LancamentoRepository";

class BuscarLancamentoService {

  /**
   * Este método deve buscar todos os lançamentos cadastrados.
   */
  public async buscarTodos(): Promise<Lancamento[] | null> {

    const lancamentoRepository = getCustomRepository(LancamentoRepository);
    const lancamentos = await lancamentoRepository.find();

    if(!lancamentos) {
      throw new Error('Não existem lançamentos a serem listados.');
    }

    return lancamentos || null;
  }
}

export default BuscarLancamentoService;