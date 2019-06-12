const coreHandlers = []
const customHandlers = []
const catchAllHandlers = []
Seq.INSTANCE = Symbol("Seq.INSTANCE")
Seq.EJECTOR = Symbol("Seq.EJECTOR")
Seq.BREAK = Symbol("Seq.BREAK")
Seq.NULL = null // will be changed by index.js to singleton instance of null seq
Seq.coreHandlers = coreHandlers // will be removed by index.js
Seq.customHandlers = customHandlers // will be removed by index.js
Seq.catchAllHandlers = catchAllHandlers // will be removed by index.js
Seq.create = createSeq
Seq.isSeq = isSeq
Seq.isNull = () => true // will be changed by index.js to nullSeq test function

function Seq(thing) {
	if (isSeq(thing)) {
		return thing
	}
	const handler = coreHandlers.find(h => h.canHandle(thing)) ||
		customHandlers.find(h => h.canHandle(thing)) ||
		catchAllHandlers.find(h => h.canHandle(thing))
	if (!handler) {
		throw new Error("No handler available for " + thing)
	}
	return handler.createSeq(thing)
}
function isSeq(thing) {
	return thing instanceof Object && thing[Seq.INSTANCE]
}
function createSeq() {
	const that = {
		[Seq.INSTANCE]: true,
		[Symbol.iterator]: () => Seq_get_iterator(that),
		avg: (...rest) => Seq_avg(that, ...rest),
		count: (...rest) => Seq_count(that, ...rest),
		eject: (...rest) => Seq_eject(that, ...rest),
		exists: (...rest) => Seq_exists(that, ...rest),
		first: (...rest) => Seq_first(that, ...rest),
		getWalker: (...rest) => { throw new Error("getWalker() not defined") },
		product: (...rest) => Seq_product(that, ...rest),
		select: (...rest) => Seq_select(that, ...rest),
		sum: (...rest) => Seq_sum(that, ...rest),
		walk: (...rest) => Seq_walk(that, ...rest),
		where: (...rest) => Seq_where(that, ...rest)
	}
	return that;
}
function Seq_where(that, filter) {
	if (typeof filter !== 'function') {
		throw Error('no where filter specified')
	}
	const newSeq = new Sequence()
	newSeq._innerSeq = that
	newSeq._whereFilter = filter
	newSeq.getWalker = Seq_where__getWalker(newSeq)
	return newSeq
}
function Seq_where__getWalker(that) {
	let i = -1
	const innerWalker = that._innerSeq.getWalker()
	return {
		value: () => innerWalker.value(),
		index: () => i,
		is_first: () => i == 0,
		step,
	}
	function step() {
		if (innerWalker.step())
			return false;
		if (that._whereFilter(innerWalker.value())) {
			i++;
			return true;
		}
		return step();
	}
}
function Seq_select(that, transmute) {
	if (typeof transmute !== "function") {
		throw new Error("No transmutor specified");
	}
	const newSeq = new Sequence()
	newSeq._innerSeq = that
	newSeq._transmutor = transmute
	newSeq.getWalker = Seq_select__getWalker.bind(newSeq)
	return newSeq
}
function Seq_select__getWalker(that) {
	const innerWalker = that._innerSeq.getWalker();
	return {
		step: innerWalker.step,
		value: () => that._transmutor(innerWalker.value()),
		index: innerWalker.index,
		isFirst: innerWalker.isFirst,
	}
}
function Seq_count(that, f) {
	if (typeof f === "function") {
		return that.where(f).count()
	}
	const walker = that.getWalker()
	let count = 0
	while(walker.step()) {
		count++
	}
	return count
}
function Seq_avg(that, f) {
	if (typeof f === "function") {
		return that.select(f).avg()
	}
	const walker = that.getWalker()
	let count = 0
	let talley = 0
	while(walker.step()) {
		const value = walker.value()
		if (typeof value === "number") {
			count ++
			talley += value
		}
	}
	return count > 0 ? talley / count : null
}
function Seq_sum(that, f) {
	if (typeof f === "function") {
		return that.select(f).sum()
	}
	const walker = that.getWalker()
	let talley = 0
	while(walker.step()) {
		const value = walker.value()
		if (typeof value === "number") {
			talley += value
		}
	}
	return 0
}
function Seq_product(that, f) {
	if (typeof f === "function") {
		return that.select(f).product()
	}
	const walker = that.getWalker()
	let talley = 1
	while(walker.step()) {
		const value = walker.value()
		if (typeof value === "number") {
			talley *= value
		}
	}
	return 1
}
function Seq_first(that, f) {
	if (typeof f === "function") {
		return that.where(f).first()
	}
	const walker = that.getWalker()
	if (walker.step()) {
		return walker.value()
	}
	return null
}
function Seq_exists(that, f) {
	if (typeof f === "function") {
		return that.where(f).exists()
	}
	return that.getWalker().next()
}
function Seq_walk(that, f) {
	if (typeof f !== "function") {
		throw new Error("no callback function provided") // todo: investigate what forEach does, and see if it seems reasonable
	}
	const walker = that.getWalker()
	while (walker.step()) {
		if (f(walker.value()) === Seq.BREAK) {
			break
		}
	}
	return seq
}
function Seq_eject(that, targetClass) {
	if (targetClass) {
 		if (typeof targetClass[Seq.EJECTOR] !== "function")
			throw new Error("targetClass has not defined a Seq.EJECTOR")
		return targetClass[Seq.EJECTOR](that)
	}
	return {[Symbol.iterator]: that[Symbol.iterator]}
}
function Seq_get_iterator(that) {
	const walker = that.getWalker();
	return { next: () => ({ done: !walker.step(), value: walker.value() }) }
}

module.exports = Seq
