import { parseISO } from "date-fns";
import { Router } from "express";

import verificaAutenticacao from '../middlewares/VerificaAutenticacao';

import BuscarLancamentoPorDataService from "../services/BuscarLancamentoPorDataService";
import BuscarLancamentoPorTipoService from "../services/BuscarLancamentoPorTipoService";
import BuscarLancamentoPorUsuarioService from "../services/BuscarLancamentoPorUsuarioService";
import CriarLancamentoService from "../services/CriarLancamentoService";
import RetornaTotalDeDespesas from "../services/RetornaTotalDeDespesas";
import TotalDosLancamentosService from "../services/TotalDosLancamentosService";

const lancamentosRouter = Router();

//todas as rotas precisam atender a esse middleware.
lancamentosRouter.use(verificaAutenticacao);

/**
 * Este método deve buscar o valor total de todos os lançamentos do usuário logado.
 */
lancamentosRouter.get('/total', async (request, response) => {

  try {
    const usuario_id = request.user.id;

    const totalDosLancamentosService = new TotalDosLancamentosService();

    const totalDosLancamentos = await totalDosLancamentosService.retornaTotalDosLancamentos(usuario_id);

    return response.json({totalDosLancamentos});
  } catch (e) {
    return response.status(400).json({error: e.message});
  }

});

/**
 * Este método deve buscar o valor total de todos os lançamentos do usuário logado.
 */
lancamentosRouter.get('/despesas/total', async (request, response) => {

  try {
    const usuario_id = request.user.id;

    const totalDeDespesasService = new RetornaTotalDeDespesas();

    const totalDeDespesas = await totalDeDespesasService.retornaTotalDeDespesas(usuario_id);

    return response.json({totalDeDespesas});
  } catch (e) {
    return response.status(400).json({error: e.message});
  }

});

/**
 * Este método deve buscar todos os lançamentos cadastrados por usuário logado.
 */
lancamentosRouter.get('/', async (request, response) => {

  try {

    const usuario_id = request.user.id;

    const buscarLancamentoPorUsuarioService = new BuscarLancamentoPorUsuarioService();

    const lancamentos = await buscarLancamentoPorUsuarioService.buscarPorUsuario(usuario_id);
    
    return response.json({lancamentos});
  } catch (e) {
    return response.status(400).json({error: e.message});
  }

});

/**
 * Este método deve buscar todos os lançamentos do usuário logado por data.
 * @param data
 */
lancamentosRouter.get('/:data', async (request, response) => {

  try {
    const { data } = request.params;
    const usuario_id = request.user.id;
    const dataFormatada = parseISO(data);

    const buscarLancamentoPorDataService = new BuscarLancamentoPorDataService();

    const lancamento = await buscarLancamentoPorDataService.buscarPorData(dataFormatada, usuario_id);
    
    return response.json({lancamento});
  } catch (e) {
    return response.status(400).json({error: e.message});
  }

});

/**
 * Este método deve buscar todos os lançamentos do usuário logado por tipo(RECEITA OU DESPESA).
 * @param tipo
 */
lancamentosRouter.get('/tipo/:tipo', async (request, response) => {

  try {
    const { tipo } = request.params;
    const usuario_id = request.user.id;

    const buscarLancamentoPorTipoService = new BuscarLancamentoPorTipoService();

    const lancamentos = await buscarLancamentoPorTipoService.buscarPorTipo(tipo, usuario_id);
    
    return response.json({lancamentos});
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
    const usuario_id = request.user.id;

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