const Seq = require("../seq.js")

const SeqStringHandler = {
	canHandle: x => (typeof x === "string" || (typeof x === "object" && x instanceof String)),
	createSeq: SeqString_create,
}
function SeqString_create(str) {
	const newSeq = Seq.create()
	newSeq._str = str
	newSeq.getWalker = () => SeqString_getWalker(newSeq)
	return newSeq
}
function SeqString_getWalker(that) {
	let i = -1;
	return {
		step: () => ++i < that._str.length,
		value: () => that._str.charAt(i),
		index: () => i,
		isFirst: () => i == 0,
	};
}
String[Seq.EJECTOR] = seqX => seqX.eject(Array).join("")

module.exports = SeqStringHandler