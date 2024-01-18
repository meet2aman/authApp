import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!, {
      //@ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;

    db.on("connected", () => {
      console.log("MongoDB connection established");
    });

    db.once("error", (err) => {
      console.log(
        "MongoDB connection not established. Make sure MongoDB is running." +
          err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting to Database");
    console.log(error);
  }
}
