import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Usuario from "./Usuario";

@Entity('lancamento')
class Lancamento {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @Column('date')
  data: Date;

  @Column()
  valor: number;

  @Column()
  tipo: string

  //erro
  @Column()
  usuario_id: string

  @JoinColumn({ name: 'usuario_id' })
  @ManyToOne(type => Usuario, usuario => usuario.lancamentos)
  usuario: Usuario
}

export default Lancamento;