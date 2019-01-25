const seq = require("../../src/seq.js")

const tests = {
	'when an array is wrapped it should use the array sequence handler': (assert) => {
		assert.equal("bound array_seq__getWalker", seq([]).getWalker.name)
		assert.equal("bound array_seq__getWalker", seq([1, 2, 3]).getWalker.name)
	},
}

module.exports = tests