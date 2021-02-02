export interface NewTalkType {
  title: string;
  utcDateStringISO: string;
  description: string;
  slidesFilename?: string;
  conferenceName: string;
  conferenceLink: string;
  recordingLink?: string;
}

export interface TalkType extends NewTalkType {
  id: number;
}

export interface TalkStateType {
  past: TalkType[];
  upcoming: TalkType[];
}

export type TalkActionType = {
  type: string;
  payload: TalkType[];
};
