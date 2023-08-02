import React, { useEffect, useRef, useState } from "react";
import { Badge, Button, Modal } from "flowbite-react";
import { EventDetailCardProps } from "./interface";
import { AiOutlineCloseCircle, AiOutlineLink } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DivisionEnum } from "@prisma/client";
import { Division } from "../../interface";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";

export const EventDetailCard: React.FC<EventDetailCardProps> = ({
  onClose,
  showModal,
  event,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setIsAuth(true);
    }
  }, [status]);

  const handleClose = () => {
    onClose();
  };

  const deleteEventMutation = api.event.deleteEvent.useMutation();
  const queryClient = useQueryClient();

  const handleDeleteEvent = (eventId: string) => {
    try {
      deleteEventMutation.mutateAsync({ eventId });
      queryClient.invalidateQueries(["getAllEvents"]);
      toast.success("Event deleted succesfully!");
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Error, please try again");
    }
  };

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

  return (
    <>
      <Modal show={showModal} className="h-screen">
        <div className="flex items-center justify-between px-6 pt-5">
          <h2 className="font-semibold">Detail Acara</h2>
          <AiOutlineCloseCircle
            size="28"
            className="cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <Modal.Body>
          <div className="flex h-fit w-full flex-col gap-x-4 md:gap-x-12">
            {isAuth ? (
              <div className="flex w-full items-end justify-end">
                <Button
                  gradientMonochrome="purple"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  <div className="flex items-center justify-center gap-x-2">
                    <h1>Hapus</h1>
                    <BsFillTrashFill />
                  </div>
                </Button>
              </div>
            ) : (
              <></>
            )}
            {event.photo ? (
              <img
                src={
                  "https://ssqpcaawnglzgvkghzsj.supabase.co/storage/v1/object/public/event/" +
                  event.photo
                }
                alt={event.title}
                className="mb-3 h-64 w-full rounded-xl object-cover hover:h-full"
                placeholder="empty"
              />
            ) : (
              <></>
            )}

            <div className="flex w-full flex-col space-y-2">
              <div className="mb-auto flex w-full items-center space-x-3">
                <Badge color="purple">{getDivisionValue(event.division)}</Badge>
                <Badge color={badgeTimeColor}>{timeInformation}</Badge>
              </div>

              <h3 className="text-xl font-medium leading-8">{event.title}</h3>

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

              {event.link ? (
                <div className="flex items-center gap-x-3">
                  <div className="rounded-xl bg-blue-700 p-2">
                    <AiOutlineLink size={15} color="white" />
                  </div>
                  <a className="text-sm text-purple-800" href={event.link}>
                    Link Acara
                  </a>
                </div>
              ) : (
                <></>
              )}

              <h3 className="w-full break-words text-sm">
                {event.description}
              </h3>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
