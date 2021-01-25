export type TalkType = {
    id: number,
    title: string,
    utcDateStringISO: string,
    description: string,
    slidesFilename: string,
    conferenceImageName: string,
    conferenceName: string,
    conferenceLink: string,
    recordingLink: string,
  };

export type TalkActionType = {
    type: string,
    payload: TalkType[],
  }

export enum TalkRangeType {
    past='past',
    upcoming='upcoming',
  }
