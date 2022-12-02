import {MessageAnalyzer} from "../src/app/MessageAnalyzer";
const msgAnalyzer = new MessageAnalyzer();

test("should correctly count words count", () => {
	let text = `
		We're no strangers to love. 
		You know the rules and    so do I.
		Never gonna give you up.
	`;

	let result = msgAnalyzer.calculate(text);

	expect(result.words).toBe(18);
});
