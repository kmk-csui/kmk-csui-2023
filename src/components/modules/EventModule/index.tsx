import { Button, FileInput, Select, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { IEvent } from "./module-elements/EventCard/interface";
import { api } from "@/utils/api";
import { EventCard } from "./module-elements/EventCard";

export const EventModule: React.FC = () => {
  const [eventsData, setEventsData] = useState<IEvent[]>([]);
  const { data, error } = api.event.getAllEvents.useQuery();

  useEffect(() => {
    if (data) {
      setEventsData(data);
    }
  }, [data]);

  return (
    <>
      <div className="relative flex min-h-screen flex-col items-center rounded-b-[25px] md:rounded-b-[100px] lg:rounded-b-[150px] lg:p-32">
        <div className="grid grid-cols-3">
          {eventsData.map((event) => (
            <EventCard event={event} />
          ))}
        </div>
      </div>
    </>
  );
};
