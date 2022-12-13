import {
	Entity, 
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn
} from "typeorm";
import {StatisticSnapshot} from "./";
import {User, Chat} from "../";

@Entity()
export class UserStatisticSnapshot extends StatisticSnapshot {
	@PrimaryGeneratedColumn()
	public id: number;

	@OneToOne(() => User)
	@JoinColumn()
	public user: User;
	@OneToOne(() => Chat)
	@JoinColumn()
	public chat: Chat;
}
