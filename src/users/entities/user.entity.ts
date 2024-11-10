import Contact from "src/contacts/entities/contact.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    phoneNumber: string;

    @OneToMany(() => Contact, (contact) => contact.user)
    contacts: Contact[];

    @Column()
    profile_picture_uri: string;
    
}