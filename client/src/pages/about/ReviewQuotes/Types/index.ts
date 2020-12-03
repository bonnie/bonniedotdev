export type ReviewQuoteType = {
  id: number,
  body: string,
  courseName?: string,
  courseLink?: string,
  courseId?: number,
};

export type ReviewQuotesActionType = {
  type: string,
  payload: ReviewQuoteType[],
}
