import { getCustomRepository } from "typeorm";

import LancamentoRepository from '../repositories/LancamentoRepository';

class TotalDosLancamentosService {

  /**
   * Este método deve retornar o valor total de todos os lançamentos por usuário logado.
   * @param usuario_id 
   */
  public async retornaTotalDosLancamentos(usuario_id: string): Promise<number> {

    const lancamentoRepository = getCustomRepository(LancamentoRepository);
    const lancamentos = await lancamentoRepository.buscarPorUsuario(usuario_id);

    if(!lancamentos) {
      throw new Error('Lançamento não encontrado.');
    }
    
    let receita = 0;
    let despesa = 0;
    let total = 0;

    lancamentos.forEach(lancamento => {

      if(lancamento.tipo === 'RECEITA') {
        receita += Number(lancamento.valor);
      } else if(lancamento.tipo === 'DESPESA') {
        despesa += Number(lancamento.valor);
      }

      total = receita - despesa;
    });

    return total;
  }
}

export default TotalDosLancamentosService;