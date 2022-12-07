export class UnitFormatter {
	constructor(private readonly ceilPrecision: number = 1) {
		this.ceilPrecision = Math.max(1, this.ceilPrecision) * 10;
	}
	public formatNumber(number: number): string {
		let units = ["", "k", "m", "b", "t", "q", "q+"];
		let degree = 0;
		for (let i = 3; Math.abs(number) >= 10**i; i += 3)
			degree = i;

		number = ~~((number / 10**degree) * this.ceilPrecision) / this.ceilPrecision;
		return `${number}${units[Math.min(~~(degree / 3), 6)]}`;
	}
}
