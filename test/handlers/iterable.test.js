const seq = require("../../src/seq.js")

const tests = {
	"it should wrap iterables": (assert) => {
		let range = { from: 1, to: 5}
		// make it iterable
		range[Symbol.iterator] = function() {
			return {
				current: this.from,
				last: this.to,
				next: () => {
					if (this.current <= this.last) {
						return { done: false, value: this.current++ };
					} else {
					return { done: true };
					}
				}
			}
		}
		
		let x = seq(range);
	}
// I dont like this test being here... not sure where to put it.
// 	"it should be iterable": (assert) => {
// 		let sq = seq("brent")
// 		for (let ch of sq) {
// 			assert.equal("b", ch)
// 			break;
// 		}
// 		assert.arrayEqual(['b', 'r', 'e', 'n', 't'], [...sq])
// 	}
}

module.exports = tests