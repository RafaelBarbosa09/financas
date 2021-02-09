import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}

export default Lancamento;