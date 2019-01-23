const Sequence = require("../sequence.js")

const SeqIterableHandler = {
	canHandle: x => typeof x[Symbol.iterator] === "function",
	createSequence: iterable_seq__create,
}
function iterable_seq__create(iterable) {
	const newSeq = new seq.Class()
	newSeq._iterable = iterable
	newSeq.getWalker = iterable_seq__getWalker.bind(newSeq)
	return newSeq
}
function iterable_seq__getWalker() {
	let i = -1
	let node = null
	let itr = this._iterable[Symbol.iterator]()
	return {
		step: () => { node = itr.next(); i++; return !node.done; },
		value: () => node && node.value,
		index: () => i,
		isFirst: () => i == 0,
	}
}

module.exports = SeqIterableHandler