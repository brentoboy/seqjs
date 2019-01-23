const Sequence = require("../sequence.js")

const SeqStringHandler = {
	canHandle: x => (typeof x === "string" || (typeof x === "object" && x instanceof String)),
	createSequence: string_seq__create,
}
function string_seq__create(str) {
	const newSeq = new Sequence()
	newSeq._str = str
	newSeq.getWalker = string_seq__getWalker.bind(newSeq)
	return newSeq
}
function string_seq__getWalker() {
	let i = -1;
	return {
		step: () => ++i < this._str.length,
		value: () => this._str.charAt(i),
		index: () => i,
		isFirst: () => i == 0,
	};
}
String[Sequence.EJECTOR] = seqX => seqX.eject(Array).join("")

module.exports = SeqStringHandler