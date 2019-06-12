const Seq = require("./seq.js")
const SeqNullHandler = require("./handlers/null.js")
const SeqArrayHandler = require("./handlers/array.js")
const SeqStringHandler = require("./handlers/string.js")
const SeqIterableHandler = require("./handlers/iterable.js")
const SeqObjectHandler = require("./handlers/object.js")

Seq.NULL = SeqNullHandler.createSeq()
Seq.isNull = SeqNullHandler.canHandle
Seq.registerHandler = Seq_registerHandler
Seq.unregisterHandler = Seq_unregisterHandler

const coreHandlers = Seq.coreHandlers
delete Seq.coreHandlers
coreHandlers.push(SeqNullHandler)
coreHandlers.push(SeqArrayHandler)
coreHandlers.push(SeqStringHandler)

const catchAllHandlers = Seq.catchAllHandlers
delete Seq.catchAllHandlers
catchAllHandlers.push(SeqIterableHandler)
catchAllHandlers.push(SeqObjectHandler)

const customHandlers = Seq.customHandlers
delete Seq.customHandlers

function Seq_registerHandler(x) { 
	if (typeof x !== "object" || typeof x.getWalker !== "function" || typeof x.canHandle !== "function") {
		throw new Error("a Seq handler should be an object with a 'getWalker' function and a 'canHandle' function")
	}
	Seq.unregisterHandler(x)
	customHandlers.push(x)
}
function Seq_unregisterHandler(x) {
	const idx = customHandlers.indexOf(x)
	if (idx !== -1) {
		customHandlers.splice(idx, 1)
	}
}

module.exports = Seq
