const seq = require("../../src/seq.js")

const tests = {
	"it should gracefully 'count' null": (assert) => {
		const x = {}
		assert.equal(0, seq(null).count())
		assert.equal(0, seq(x.missingValue).count())
		assert.equal(0, seq(undefined).count())
		assert.equal(0, seq(1/0).count())
		assert.equal(0, seq(Infinity).count())
		assert.equal(0, seq(-Infinity).count())
		assert.equal(0, seq(NaN).count())
	},
	"it should count arrays": (assert) => {
		assert.equal(5, seq([8, "h", 5, 7, 5]).count())
		assert.equal(1, seq([5]).count())
		assert.equal(1, seq([null]).count())
		assert.equal(0, seq([]).count())
	},
	"it should count strings": (assert) => {
		assert.equal(5, seq("brent").count())
		assert.equal(1, seq("j").count())
		assert.equal(1, seq("\0").count())
		assert.equal(0, seq("").count())
	},
	"it should count objects": (assert) => {
		assert.equal(5, seq({name: "", id: 7, tiny: 1, grande: 6758, alias: "007"}).count())
		assert.equal(1, seq({name: "brent"}).count())
		assert.equal(1, seq({id: 1}).count())
		assert.equal(0, seq({}).count())
	},
}

module.exports = tests