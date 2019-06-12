const Seq = require("../seq.js")

const SeqIterableHandler = {
	canHandle: x => typeof x[Symbol.iterator] === "function",
	createSeq: SeqIterable_create,
}
function SeqIterable_create(iterable) {
	const newSeq = Seq.create()
	newSeq._iterable = iterable
	newSeq.getWalker = () => SeqIterable_getWalker(newSeq)
	return newSeq
}
function SeqIterable_getWalker(that) {
	let i = -1
	let node = null
	let itr = that._iterable[Symbol.iterator]()
	return {
		step: () => { node = itr.next(); i++; return !node.done; },
		value: () => node && node.value,
		index: () => i,
		isFirst: () => i == 0,
	}
}

module.exports = SeqIterableHandler