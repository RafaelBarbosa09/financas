import { getCustomRepository } from "typeorm";
import Lancamento from "../models/Lancamento";
import LancamentoRepository from "../repositories/LancamentoRepository";

interface ILancamento {
  descricao: string;
  data: Date;
  valor: number;
  tipo: string
}

class CriarLancamentoService {
  public async salvar({ descricao, data, valor, tipo }: ILancamento): Promise<Lancamento> {

    const lancamentoRepository = getCustomRepository(LancamentoRepository);

    const lancamento = lancamentoRepository.create({
      descricao, 
      data, 
      valor, 
      tipo
    });

    await lancamentoRepository.save(lancamento);

    return lancamento;

  }
}

export default CriarLancamentoService;