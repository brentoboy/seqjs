const seq = require("../../src/seq.js")

const tests = {
	"it should eject arrays": (assert) => {
		assert.arrayEqual(['h', 'i'], seq("hi").eject(Array))
		assert.arrayEqual([1, 2, 3], seq([1, 2, 3]).eject(Array))
	},
	"it should eject strings": (assert) => {
		assert.equal("hello", seq("hello").eject(String))
		assert.equal("hi", seq(['h', 'i']).eject(String))
		assert.equal("", seq([]).eject(String))
		assert.equal("", seq(null).eject(String))
	},
	"it should eject objects": (assert) => {
		assert.equal("{\"id\":1}", JSON.stringify(seq({id:1}).eject(Object)))
		assert.equal("{\"0\":2}", JSON.stringify(seq([2]).eject(Object)))
		assert.equal("{\"0\":\"h\",\"1\":\"i\"}", JSON.stringify(seq("hi").eject(Object)))
	},
}

module.exports = tests