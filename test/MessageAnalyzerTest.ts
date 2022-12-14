import {MessageAnalyzer} from "../src/app/MessageAnalyzer";
const msgAnalyzer = new MessageAnalyzer();

test("should correctly count words", () => {
	let text = `
		We're no strangers to love. 
		You know the rules and    so do I.
		Never gonna give you up.
	`;

	let result = msgAnalyzer.analyze(text);

	expect(result.words).toBe(18);
});
test("should correctly count emojis", () => {
	let text = ":) lol π½  π€  π  π§πΏ message 32  η°ι«ε­ ΠΊΡ.  π   π―";

	let result = msgAnalyzer.analyze(text);
	
	expect(result.emojis).toBe(6);
});
test("should correctly count symbols", () => {
	let text = `
		hello  , there  π½  π€  π is some symbols
	`;

	let result = msgAnalyzer.analyze(text);

	expect(result.symbols).toBe(24);
});
