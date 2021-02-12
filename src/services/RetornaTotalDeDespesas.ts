import { getCustomRepository } from "typeorm";

import LancamentoRepository from "../repositories/LancamentoRepository";

class RetornaTotalDeDespesas {

  /**
   * Este método deve retornar o valor total de todas as despesas por usuário logado.
   * @param usuario_id 
   */
  public async retornaTotalDeDespesas(usuario_id: string): Promise<string> {

    const lancamentoRepository = getCustomRepository(LancamentoRepository);
    const lancamentos = await lancamentoRepository.buscarPorUsuario(usuario_id);

    if(!lancamentos) {
      throw new Error('Lançamento não encontrado.');
    }
    
    let despesa = 0;

    lancamentos.forEach(lancamento => {
      if(lancamento.tipo === 'DESPESA') {
        despesa += Number(lancamento.valor);
      }
    });

    const totalFormadato = (despesa).toLocaleString('pt-BR');

    return totalFormadato;
  }
}

export default RetornaTotalDeDespesas;