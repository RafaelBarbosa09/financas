import { EntityRepository, Repository } from "typeorm";
import Lancamento from "../models/Lancamento";

@EntityRepository(Lancamento)
class LancamentoRepository extends Repository<Lancamento> {

  public async buscarPorData(data: Date): Promise<Lancamento | null>{

    const lancamentoEncontrado = await this.findOne({
      where: {data}
    });

    return lancamentoEncontrado || null;

  }

}

export default LancamentoRepository;