import { IEvent } from "../EventCard/interface";

export interface EventDetailCardProps {
  showModal: boolean;
  onClose: () => void;
  event: IEvent;
}
