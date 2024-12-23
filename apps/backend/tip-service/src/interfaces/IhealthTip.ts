export interface IHealthTip {
  img?: string; 
  title: string; 
  subtitle: string; 
  detail: string;
  buttons: {
    text: string; 
    dropdownItems: {
      text: string; 
      href: string; 
    }[];
  }[]; 
  details?: {
    detailTitle: {
      text: string; 
      dropdownItem: {
        text: string; 
        href: string; 
      }[];
    }[];
    content: string; 
  }[];
}
