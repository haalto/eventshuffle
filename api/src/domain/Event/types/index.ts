export type EventRow = {
  id: string;
  name: string;
};

export type EventDateRow = {
  event_id: string;
  date: Date;
};

export type ShowEventRaw = {
  id: string;
  name: string;
  event_id: string;
  date: Date;
}[];

export type VoteRow = {
  event_id: string;
  user_id: string;
  date: Date;
};

export type UserRow = {
  id: string;
  name: string;
};
