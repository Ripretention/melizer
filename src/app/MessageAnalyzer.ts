const getEmojiRegex = require("emoji-regex");

const emojiRegex = getEmojiRegex();
export class MessageAnalyzer {
	public calculate(text: string) {
		text = text.normalize().trim();

		return {
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
