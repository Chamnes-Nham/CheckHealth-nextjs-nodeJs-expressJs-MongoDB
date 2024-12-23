import configs from "@/src/config";

const corsOptions = {
  origin: configs.frontendUrl,
  credentials: true, // Request includes credentials like cookies
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
};

export default corsOptions;
