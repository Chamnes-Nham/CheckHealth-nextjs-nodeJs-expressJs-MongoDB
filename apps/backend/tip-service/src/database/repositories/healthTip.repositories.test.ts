// import mongoose from "mongoose";
// import { HealthTipRepository } from "../repositories/healthTip.repository";
// import { HealthTipModel } from "../models/healthTip.model";
// import { IHealthTip } from "@/src/interfaces/IhealthTip";

// beforeAll(async () => {
//   await mongoose.connect(
//     "mongodb+srv://checkme:WBfI7SnuB4XLD8d4@clustercheckme.fbljtcs.mongodb.net/HealthTips?retryWrites=true&w=majority&appName=ClusterCheckme"
//   );
//   console.log("Connected to MongoDB");
// }, 60000);

// afterAll(async () => {
//   await mongoose.disconnect();
//   console.log("Disconnected from MongoDB");
// }, 60000);

// describe("HealthTipRepository", () => {
//   const healthTipRepository = new HealthTipRepository();

//   it("should create a new health tip and return it", async () => {
//     const requestBody: IHealthTip = {
//       img: "image-url",
//       title: "Health Tip Title",
//       subtitle: "Health Tip Subtitle",
//       description: "Health Tip Description",
//       detail: "Health Tip Detail",
//       category: "General",
//     };
//     const createdHealthTip = await healthTipRepository.createHealthTip(requestBody);
//     expect(createdHealthTip.title).toEqual("Health Tip Title");
//   }, 60000);

//   it("should throw an error if HealthTipModel.create fails", async () => {
//     const invalidHealthTipData: IHealthTip = {
//       img: "image-url",
//       title: "",
//       subtitle: "Invalid Subtitle",
//       description: "Invalid Description",
//       detail: "Invalid Detail",
//       category: "Invalid Category",
//     };
//     jest.spyOn(HealthTipModel, "create").mockRejectedValue(new Error("Creation failed"));
//     await expect(healthTipRepository.createHealthTip(invalidHealthTipData)).rejects.toThrow("HealthTip creation failed: Creation failed");
//   }, 60000);

//   // Add more tests for getHealthTipById, updateHealthTipById, deleteHealthTipById, etc.
// });
