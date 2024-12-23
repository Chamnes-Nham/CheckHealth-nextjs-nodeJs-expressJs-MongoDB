import app from "@/src/app";
import configs from "@/src/config";
import connectToDatabase from "./database/connection";

async function run() {
  try {
    await connectToDatabase();
    app.listen(configs.port, () => {
      console.log(`User Service running on Port: ${configs.port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
}

run();
