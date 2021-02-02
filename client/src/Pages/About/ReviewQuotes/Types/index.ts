export interface NewReviewQuoteType {
  body: string;
  courseName?: string;
  courseLink?: string;
  courseId?: number;
}

export interface ReviewQuoteType extends NewReviewQuoteType {
  id: number;
}

export type ReviewQuotesActionType = {
  type: string;
  payload: ReviewQuoteType[];
};
