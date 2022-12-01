import {MessageCalculator} from "../src/app/MessageCalculator";
const msgCalculator = new MessageCalculator();

test("should correctly count words count", () => {
	let text = `
		We're no strangers to love. 
		You know the rules and    so do I.
		Never gonna give you up.
	`;

	let result = msgCalculator.calculate(text);

	expect(result.words).toBe(18);
});
