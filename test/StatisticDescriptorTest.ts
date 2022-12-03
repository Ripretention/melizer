import {StatisticDescriptor} from "../src/app/StatisticDescriptor"
import {IMessageStatistic} from "../src/types/IMessageStatistic";

const normalizeForTesting = (str: string) => str.replace(/\s/g, "").normalize().trim();
const statisticDescriptor = new StatisticDescriptor();
test("should return correct statistic", () => {
	let statistic: IMessageStatistic = {
		emojis: 12,
		messages: 213321,
		symbols: 432,
		words: 2
	};

	let formattedStatistic = statisticDescriptor.createMessageStatisticDescription(statistic);

	expect(normalizeForTesting(formattedStatistic.text)).toBe(normalizeForTesting(`
		Messages: 213321
		Emojis: 12
		Symbols: 432
		Words: 2
	`));
});
