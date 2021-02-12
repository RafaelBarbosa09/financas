import { EntityRepository, Repository } from "typeorm";

import Lancamento from "../models/Lancamento";

@EntityRepository(Lancamento)
class LancamentoRepository extends Repository<Lancamento> {

  /**
   * Este método deve buscar todos os lançamentos por data.
   * @param data 
   */
  public async buscarPorData(data: Date, usuario_id: string): Promise<Lancamento[] | null>{

    const lancamentoEncontrado = await this.find({
      where: {data, usuario_id}
    });

    return lancamentoEncontrado || null;

  }

  /**
   * Este método deve buscar todos os lançamentos por tipo(RECEITA OU DESPESA).
   * @param tipo 
   */
  public async buscarPorTipo(tipo: string, usuario_id: string): Promise<Lancamento[] | null>{

    const lancamentoEncontrado = await this.find({
      where: {tipo, usuario_id}
    });

    return lancamentoEncontrado || null;

  }

  /**
   * Este método deve buscar todos os lançamentos por usuário.
   * @param usuario_id 
   */
  public async buscarPorUsuario(usuario_id: string): Promise<Lancamento[] | null>{

    const lancamentosEncontrados = await this.find({
      where: {usuario_id}
    });

    return lancamentosEncontrados || null;

  }
}

export default LancamentoRepository;