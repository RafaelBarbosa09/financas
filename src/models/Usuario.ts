import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Lancamento from "./Lancamento";

@Entity('usuario')
class Usuario {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @CreateDateColumn()
  criado_em: Date;

  @UpdateDateColumn()
  alterado_em: Date;

  @OneToMany(type => Lancamento, lancamento => lancamento.usuario)
  lancamentos: Lancamento[];
}

export default Usuario;