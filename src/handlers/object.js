const Sequence = require("../sequence.js")

const SeqObjectHandler = {
	canHandle: x => typeof x === "object",
	createSequence: object_seq__create,
}
function object_seq__create(obj) {
	const newSeq = new Sequence()
	newSeq._obj = obj
	newSeq.getWalker = object_seq__getWalker.bind(newSeq)
	return newSeq
}
function object_seq__getWalker() {
	let i = -1
	let keys = Object.keys(this._obj)
	return {
		step: () => ++i < keys.length,
		value: () => ({ key: keys[i], value: this._obj[keys[i]]}),
		key: () => keys[i],
		index: () => i,
		isFirst: () => i == 0,
	}
}

Object[Sequence.EJECTOR] = function object_seq__ejector(seqX) {
	const result = {};
	const walker = seqX.getWalker()
	while (walker.step()) {
		const kvp = walker.value()
		if (typeof kvp === "array" && kvp.length === 2) {
			result[kvp[0]] = kvp[1]
		}
		else if (typeof kvp === "object" && ((typeof kvp.key === "string") || (typeof kvp.key === "symbol")) && "value" in kvp) {
			if ("value" in kvp) {
				result[kvp.key] = kvp.value
			}
		}
		else if (typeof kvp === "object" && Object.keys(kvp).length === 1) {
			result[Object.keys(kvp)[0]] = kvp[Object.keys(kvp)[0]]
		}
		else {
			result[walker.index()] = walker.value()
		}
	}
	return result;
}

module.exports = SeqObjectHandler