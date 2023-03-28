const { default: mongoose } = require("mongoose");
const app = require("./app");
// const Contact = require("./models/contacts/contacts");

const DB_URI = process.env.DB_URI;

const startServer = async () => {
  try {
    await mongoose.connect(DB_URI);
    app.listen(3000, () => console.log("Database connection successful"));
    // const books = await Contact.find();
    // console.log(books);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
