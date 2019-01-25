const seq = require("../src/seq.js")
const assert = require("./assert.js")

const tests = {
	'seq (create function)': {
		'when an existing seq is wrapped it should not re-wrap it': (assert) => {
			let x = seq(['test'])
			let y = seq(x)
			assert.equal(x, y)
		}
	},

	'Sequence.NullHandler': require("./handlers/null.test.js"),
	'Sequence.ArrayHandler': require("./handlers/array.test.js"),
	'Sequence.StringHandler': require("./handlers/string.test.js"),
	'Sequence.IterableHandler': require("./handlers/iterable.test.js"),
	'Sequence.ObjectHandler': require("./handlers/object.test.js"),

	'Sequence.walk()': require("./functions/walk.test.js"),
	'Sequence.select()': require("./functions/select.test.js"),
	'Sequence.where()': require("./functions/where.test.js"),

	'Sequence.exists()': require("./functions/exists.test.js"),
	'Sequence.count()': require("./functions/count.test.js"),
	'Sequence.avg()': require("./functions/avg.test.js"),
	'Sequence.sum()': require("./functions/sum.test.js"),
	'Sequence.product()': require("./functions/product.test.js"),

	'Sequence.first()': require("./functions/first.test.js"),
	'Sequence.eject()': require("./functions/eject.test.js"),
}

for (component_name in tests) {
	console.log(component_name)
	for (test_name in tests[component_name]) {
		try { 
			tests[component_name][test_name](assert)
			console.log(" [ . ] ", test_name, "...", "(pass)")
		}
		catch(ex) {
			console.log(" [ ! ] ", test_name, "...", "fail:", ex)
		}
	}
	if (Object.keys(tests[component_name]).length == 0) {
		console.log(" [ ! ] ", "fail:", "no tests!")
	}
}
