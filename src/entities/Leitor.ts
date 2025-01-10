import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity('Leitor') // Nome da tabela no banco de dados
class Leitor {
    @PrimaryGeneratedColumn() // Define a chave primária, gerada automaticamente
    id: number;

    @Column() // Coluna do banco para o nome do leitor
    name: string;

    @Column() // Coluna para o e-mail do leitor
    email: string;

    @Column() // Coluna para o número de telefone do leitor
    phone_number: string;

    @Column('date') // Coluna para a data de nascimento
    birthdate: Date;

    @Column('text') // Coluna para o endereço do leitor
    address: string;

    @Column({ default: true }) // Coluna booleana para indicar se o leitor está ativo
    active: boolean;

    @CreateDateColumn({ type: 'timestamp' }) // Data de criação do registro
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' }) // Data de última atualização
    updated_at: Date;
}

export default Leitor;
