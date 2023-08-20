import { EventCardProps, IEvent } from "./interface";
import { AiOutlineCalendar } from "react-icons/ai";
import { HiInformationCircle } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import { Badge } from "flowbite-react";
import { DivisionEnum } from "@prisma/client";
import { Division } from "../../interface";
import { EventDetailCard } from "../EventDetailCard";
import { useState } from "react";

export const EventCard: React.FC<EventCardProps> = ({ event, authStatus }) => {
  const [isOpenEventDetail, setIsOpenEventDetail] = useState<boolean>(false);

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

  function getDivisionValue(divisionEnum: DivisionEnum): Division {
    return Division[divisionEnum];
  }

  const currentDate = new Date();
  let timeInformation: string;
  let badgeTimeColor: string;
  if (currentDate < event.startDate) {
    timeInformation = "Mendatang";
    badgeTimeColor = "gray";
  } else if (currentDate >= event.startDate && currentDate <= event.endDate) {
    timeInformation = "Sedang Berjalan";
    badgeTimeColor = "warning";
  } else {
    timeInformation = "Selesai";
    badgeTimeColor = "failure";
  }

  const MAX_WORDS = 50;
  const truncatedDescription = truncateDescription(
    event.description,
    MAX_WORDS
  );
  function truncateDescription(description: string, maxCharacters: number) {
    if (description.length <= maxCharacters) {
      return description;
    }

    const truncatedDescription = description.substring(0, maxCharacters);
    const lastSpaceIndex = truncatedDescription.lastIndexOf(" ");
    if (lastSpaceIndex !== -1) {
      return truncatedDescription.substring(0, lastSpaceIndex) + "...";
    }

    return truncatedDescription + "...";
  }

  return (
    <>
      <article
        className="group mb-6 transform cursor-pointer rounded-2xl border border-gray-100 p-4 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
        style={{ boxShadow: "1px 1px 10px 1px #8263E8" }}
      >
        <a
          onClick={() => setIsOpenEventDetail(true)}
          className="absolute bottom-0 left-0 right-0 top-0 opacity-0"
        ></a>
        <div className="relative mb-4 rounded-2xl">
          {event.photo ? (
            <img
              className="h-32 w-full transform rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
              src={
                "https://ssqpcaawnglzgvkghzsj.supabase.co/storage/v1/object/public/event/" +
                event.photo
              }
              alt=""
            />
          ) : (
            <div className="flex h-32 w-full transform items-center justify-center rounded-2xl bg-gradient-to-br from-purple-300 to-purple-600 object-cover transition-transform duration-300 group-hover:scale-105">
              <h1 className="overflow-hidden text-3xl font-bold text-white">
                {getDivisionValue(event.division)}
              </h1>
            </div>
          )}

          <a
            className="absolute left-0 top-0 z-10 flex h-full w-full transform items-center justify-center rounded-2xl bg-purple-500 bg-opacity-80 text-xl text-white opacity-0 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
            onClick={() => setIsOpenEventDetail(true)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Lihat Detail Acara{" "}
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

        <div className="flex flex-col space-y-1">
          <div className="mb-auto flex w-full items-center space-x-3">
            <Badge color="purple">{getDivisionValue(event.division)}</Badge>
            <Badge color={badgeTimeColor}>{timeInformation}</Badge>
          </div>

          <h3 className="text-xl font-medium leading-8">
            <a className="relative block transition-colors duration-200 group-hover:text-purple-500">
              {event.title}
            </a>
          </h3>

          <div className="flex items-center gap-x-3">
            <div className="rounded-xl bg-blue-700 p-2">
              <AiOutlineCalendar size={15} color="white" />
            </div>
            <h3 className="text-sm">
              {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </h3>
          </div>

          <div className="flex items-center gap-x-3">
            <div className="rounded-xl bg-blue-700 p-2">
              <FaLocationDot size={15} color="white" />
            </div>
            <h3 className="text-sm">{event.location}</h3>
          </div>

          <div className="flex w-full items-center gap-x-3">
            <div className="rounded-xl bg-blue-700 p-2">
              <HiInformationCircle size={15} color="white" />
            </div>
            <h3 className="w-[90%] break-words text-sm">
              {truncatedDescription}
            </h3>
          </div>
        </div>
      </article>
      <EventDetailCard
        showModal={isOpenEventDetail}
        onClose={() => setIsOpenEventDetail(false)}
        event={event}
      />
    </>
  );
};
