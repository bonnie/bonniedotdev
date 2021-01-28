export type TalkType = {
    id: number | null,
    title: string,
    utcDateStringISO: string,
    description: string,
    slidesFilename: string,
    conferenceName: string,
    conferenceLink: string,
    recordingLink: string,
  };

export interface TalkStateType {
  past: TalkType[]
  upcoming: TalkType[]
}

export type TalkActionType = {
    type: string,
    payload: TalkType[],
  }
