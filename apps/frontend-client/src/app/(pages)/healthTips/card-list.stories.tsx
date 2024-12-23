
import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import CardListComponent from "./card-list";
import { userEvent, within } from "@storybook/testing-library";

// Mock card data
const mockCards = [
  {
    _id: "1",
    img: "./healthTips/image 1.svg", 
    title: "សម្ពាធឈាមខ្ពស់ប៉ះពាល់​សុខភាព ចុះសម្ពាធឈាមទាបម៉េចដែរ?",
    subtitle: "នាយើង​ទំនង​​តែង​គិត​ថា​ ​​ការ​មាន​សម្ពាធ​ឈាមខ្ពស់ធ្វើ​​គ្រោះថ្នាក់ដល់សុខភាព។ ប៉ុន្តែ​ គ្នា​យើង​ដែល​ដឹង​ទេថា​ការ​មានសម្ពាធ​​ឈាមទាប​ ក៏​ធ្វើឲ្យ​យើង​មាន​​បញ្ហាសុខភាពមិន​ចាញ់​គ្នា​ដែរ។",
    category: "សម្ពាធឈាម",
  },
  {
    _id: "2",
    img: "./healthTips/image 2.svg", 
    title: "វិធីថែរក្សា BMI ឱ្យមានសុខភាពល្អ",
    subtitle: "នៅពេលដែលមនុស្សសម្រេចចិត្តផ្លាស់ប្តូរទម្លាប់ និងកំណត់គោលដៅសុខភាព ពួកគេតែងតែព្យាយាមសម្រេចបាននូវទម្ងន់ដែលមានសុខភាពល្អ។",
    category: "ទម្ងន់ (BMI)",
  },
  {
    _id: "3",
    img: "./healthTips/image 3.svg",
    title: "ធ្វើយ៉ាងណាទើបមានកម្លាំងមាំមួន?",
    subtitle: "ការរស់នៅប្រកបដោយសុខភាពល្អ គឺជាបំណងប្រាថ្នាទូទៅរបស់មនុស្សគ្រប់រូប។",
    category: "ការថែរក្សាសុខភាព",
  },
  {
    _id: "4",
    img: "./healthTips/image 4.svg",
    title: "ប្រការគួរធ្វើដើម្បីថែរក្សាលំពែងឱ្យមានសុខភាពល្អ",
    subtitle: "លំពែងជាសរីរាង្គដែលស្ថិតនៅពីក្រោយក្រពះ ។",
    category: "ការថែរក្សាសុខភាព",
  },
  {
    _id: "5",
    img: "./healthTips/image 6.svg",
    title: "ផ្លែឈើទាំង​៨មុខនេះ ល្អសម្រាប់សុខភាពបេះដូង",
    subtitle: "ក្នុង​អត្ថបទ​នេះយើង​និង​លើក​យកផ្លែឈើ​៨មុខ​មកនិយាយ។",
    category: "ការថែរក្សាសុខភាព",
  },
];

export default {
  title: "healthTips/CardList",
  component: CardListComponent,
} as Meta<typeof CardListComponent>;

const Template: StoryFn<typeof CardListComponent> = (args) => (
  <CardListComponent {...args} />
);

// Default story passing mock data for Storybook
export const Default = Template.bind({});
Default.args = {
  cards: mockCards,
};

// Play function for simulating interactions in Storybook
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Wait for the search input to appear
  const searchInput = await canvas.findByPlaceholderText(/ស្វែងរក/i);
  await userEvent.type(searchInput, "BMI");


  // Introduce a delay of 2 seconds (2000ms) before the next action
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Wait for the BMI category button to appear and click it
  const bmiButton = await canvas.findByText(/ទម្ងន់ \(BMI\)/i);
  await userEvent.click(bmiButton);

    // Introduce a delay of 2 seconds before the next action
    await new Promise((resolve) => setTimeout(resolve, 2000));

  // Wait for the BMI Health Tip card to appear (using partial matching)
  const bmiHealthTip = await canvas.findByText(/វិធីថែរក្សា BMI/i);  // Partial text matching
  await userEvent.click(bmiHealthTip);


  // Introduce a final delay of 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
};
