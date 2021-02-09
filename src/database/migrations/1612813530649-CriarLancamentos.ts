import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CriarLancamentos1612813530649 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'lancamento',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'descricao',
                        type: 'varchar',
                    },
                    {
                        name: 'data',
                        type: 'date',
                    },
                    {
                        name: 'valor',
                        type: 'numeric',
                    },
                    {
                        name: 'tipo',
                        type: 'varchar',
                    },
                ]
            })
        );

        /*await queryRunner.createForeignKey('lancamento', new TableForeignKey({
            name: 'lancamentoHasUsuario',
            columnNames: ['usuario_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'usuario',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));*/
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('lancamento');
    }

}
