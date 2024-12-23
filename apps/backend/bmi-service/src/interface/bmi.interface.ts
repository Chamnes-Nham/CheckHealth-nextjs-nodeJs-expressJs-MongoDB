
export interface BMIDto {
  categorizedTips: string;
  description: string;
  guideline: {
    title: string;
    content: string;
  }[];
  should_do: {
    title: string;
    content: string;
  }[];
  should_not: {
    title: string;
    content: string;
  }[];
}
