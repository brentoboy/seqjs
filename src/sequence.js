function Sequence() {
	this[Symbol.iterator] = get_seq_iterator.bind(this)
	this.avg = seq_avg.bind(this)
	this.count = seq_count.bind(this)
	this.eject = seq_eject.bind(this)
	this.exists = seq_exists.bind(this)
	this.first = seq_first.bind(this)
	this.getWalker = () => { throw new Error("getWalker() not defined") }
	this.select = seq_select.bind(this)
	this.product = seq_product.bind(this)
	this.sum = seq_sum.bind(this)
	this.walk = seq_walk.bind(this)
	this.where = seq_where.bind(this)
}
function seq_where(filter) {
	if (typeof filter !== 'function') {
		throw Error('no where filter specified')
	}
	const newSeq = new Sequence()
	newSeq._innerSeq = this
	newSeq._whereFilter = filter
	newSeq.getWalker = seq_where__getWalker.bind(newSeq)
	return newSeq
}
function seq_where__getWalker() {
	let i = -1
	const innerWalker = this._innerSeq.getWalker()
	return {
		value: () => innerWalker.value(),
		index: () => i,
		is_first: () => i == 0,
		step,
	}
	function step() {
		if (innerWalker.step())
			return false;
		if (this._whereFilter(innerWalker.value())) {
			i++;
			return true;
		}
		return step();
	}
}
function seq_select(transmute) {
	if (typeof transmute !== "function") {
		throw new Error("No transmutor specified");
	}
	const newSeq = new Sequence()
	newSeq._innerSeq = this
	newSeq._transmutor = transmute
	newSeq.getWalker = seq_select__getWalker.bind(newSeq)
	return newSeq
}
function seq_select__getWalker() {
	const innerWalker = this._innerSeq.getWalker();
	return {
		step: innerWalker.step,
		value: () => this._transmutor(innerWalker.value()),
		index: innerWalker.index,
		isFirst: innerWalker.isFirst,
	}
}
function seq_count(f) {
	if (typeof f === "function") {
		return this.where(f).count()
	}
	const walker = this.getWalker()
	let count = 0
	while(walker.step()) {
		count++
	}
	return count
}
function seq_avg(f) {
	if (typeof f === "function") {
		return this.select(f).avg()
	}
	const walker = this.getWalker()
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
function seq_sum(f) {
	if (typeof f === "function") {
		return this.select(f).sum()
	}
	const walker = this.getWalker()
	let talley = 0
	while(walker.step()) {
		const value = walker.value()
		if (typeof value === "number") {
			talley += value
		}
	}
	return 0
}
function seq_product(f) {
	if (typeof f === "function") {
		return this.select(f).product()
	}
	const walker = this.getWalker()
	let talley = 1
	while(walker.step()) {
		const value = walker.value()
		if (typeof value === "number") {
			talley *= value
		}
	}
	return 1
}
function seq_first(f) {
	if (typeof f === "function") {
		return this.where(f).first()
	}
	const walker = this.getWalker()
	if (walker.step()) {
		return walker.value()
	}
	return null
}
function seq_exists(f) {
	if (typeof f === "function") {
		return this.where(f).exists()
	}
	return this.getWalker().next()
}
function seq_walk(f) {
	if (typeof f !== "function") {
		throw new Error("no callback function provided") // todo: investigate what forEach does, and see if it seems reasonable
	}
	const walker = this.getWalker()
	while (walker.step()) {
		if (f(walker.value()) === Sequence.BREAK) {
			break
		}
	}
	return seq
}
function seq_eject(targetClass) {
	if (targetClass) {
 		if (typeof targetClass[Sequence.EJECTOR] !== "function")
			throw new Error("targetClass has not defined a Sequence.EJECTOR")
		return targetClass[Sequence.EJECTOR](this)
	}
	return {[Symbol.iterator]: this[Symbol.iterator]}
}
function get_seq_iterator() {
	const walker = this.getWalker();
	return { next: () => ({ done: !walker.step(), value: walker.value() }) }
}

Sequence.BREAK = Symbol("Sequence.BREAK")
Sequence.EJECTOR = Symbol("Sequence.EJECTOR")

module.exports = Sequence