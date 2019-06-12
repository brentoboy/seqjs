const Seq = require("../seq.js")

const SeqObjectHandler = {
	canHandle: x => typeof x === "object",
	createSeq: SeqObject_create,
}
function SeqObject_create(obj) {
	const newSeq = Seq.create()
	newSeq.getWalker = () => SeqObject_getWalker(obj)
	return newSeq
}
function SeqObject_getWalker(obj) {
	let i = -1
	let keys = Object.keys(obj)
	return {
		step: () => ++i < keys.length,
		value: () => [ keys[i], obj[keys[i]] ],
		key: () => keys[i],
		index: () => i,
		isFirst: () => i == 0,
	}
}

Object[Seq.EJECTOR] = function SeqObject_ejector(seqX) {
	const result = {};
	const walker = seqX.getWalker()
	while (walker.step()) {
		const kvp = walker.value()
		if (Array.isArray(kvp) && kvp.length === 2) {
			result[kvp[0]] = kvp[1]
		}
		else {
			result[walker.index()] = walker.value()
		}
	}
	return result;
}

module.exports = SeqObjectHandler