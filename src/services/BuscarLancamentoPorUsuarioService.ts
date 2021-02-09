import { getCustomRepository } from "typeorm";

import Lancamento from "../models/Lancamento";
import LancamentoRepository from "../repositories/LancamentoRepository";

class BuscarLancamentoPorUsuarioService {

  public async buscarPorUsuario(usuario_id: string): Promise<Lancamento[] | null> {

    const lancamentoRepository = getCustomRepository(LancamentoRepository);

    const lancamentos = await lancamentoRepository.buscarPorUsuario(usuario_id);

    if(!lancamentos) {
      throw new Error('Lançamento não encontrado.');
    }

    return lancamentos || null;
  }
}

export default BuscarLancamentoPorUsuarioService;