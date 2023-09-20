import User from "../model/UserSchema.js";
import bcrypt from "bcrypt";
import { genrateToken } from "../middleware/GenrateToken.js";

export const getAllUser = async (req, res) => {
	try {
		const users = await User.find();
		res.status(201).json({ users });
	} catch (error) {
		res.status(404).json({ error });
	}
};



export const registerUser = async (req, res) => {
	try {
		const { name, email, password, image } = req.body;
		if (!name || !email || !password || !image)
			return res.status(401).json({ message: "Missing Details" });
		const userExists = await User.findOne({ email });
		if (userExists) return res.send("Already Registerd");
		const hashedPass = bcrypt.hashSync(password, 10);
		const user = await User.create({
			name,
			email,
			password: hashedPass,
			image,
		});
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			image: user.image,
			token: genrateToken(user._id),
		});
	} catch (error) {
		res.send(error);
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) return res.send("Enter valid details");
		const user = await User.findOne({ email });
		if (!user) return res.send("User not found");
		const isMatch = bcrypt.compareSync(password, user.password);
		if (isMatch) {
			return res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				image: user.image,
				token: genrateToken(user._id),
			});
		}
	} catch (error) {
		res.send("Internal Server Error");
	}
};
