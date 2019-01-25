const seq = require("../../src/seq.js")

const tests = {
	'when an object is wrapped it should use the object sequence handler': (assert) => {
		assert.equal("bound object_seq__getWalker", seq({}).getWalker.name)
		assert.equal("bound object_seq__getWalker", seq({id: "123"}).getWalker.name)
	},
}

module.exports = tests