import {JoinTable, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User, Chat, StatisticSnapshot} from "../";

export class UserStatisticSnapshot extends StatisticSnapshot {
	@PrimaryGeneratedColumn()
	public id: number;

	@OneToOne(() => User)
	@JoinTable()
	public user: User;
	@OneToOne(() => Chat)
	@JoinTable()
	public chat: Chat;
}
