const seq = require("../../src/seq.js")

const tests = {
	"it should gracefully 'avg' null": (assert) => {
		const x = {}
		assert.equal(null, seq(null).avg())
		assert.equal(null, seq(x.missingValue).avg())
		assert.equal(null, seq(undefined).avg())
		assert.equal(null, seq(1/0).avg())
		assert.equal(null, seq(Infinity).avg())
		assert.equal(null, seq(-Infinity).avg())
        assert.equal(null, seq(NaN).avg())
        assert.equal(null, seq([]).avg());
	},
    "it should avg lists of numbers nicely": (assert) => {
        assert.equal(0, seq([1, 0, -1]).avg())
        assert.equal(5, seq([4, 6]).avg())
        assert.equal(3.5, seq([1, 2, 3, 4, 5, 6]).avg())
        assert.equal(-1/3, seq([1, 0, -2]).avg())
    },
    "it should gracefully ignore non-numeric things": (assert) => {
        assert.equal(null, seq(["brent", "joseph"]).avg())
    }
}

module.exports = tests