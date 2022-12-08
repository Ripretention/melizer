import {StatisticFormatter, UnitFormatter} from "../src/formatters";
import {IAttachmentStatistic} from "../src/types/IAttachmentStatistic";
import {IMessageStatistic} from "../src/types/IMessageStatistic";
const getEmojiRegex = require("emoji-regex");
const emojiRegex = getEmojiRegex();

const normalizeForTesting = (str: string) => str
	.replace(/\s/g, "")
	.replace(emojiRegex, "")
	.normalize()
	.trim();
const statisticFormatter = new StatisticFormatter(new UnitFormatter());
test("should return correct message statistic", () => {
	let statistic: IMessageStatistic = {
		messages: 213321,
		emojis: 12,
		symbols: 432,
		words: 2
	};

	let formattedStatistic = statisticFormatter.formatMessageStatistic(statistic);

	expect(normalizeForTesting(formattedStatistic.text)).toBe(normalizeForTesting(`
		Messages: 213.3k
		Emojis: 12
		Symbols: 432
		Words: 2
	`));
});
test("should return correct attachment statistic", () => {
	let statistic: IAttachmentStatistic = {
		photos: 21,
		voices: 43121,
		stickers: 43,
		videos: 21,
		audios: 10000,
		documents: 10
	};

	let formattedStatistic = statisticFormatter.formatAttachmentStatistic(statistic);

	expect(normalizeForTesting(formattedStatistic.text)).toBe(normalizeForTesting(`
		Photos: 21
		Voices: 43.1k
		Stickers: 43
		Videos: 21
		Audios: 10k
		Documents: 10
	`));
});
