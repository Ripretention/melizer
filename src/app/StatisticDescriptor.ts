import {TgMessageBuilder} from "tg-io";
import {IMessageStatistic} from "../types/IMessageStatistic";

export class StatisticDescriptor {
	public createDescription(stat: IMessageStatistic) {
		return this.createMessageStatisticDescription(stat);
	}
	public createMessageStatisticDescription(stat: IMessageStatistic) {
		return TgMessageBuilder.build(f => {
			let format = (n: number) => f.italic(n.toString());
			return `
				Messages: ${format(stat.messages)}
				Emojis: ${format(stat.emojis)}
				Symbols: ${format(stat.symbols)}
				Words: ${format(stat.words)}
			`;
		});
	}
}
