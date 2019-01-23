const assert = {
	equal: (expected, actual) => {
		if (expected !== actual) {
			throw new Error(`expected: ${expected}, but got: ${actual}`)
		}
	},
	arrayEqual: (expected, actual) => {
		assert.equal(expected.join(), actual.join())
	},
}

module.exports = assert