import { parseISO } from "date-fns";
import { Router } from "express";

import BuscarLancamentoPorDataService from "../services/BuscarLancamentoPorDataService";
import BuscarLancamentoService from "../services/BuscarLancamentosService";
import CriarLancamentoService from "../services/CriarLancamentoService";

const lancamentosRouter = Router();

/**
 * Este método deve retornar todos os lançamentos cadastrados
 */
lancamentosRouter.get('/', async (request, response) => {

  try {
    const buscarLancamentoService = new BuscarLancamentoService();

    const lancamentos = await buscarLancamentoService.buscarTodos();
    
    response.json({lancamentos});
  } catch (e) {
    return response.status(400).json({error: e.message});
  }

});

/**
 * Este método deve buscar um lançamento cadastrado por data
 * @param data
 */
lancamentosRouter.get('/:data', async (request, response) => {

  try {

    const { data } = request.params;
    const dataFormatada = parseISO(data);

    const buscarLancamentoPorDataService = new BuscarLancamentoPorDataService();

    const lancamento = await buscarLancamentoPorDataService.buscarPorData(dataFormatada);
    
    response.json({lancamento});
  } catch (e) {
    return response.status(400).json({error: e.message});
  }

});

/**
 * Este método deve cadastrar um lançamento
 */
lancamentosRouter.post('/', async (request, response) => {

  try {
    const { descricao, data, valor, tipo } = request.body;
    const criarLancamentoService = new CriarLancamentoService();
  
    const lancamento = await criarLancamentoService.salvar({
      descricao, 
      data, 
      valor, 
      tipo
    });

    return response.json(lancamento);
  } catch (error) {
    return response.status(400).json({error: 'Erro ao salvar lançamento'});
  }

});

export default lancamentosRouter;