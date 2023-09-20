import mongoose from "mongoose";

export const connect = () => {
  mongoose
    .connect(process.env.DATA_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to database EmailSite"))
    .catch((err) => console.error("Error:", err));
};
