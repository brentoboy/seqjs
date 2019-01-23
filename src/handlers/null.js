const Sequence = require("../sequence.js")

const singleton = new Sequence()
singleton.getWalker = () => ({
	step: () => null,
	value: () => null,
	index: () => null,
	isFirst: () => null,
})

const SeqNullHandler = {
	canHandle: x => (x === undefined || x === null || x === Infinity || x === -Infinity || /* isNaN */ x !== x),
	createSequence: () => singleton,
}

module.exports = SeqNullHandler