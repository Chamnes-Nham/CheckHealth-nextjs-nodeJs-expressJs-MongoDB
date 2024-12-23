import app from "@/src/app";
import configs from "@/src/config";
import connectToDatabase from "./databases/connect";

function run() {
  connectToDatabase();
  app.listen(configs.port, () => {
    console.log(`User Service running on Port: ${configs.port}`);
  });
}

run();
