import {
  Button,
  FileInput,
  Pagination,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { IEvent } from "./module-elements/EventCard/interface";
import { api } from "@/utils/api";
import { EventCard } from "./module-elements/EventCard";
import { useSession } from "next-auth/react";
import { IoIosCreate } from "react-icons/io";
import { useRouter } from "next/router";
export const EventModule: React.FC = () => {
  const [eventsData, setEventsData] = useState<IEvent[]>([]);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const router = useRouter();
  const { status } = useSession();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { data, error } = api.event.getAllEvents.useQuery({
    page: currentPage,
  });

  useEffect(() => {
    if (status === "authenticated") {
      setIsAuth(true);
    }
  }, [status]);

  const onPageChange = (page: number) => setCurrentPage(page);

  useEffect(() => {
    if (data) {
      setEventsData(data.events);
      console.log(data);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  return (
    <>
      <div className="relative flex min-h-screen flex-col items-center space-y-5 rounded-b-[25px] p-5 pt-24 font-jakarta md:rounded-b-[100px] lg:rounded-b-[150px] lg:p-32">
        <h1 className="mb-3 w-full items-center justify-center text-left text-2xl font-semibold md:text-3xl lg:text-5xl">
          Event KMK Fasilkom UI
        </h1>
        {data ? (
          <>
            {isAuth ? (
              <div className="flex w-full items-end justify-end">
                <Button
                  gradientMonochrome="purple"
                  onClick={() => router.push("event/new")}
                >
                  <div className="flex items-center gap-x-2 ">
                    <h4 className="text-md lg:text-lg">Ajukan Kegiatan</h4>
                    <IoIosCreate size={20} />
                  </div>
                </Button>
              </div>
            ) : (
              <></>
            )}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {eventsData.map((event) => (
                <EventCard event={event} authStatus={isAuth} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              onPageChange={onPageChange}
              totalPages={totalPages}
            />
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};
