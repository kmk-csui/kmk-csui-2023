import { DivisionEnum } from "@prisma/client";

export interface EventCardProps {
  event: IEvent;
  authStatus: boolean;
}

export interface IEvent {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  division: DivisionEnum;
  description: string;
  link: string | null;
  photo: string | null;
}
