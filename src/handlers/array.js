const Seq = require("../seq.js")

const SeqArrayHandler = {
	canHandle: Array.isArray,
	createSeq: SeqArray_create,
}
function SeqArray_create(list) {
	const newSeq = Seq.create()
	newSeq._list = list
	newSeq.getWalker = () => SeqArray_getWalker(newSeq)
	return newSeq
}
function SeqArray_getWalker(that) {
	let i = -1
	return {
		value: () => that._list[i],
		index: () => i,
		isFirst: () => i == 0,
		step: () => ++i < that._list.length
	}
}
Array[Seq.EJECTOR] = seqX => [...seqX]

module.exports = SeqArrayHandler