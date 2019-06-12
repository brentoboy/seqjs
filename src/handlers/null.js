const Seq = require("../seq.js")

const singleton = Seq.create();

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
	createSeq: () => singleton,
}

module.exports = SeqNullHandler
