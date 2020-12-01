export type ReviewQuoteDisplayType = {
  courseName: string,
  courseLink: string,
  id: number,
  body: string,
};

export type ReviewQuoteType = {
  id: number,
  body: string,
  courseId?: number,
};

export type ReviewQuotesActionType = {
  type: string,
  payload: ReviewQuoteDisplayType[],
}
