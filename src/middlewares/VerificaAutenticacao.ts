import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import authConfig from '../config/autorizacao';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function VerificaAutenticacao(request: Request, response: Response, next: NextFunction): void {

  const autorizacaoHeader = request.headers.authorization;

  if(!autorizacaoHeader) {
    throw new Error('Erro de Autenticação.');
  }

  //Bearer aijslfnasf
  const [type, token] = autorizacaoHeader.split(' ');

  try {
    const tokenDecodificado = verify(token, authConfig.jwt.secret);

    const { sub } = tokenDecodificado as TokenPayload;

    request.user = {
      id: sub
    };

    return next();
  } catch (e) {
    throw new Error('Token JWT inválido.');
    
  }

}