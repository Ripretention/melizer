import {TgMessageBuilder} from "tg-io";
import {IMessageStatistic} from "./types/IMessageStatistic";

export class StatisticFormatter {
	public format(stat: IMessageStatistic) {
		return this.formatMessageStatistic(stat);
	}
	public formatMessageStatistic(stat: IMessageStatistic) {
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
