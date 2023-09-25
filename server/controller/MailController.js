import Email from "../model/EmailSchema.js";
import User from "../model/UserSchema.js";

export const getSentMail = () => {};
export const getArchiveMail = () => {};
export const getDeletedMail = () => {};
export const getStarredMail = () => {};

export const getAllMailsOfUser = async (req, res) => {
	try {
		const mails = await User.findById(req.user._id).populate("mails");
		for (const mail of mails.mails) {
			// console.log(mail);
			await mail.populate("to", "-password -mails");
			await mail.populate("from", "-password -mails");
		}
		res.status(201).json({ mails });
	} catch (error) {
		res.status(404).json(error);
	}
};

export const getAllMail = async (req, res) => {
	try {
		const users = await Email.find();
		res.status(201).json({ users });
	} catch (error) {
		res.status(404).json({ error });
	}
};

export const addNewMail = async (req, res) => {
	const { email } = req.user;
	const { to, subject, body } = req.body;

	if (!to || !subject || !body) {
		return res.status(401).json({ message: "Invalid Details" });
	}

	try {
		const sender = await User.findOne({ email });
		const receiver = await User.findOne({ email: to });

		if (!sender) {
			return res.status(201).json({ success: false });
		}

		const sentMail = new Email({
			to: receiver ? receiver._id : to, // Use receiver's _id if available, otherwise use 'to'
			from: sender._id, // Set from as the _id of the sender
			body,
			subject,
			type: "sent",
		});

		const receMail = new Email({
			to: receiver ? receiver._id : to, // Use receiver's _id if available, otherwise use 'to'
			from: sender._id, // Set from as the _id of the sender
			body,
			subject,
			type: "received",
		});

		if (receiver) await receiver.mails.push(receMail);
		await receiver.save();

		sender.mails.push(sentMail);
		await sender.save();

		await sentMail.save();
		await receMail.save();

		return res.status(201).json({ success: true });
	} catch (error) {
		return res.status(500).json({ Error: error.message, success: false });
	}
};

export const changeMailType = async (req, res) => {
	const { type, id } = req.params;
	try {
		const mail = await Email.findByIdAndUpdate(
			id,{ type: type }
		);
		// if(mail.type === type) mail.type = 'inbox';
		// else mail.type = type;
		// await mail.save(;)
		if(mail) return res
			.status(201)
			.json({ success: true, message: `Mail status changed`, mail });
		else return res.status(404).json({ success : false, message : 'Mail not found' });
	} catch (error) {
		return res.status(501).json({ success : false, message : error});
	}
};
