import {StatisticFormatter, UnitFormatter} from "../src/formatters";
import {IMessageStatistic} from "../src/types/IMessageStatistic";
const getEmojiRegex = require("emoji-regex");
const emojiRegex = getEmojiRegex();

const normalizeForTesting = (str: string) => str
	.replace(/\s/g, "")
	.replace(emojiRegex, "")
	.normalize()
	.trim();
const statisticFormatter = new StatisticFormatter(new UnitFormatter());
test("should return correct statistic", () => {
	let statistic: IMessageStatistic = {
		emojis: 12,
		messages: 213321,
		symbols: 432,
		words: 2
	};

	let formattedStatistic = statisticFormatter.format(statistic);

	expect(normalizeForTesting(formattedStatistic.text)).toBe(normalizeForTesting(`
		Messages: 213.3k
		Emojis: 12
		Symbols: 432
		Words: 2
	`));
});
