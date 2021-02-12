import { getCustomRepository } from "typeorm";

import LancamentoRepository from "../repositories/LancamentoRepository";

class RetornaTotalDeReceitas {

  /**
   * Este método deve retornar o valor total de todas as receitas por usuário logado.
   * @param usuario_id 
   */
  public async retornaTotalDeReceitas(usuario_id: string): Promise<string> {

    const lancamentoRepository = getCustomRepository(LancamentoRepository);
    const lancamentos = await lancamentoRepository.buscarPorUsuario(usuario_id);

    if(!lancamentos) {
      throw new Error('Lançamento não encontrado.');
    }
    
    let receita = 0;

    lancamentos.forEach(lancamento => {
      if(lancamento.tipo === 'RECEITA') {
        receita += Number(lancamento.valor);
      }
    });

    const totalFormadato = (receita).toLocaleString('pt-BR');

    return totalFormadato;
  }
}

export default RetornaTotalDeReceitas;