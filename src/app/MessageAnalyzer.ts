import {IMessageStatistic} from "../types/IMessageStatistic";

const getEmojiRegex = require("emoji-regex");

const emojiRegex = getEmojiRegex();
export class MessageAnalyzer {
	public analyze(text: string): IMessageStatistic {
		text = text?.normalize()?.trim() ?? "";

		return {
			messages: 1,
			emojis: text.match(emojiRegex)?.length ?? 0,
			symbols: text
				.replace(/\s/g, "")
				.replace(emojiRegex, "")
				.length,
			words: text
				.replace(/ {2,}/g, " ")
				.split(/\s/)
				.filter(w => w != "")
				.length
		};
	}
}
