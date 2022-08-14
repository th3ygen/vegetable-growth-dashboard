const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	plantTypes: [
		{
			label: String,
			short: String,
			color: String,
		},
	],
});

const SysConf = mongoose.model("SysConf", schema);

module.exports = {
	SysConf,
};
