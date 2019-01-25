const seq = require("../../src/seq.js")

const tests = {
	'when a string is wrapped it should use the string sequence handler': (assert) => {
		assert.equal("bound string_seq__getWalker", seq("").getWalker.name)
		assert.equal("bound string_seq__getWalker", seq("brent").getWalker.name)
	},
}

module.exports = tests