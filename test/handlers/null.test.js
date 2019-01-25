const seq = require("../../src/seq.js")

const tests = {
	'when a non-value is wrapped it should use the null seq handler': (assert) => {
		const x = {}
		assert.equal("null_seq__getWalker", seq(null).getWalker.name)
		assert.equal("null_seq__getWalker", seq(x.missingValue).getWalker.name)
		assert.equal("null_seq__getWalker", seq(undefined).getWalker.name)
		assert.equal("null_seq__getWalker", seq(1/0).getWalker.name)
		assert.equal("null_seq__getWalker", seq(Infinity).getWalker.name)
		assert.equal("null_seq__getWalker", seq(-Infinity).getWalker.name)
		assert.equal("null_seq__getWalker", seq(NaN).getWalker.name)
	},
}

module.exports = tests