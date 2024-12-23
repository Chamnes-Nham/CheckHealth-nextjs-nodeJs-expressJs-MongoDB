import app from "@/src/app";
import configs from "@/src/config";

async function run() {
  try {
    // port
    app.listen(configs.port, () => {
      console.log(`Auth serivce is running on port: `, configs.port);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

run();
