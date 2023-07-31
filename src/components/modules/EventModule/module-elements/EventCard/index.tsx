import { EventCardProps, IEvent } from "./interface";
import { AiOutlineCalendar } from "react-icons/ai";

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  function formatDate(date: Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  return (
    <>
      <article className="group mb-6 transform cursor-pointer rounded-2xl border border-gray-100 p-6 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <a
          href="#1"
          className="absolute bottom-0 left-0 right-0 top-0 opacity-0"
        ></a>
        <div className="relative mb-4 rounded-2xl">
          <img
            className="h-48 w-full transform rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
            src={
              "https://ssqpcaawnglzgvkghzsj.supabase.co/storage/v1/object/public/event/" +
              event.photo
            }
            alt=""
          />
          <a
            className="absolute left-0 top-0 z-10 flex h-full w-full transform items-center justify-center rounded-2xl bg-purple-500 bg-opacity-80 text-xl text-white opacity-0 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read events{" "}
            <svg
              className="ml-2 h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              ></path>
            </svg>
          </a>
        </div>

        <div className="mb-auto flex w-full items-center justify-between pb-4">
          <div className="flex items-center">
            <div className="pr-3">
              <img
                className="h-12 w-12 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9ydHJhaXR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=60"
                alt=""
              />
            </div>
            <div className="flex flex-1">
              <div className="">
                <p className="text-sm font-semibold">Booby Purly</p>
                <p className="text-sm text-gray-500">
                  Published 53 minutes ago
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex items-center text-sm text-gray-500">
              6 min{" "}
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <h3 className="text-xl font-medium leading-8">
          <a
            href="#2"
            className="relative block transition-colors duration-200 group-hover:text-purple-500"
          >
            {event.title}
          </a>
        </h3>

        <div className="flex items-center gap-x-3">
          <div className="rounded-xl bg-blue-700 p-2">
            <AiOutlineCalendar size={24} color="white" />
          </div>
          <h3>
            {formatDate(event.startDate)} - {formatDate(event.endDate)}
          </h3>
        </div>
      </article>
    </>
  );
};
