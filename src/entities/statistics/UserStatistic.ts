import {
	Entity, 
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	Index,
	CreateDateColumn
} from "typeorm";
import {Statistic, User, Chat} from "../";

@Entity()
@Index(["user", "chat"], { unique: true })
export class UserStatistic extends Statistic {
	@PrimaryGeneratedColumn()
	public id: number;

	@OneToOne(() => User)
	@JoinColumn()
	public user: User;

	@OneToOne(() => Chat)
	@JoinColumn()
	public chat: Chat;

	@CreateDateColumn({ type: "timestamp" })
	public lastActivity: Date;
}
