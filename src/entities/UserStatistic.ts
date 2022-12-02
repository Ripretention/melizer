import {
	Entity, 
	JoinColumn,
	Column, 
	OneToOne,
	PrimaryGeneratedColumn,
	Index,
	ColumnTypeUndefinedError
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

	@Column({ default: 0 })
	public messages: number;
	@Column({ default: 0 })
	public words: number;
	@Column({ default: 0 })
	public emojis: number;
	@Column({ default: 0 })
	public symbols: number;
}
