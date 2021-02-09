import { EntityRepository, Repository } from "typeorm";
import Lancamento from "../models/Lancamento";

@EntityRepository(Lancamento)
class LancamentoRepository extends Repository<Lancamento> {

  public async buscarPorData(data: Date): Promise<Lancamento[] | null>{

    const lancamentoEncontrado = await this.find({
      where: {data}
    });

    return lancamentoEncontrado || null;

  }

  public async buscarPorTipo(tipo: string): Promise<Lancamento[] | null>{

    const lancamentoEncontrado = await this.find({
      where: {tipo}
    });

    return lancamentoEncontrado || null;

  }

  public async buscarPorUsuario(usuario_id: string): Promise<Lancamento[] | null>{

    const lancamentoEncontrado = await this.find({
      where: {usuario_id}
    });

    return lancamentoEncontrado || null;

  }

}

export default LancamentoRepository;