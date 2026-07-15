export interface AboutSectionText {
  mainTitle: string;
  titlePart1: string;
  titlePart2: string;
  titlePart3?: string;
  description: string;
}

export interface AboutContent {
  aboutVbc: AboutSectionText;
  companyProfile: AboutSectionText;
  whySection: AboutSectionText;
  successStory: AboutSectionText;
  mission: { description: string };
  vision: { description: string };
  values: { description: string };
}

export interface AboutStat {
  _id: string;
  value: string;
  label: string;
  order: number;
}

export interface TimelineItem {
  _id: string;
  year: string;
  description: string;
  order: number;
}
