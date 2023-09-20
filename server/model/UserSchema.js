import mongoose from "mongoose";

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		default: "TS",
	},
	mails: [{ type: mongoose.Schema.Types.ObjectId, ref: "email" }]
});

const User = mongoose.model("User", schema);

export default User;
