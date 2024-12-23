import app from "./app";
import configs from "./config";

import connectToDatabase from "./database/connection";

async function run() {
  try {
    await connectToDatabase();

    const server = app.listen(configs.port, () => {
      console.log(`Server running on http://localhost:`, configs.port);
    });

    server.on("error", (error: NodeJS.ErrnoException) => {
      if (error.code === "EADDRINUSE") {
        console.error(
          `Port ${configs.port} is already in use. Please use a different port.`
        );
        process.exit(1);
      }
    });
  } catch (error) {
    console.error(
      `Failed to start the server: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    process.exit(1);
  }
}

run();
