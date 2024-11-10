import Contact from "src/contacts/entities/contact.entity";
import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";

@Entity()
export default class Longitude {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Contact, { nullable: false,  cascade: true, onDelete: 'CASCADE' })
    @JoinColumn()
    contact: Contact;

    @Column()
    longitude: string;
}
