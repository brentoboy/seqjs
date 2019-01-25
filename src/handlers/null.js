const Sequence = require("../sequence.js")

const singleton = new Sequence()
singleton.getWalker = function null_seq__getWalker() { 
	return {
		step: return_null,
		value: return_null,
		index: return_null,
		isFirst: return_null,
	}
}
function return_null() {
	return null
}
const SeqNullHandler = {
	canHandle: x => (x === undefined || x === null || x === Infinity || x === -Infinity || /* isNaN */ x !== x),
	createSequence: () => singleton,
}

module.exports = SeqNullHandler