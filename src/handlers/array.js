const Sequence = require("../sequence.js")

const SeqArrayHandler = {
	canHandle: Array.isArray,
	createSequence: array_seq__create,
}
function array_seq__create(list) {
	const newSeq = new Sequence()
	newSeq._list = list
	newSeq.getWalker = array_seq__getWalker.bind(newSeq)
	return newSeq
}
function array_seq__getWalker() {
	let i = -1
	return {
		value: () => this._list[i],
		index: () => i,
		isFirst: () => i == 0,
		step: () => ++i < this._list.length
	}
}
Array[Sequence.EJECTOR] = seqX => [...seqX]

module.exports = SeqArrayHandler