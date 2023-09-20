import mongoose from "mongoose";

const schema = new mongoose.Schema({
	to: {
		type: mongoose.Schema.Types.Mixed, // Accepts both ObjectId and string
		required: true,
	},
	from: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	subject: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		enum: ["sent", "received", "archive", "deleted", "starred"],
		required: true,
	},
});

const Email = mongoose.model("email", schema);

export default Email;
