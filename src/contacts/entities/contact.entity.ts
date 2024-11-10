
import User from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export default class Contact {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;

    @Column()
    last_name: string;

    @Column()
    phone_number: string;

    @ManyToOne(() => User, (user) => user.contacts, {nullable: false})
    user: User;

    @Column()
    picture_uri: string;

}
