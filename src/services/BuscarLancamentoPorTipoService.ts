import { getCustomRepository } from "typeorm";

import Lancamento from "../models/Lancamento";
import LancamentoRepository from "../repositories/LancamentoRepository";

class BuscarLancamentoPorTipoService {

  public async buscarPorTipo(tipo: string): Promise<Lancamento[] | null> {

    const lancamentoRepository = getCustomRepository(LancamentoRepository);

    const lancamentos = await lancamentoRepository.buscarPorTipo(tipo);

    if(!lancamentos) {
      throw new Error('Lançamento não encontrado.');
    }

    return lancamentos || null;
  }
}

export default BuscarLancamentoPorTipoService;