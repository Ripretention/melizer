import {
	Entity, 
	JoinColumn,
	Column, 
	OneToOne,
	PrimaryGeneratedColumn,
	Index
} from "typeorm";
import {Chat} from "./Chat";
import {User} from "./User";

@Entity()
@Index(["user", "chat"], { unique: true })
export class UserStatistic {
	@PrimaryGeneratedColumn()
	public id: number;

	@OneToOne(() => User)
	@JoinColumn()
	public user: User;

	@OneToOne(() => Chat)
	@JoinColumn()
	public chat: Chat;
}
