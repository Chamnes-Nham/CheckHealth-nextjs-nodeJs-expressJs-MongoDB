// import mongoose from 'mongoose';
// import { BloodPressureTipModel } from '../models/bloodPressure.model';
// import { BloodPressureTipRepository } from './bloodPressure.repositories';

// describe('BloodPressureTipRepository Tests', () => {
//   let mongoServer: MongoMemoryServer;
//   let repository: BloodPressureTipRepository;

//   // Start MongoDB in-memory server before running the tests
//   beforeAll(async () => {
//     mongoServer = await MongoMemoryServer.create();
//     const uri = mongoServer.getUri();
//     await mongoose.connect(uri);
//     repository = new BloodPressureTipRepository();
//   });

//   // Clear the database after each test
//   afterEach(async () => {
//     await BloodPressureTipModel.deleteMany({});
//   });

//   // Stop the MongoDB in-memory server after all tests
//   afterAll(async () => {
//     await mongoose.disconnect();
//     await mongoServer.stop();
//   });

//   it('should create a new blood pressure tip', async () => {
//     const createdTip = await repository.createTip(
//       'high',
//       'This is a high blood pressure tip',
//       [{ title: 'Guideline 1', content: 'Content for guideline 1' }],
//       [{ title: 'Do 1', content: 'Content for do 1' }],
//       [{ title: 'Don\'t 1', content: 'Content for don\'t 1' }]
//     );

//     expect(createdTip).toHaveProperty('_id');
//     expect(createdTip.categorizedTips).toBe('high');
//     expect(createdTip.description).toBe('This is a high blood pressure tip');
//   });

//   it('should fetch all blood pressure tips', async () => {
//     // Add sample tips
//     await repository.createTip(
//       'low',
//       'This is a low blood pressure tip',
//       [{ title: 'Guideline 1', content: 'Content for guideline 1' }],
//       [{ title: 'Do 1', content: 'Content for do 1' }],
//       [{ title: 'Don\'t 1', content: 'Content for don\'t 1' }]
//     );
//     await repository.createTip(
//       'high',
//       'This is a high blood pressure tip',
//       [{ title: 'Guideline 2', content: 'Content for guideline 2' }],
//       [{ title: 'Do 2', content: 'Content for do 2' }],
//       [{ title: 'Don\'t 2', content: 'Content for don\'t 2' }]
//     );

//     const tips = await repository.getTips();
//     expect(tips.length).toBe(2);
//     expect(tips[0].categorizedTips).toBe('low');
//     expect(tips[1].categorizedTips).toBe('high');
//   });
// });
