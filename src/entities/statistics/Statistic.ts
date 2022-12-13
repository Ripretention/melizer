import {
	Entity, 
	Column
} from "typeorm";
import {IAttachmentStatistic} from "../../types/IAttachmentStatistic";
import {IMessageStatistic} from "../../types/IMessageStatistic";

@Entity()
export class Statistic implements IMessageStatistic, IAttachmentStatistic {
	@Column({ default: 0 })
	public messages: number;
	@Column({ default: 0 })
	public words: number;
	@Column({ default: 0 })
	public emojis: number;
	@Column({ default: 0 })
	public symbols: number;

	@Column({ default: 0 })
	public photos: number;
	@Column({ default: 0 })
	public audios: number;
	@Column({ default: 0 })
	public stickers: number;
	@Column({ default: 0 })
	public voices: number;
	@Column({ default: 0 })
	public videos: number;
	@Column({ default: 0 })
	public documents: number;
}

