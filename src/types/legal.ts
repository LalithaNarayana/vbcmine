export type LegalPageType = "privacy" | "terms" | "refund";

export interface LegalPage {
  _id: string;
  type: LegalPageType;
  title: string;
  content: string;
}