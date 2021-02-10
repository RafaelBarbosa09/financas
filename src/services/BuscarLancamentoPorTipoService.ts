import { getCustomRepository } from "typeorm";

import Lancamento from "../models/Lancamento";
import LancamentoRepository from "../repositories/LancamentoRepository";

class BuscarLancamentoPorTipoService {

  /**
   * Este método deve buscar todos os lançamentos por tipo(RECEITA OU DESPESA).
   * @param tipo 
   */
  public async buscarPorTipo(tipo: string, usuario_id: string): Promise<Lancamento[] | null> {

    const lancamentoRepository = getCustomRepository(LancamentoRepository);

    const lancamentos = await lancamentoRepository.buscarPorTipo(tipo, usuario_id);

    if(!lancamentos) {
      throw new Error('Lançamento não encontrado.');
    }

    return lancamentos || null;
  }
}

export default BuscarLancamentoPorTipoService;