const Sequence = require("./sequence.js")
const SeqNullHandler = require("./handlers/null.js")
const SeqArrayHandler = require("./handlers/array.js")
const SeqStringHandler = require("./handlers/string.js")
const SeqIterableHandler = require("./handlers/iterable.js")
const SeqObjectHandler = require("./handlers/object.js")

seq.Class = Sequence
seq.BREAK = Sequence.BREAK
seq.EJECTOR = Sequence.EJECTOR
seq.NULL = SeqNullHandler.createSequence()
seq.isNull = SeqNullHandler.canHandle
seq.registerHandler = seq_registerHandler
seq.unregisterHandler = seq_unregisterHandler

const coreHandlers = [
	SeqNullHandler,
	SeqArrayHandler,
	SeqStringHandler,
]

const customHandlers = []

const catchAllHandlers = [
	SeqIterableHandler,
	SeqObjectHandler,
]

function seq(thing) {
	if (thing instanceof Sequence) {
		return thing
	}
	const handler = coreHandlers.find(h => h.canHandle(thing)) ||
		customHandlers.find(h => h.canHandle(thing)) ||
		catchAllHandlers.find(h => h.canHandle(thing))
	if (!handler) {
		throw new Error("No handler available for " + thing)
	}
	return handler.createSequence(thing)
}
function seq_registerHandler(x) { 
	if (typeof x !== "object" || typeof x.getWalker !== "function" || typeof x.canHandle !== "function") 
		throw new Error("a Seq handler should be an object with a 'getWalker' function and a 'canHandle' function")

	Seq.unregisterHandler(x)
	customHandlers.push(x)
}
function seq_unregisterHandler(x) {
	const idx = customHandlers.indexOf(x)
	if (idx !== -1) {
		customHandlers.splice(idx, 1)
	}
}

module.exports = seq