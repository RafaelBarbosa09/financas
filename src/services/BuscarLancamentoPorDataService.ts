import { getCustomRepository } from "typeorm";
import Lancamento from "../models/Lancamento";
import LancamentoRepository from "../repositories/LancamentoRepository";

class BuscarLancamentoPorDataService {

  /**
   * Este método deve buscar Todos os lançamentos por data.
   * @param data 
   */
  public async buscarPorData(data: Date): Promise<Lancamento[] | null> {

    const lancamentoRepository = getCustomRepository(LancamentoRepository);

    const lancamentoEncontrado = await lancamentoRepository.buscarPorData(data);

    if(!lancamentoEncontrado) {
      throw new Error('Lançamento não encontrado.');
    }

    return lancamentoEncontrado || null;
  }
}

export default BuscarLancamentoPorDataService;