export type ReviewQuoteType = {
  id: number | null;
  body: string;
  courseName?: string;
  courseLink?: string;
  courseId?: number;
};

export type ReviewQuotesActionType = {
  type: string;
  payload: ReviewQuoteType[];
};
