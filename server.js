const { default: mongoose } = require("mongoose");
const app = require("./app");

const DB_URI = process.env.DB_URI;

const startServer = async () => {
  try {
    await mongoose.connect(DB_URI);
    app.listen(3000, () => console.log("Database connection successful"));

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
