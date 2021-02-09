import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export default class CriarRelacionamentoUsuario1612841433870 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey('lancamento', new TableForeignKey({
            name: 'lancamentoHasUsuario',
            columnNames: ['usuario_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'usuario',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('lancamento', 'lancamentoHasUsuario');
    }

}
