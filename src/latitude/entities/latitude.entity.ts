import Contact from "src/contacts/entities/contact.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Latitude {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Contact, {nullable: false,  cascade: true, onDelete: 'CASCADE'})
    @JoinColumn()
    contact: Contact;

    @Column()
    latitude: string;
}
