import app from "@/src/app";
import configs from "@/src/config";

async function run() {
  try {
    app.listen(configs.port, () => {
      console.log("Proxy service is running on port", configs.port);
    });
  } catch (error) {
    console.error("failed to start Auth service", error);
    process.exit(1); // Exit with failure code
  }
}

run();
