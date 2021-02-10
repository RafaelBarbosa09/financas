import { parseISO } from "date-fns";
import { Router } from "express";

import verificaAutenticacao from '../middlewares/VerificaAutenticacao';

import BuscarLancamentoPorDataService from "../services/BuscarLancamentoPorDataService";
import BuscarLancamentoPorTipoService from "../services/BuscarLancamentoPorTipoService";
import BuscarLancamentoPorUsuarioService from "../services/BuscarLancamentoPorUsuarioService";
import BuscarLancamentoService from "../services/BuscarLancamentosService";
import CriarLancamentoService from "../services/CriarLancamentoService";

const lancamentosRouter = Router();

//todas as rotas precisam atender a esse middleware.
lancamentosRouter.use(verificaAutenticacao);

/**
 * Este método deve retornar todos os lançamentos cadastrados.
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
 * Este método deve buscar todos os lançamentos cadastrados por usuário logado.
 * @param usuario_id
 */
lancamentosRouter.get('/usuario/', async (request, response) => {

  try {

    const usuario_id = request.user.id;

    const buscarLancamentoPorUsuarioService = new BuscarLancamentoPorUsuarioService();

    const lancamentos = await buscarLancamentoPorUsuarioService.buscarPorUsuario(usuario_id);
    
    response.json({lancamentos});
  } catch (e) {
    return response.status(400).json({error: e.message});
  }

});

/**
 * Este método deve buscar todos os lançamentos cadastrados por data.
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
 * Este método deve buscar todos os lançamentos cadastrados por tipo(RECEITA OU DESPESA).
 * @param tipo
 */
lancamentosRouter.get('/tipo/:tipo', async (request, response) => {

  try {

    const { tipo } = request.params;

    const buscarLancamentoPorTipoService = new BuscarLancamentoPorTipoService();

    const lancamentos = await buscarLancamentoPorTipoService.buscarPorTipo(tipo);
    
    response.json({lancamentos});
  } catch (e) {
    return response.status(400).json({error: e.message});
  }

});

/**
 * Este método deve cadastrar um lançamento
 */
lancamentosRouter.post('/', async (request, response) => {

  try {
    const { descricao, data, valor, tipo, usuario_id } = request.body;
    const criarLancamentoService = new CriarLancamentoService();
  
    const lancamento = await criarLancamentoService.salvar({
      descricao, 
      data, 
      valor, 
      tipo,
      usuario_id
    });

    return response.json(lancamento);
  } catch (error) {
    return response.status(400).json({error: 'Erro ao salvar lançamento'});
  }

});

export default lancamentosRouter;