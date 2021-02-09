import { EntityRepository, Repository } from "typeorm";
import Lancamento from "../models/Lancamento";

@EntityRepository(Lancamento)
class LancamentoRepository extends Repository<Lancamento> {

  /**
   * Este método deve buscar todos os lançamentos por data.
   * @param data 
   */
  public async buscarPorData(data: Date): Promise<Lancamento[] | null>{

    const lancamentoEncontrado = await this.find({
      where: {data}
    });

    return lancamentoEncontrado || null;

  }

  /**
   * Este método deve buscar todos os lançamentos por tipo(RECEITA OU DESPESA).
   * @param tipo 
   */
  public async buscarPorTipo(tipo: string): Promise<Lancamento[] | null>{

    const lancamentoEncontrado = await this.find({
      where: {tipo}
    });

    return lancamentoEncontrado || null;

  }

  /**
   * Este método deve buscar todos os lançamentos por usuário.
   * @param usuario_id 
   */
  public async buscarPorUsuario(usuario_id: string): Promise<Lancamento[] | null>{

    const lancamentoEncontrado = await this.find({
      where: {usuario_id}
    });

    return lancamentoEncontrado || null;

  }

}

export default LancamentoRepository;