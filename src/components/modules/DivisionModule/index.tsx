import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import { DivisionsTypes } from "./constant/division";
import { Tabs } from "@/components/elements/Tabs";
import { DivisionsMembers } from "./constant/member";

export const DivisionModule: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState("pengurus_inti");
  const [tab, setTab] = useState<number>(0);
  const [selectedBatch, setSelectedBatch] = useState("2023"); // State batch according to the year rn

  const isStaffAdministrator = (
    administrator: any
  ): administrator is { staffs: string[] } => {
    return "staffs" in administrator;
  };

  const handleBatchSelect = (batch: string) => {
    setSelectedBatch(batch);
  };

  return (
    <>
      <div className="relative flex w-full flex-col items-center rounded-b-[25px] p-5 pt-24 font-jakarta md:h-screen md:rounded-b-[100px] lg:h-screen lg:rounded-b-[150px] lg:px-32 lg:pb-20 lg:pt-32">
        <h1 className="flex w-full">
          <div className="w-fit rounded-tl-lg bg-[#8263E8] px-5 py-2 text-left text-2xl font-semibold text-white md:text-3xl lg:text-5xl">
            Divisi KMK Fasilkom UI
          </div>
          <div className="border-l-[50px] border-t-[80px] border-b-transparent border-l-[#8263E8] border-t-transparent md:border-t-[70px] lg:border-t-[70px]"></div>
        </h1>
        <div className="relative flex h-full w-full flex-col md:flex-row">
          {/* sidebar */}
          <div className="flex flex-col gap-y-2 rounded-bl-xl border-2 border-[#8263E8] p-3">
            {DivisionsTypes.map((division) => (
              <div
                key={division.id}
                onClick={() => setSelectedDivision(division.id)}
                className={`flex h-fit cursor-pointer select-none items-center justify-center gap-1 whitespace-nowrap rounded-full px-10 py-2 tracking-wider transition-all ${
                  selectedDivision === division.id
                    ? "bg-[#8263E8] text-white"
                    : "bg-white text-black"
                } px-5 font-semibold`}
              >
                {division.name}
              </div>
            ))}
          </div>

          {/* sidebar */}
          <div className="w-full rounded-r-xl bg-[#EDEBFC] px-4">
            <Tabs
              value={tab}
              setValue={setTab}
              className="mt-3 flex w-full justify-center"
              items={["Tentang", "Pengurus"]}
            />
            {tab == 0 ? (
              <>
                <div className="space-y-2 py-4">
                  {DivisionsTypes.find(
                    (division) => division.id === selectedDivision
                  )?.about.map((roleInfo, index) => (
                    <div>
                      <p key={index} className="font-bold">
                        {roleInfo.role}
                        <br />
                      </p>
                      <p> {roleInfo.description}</p>
                    </div>
                  ))}
                </div>
                <div className="py-4">
                  {DivisionsTypes.find(
                    (division) => division.id === selectedDivision
                  )?.programs && (
                    <>
                      <p className="font-bold">Program Kerja</p>
                      <ul className="list-disc pl-6">
                        {DivisionsTypes.find(
                          (division) => division.id === selectedDivision
                        )?.programs?.map((program, index) => (
                          <li key={index}>{program}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="mt-3 flex w-full items-center justify-end space-x-3">
                  <p className="font-bold">Batch</p>
                  <select
                    value={selectedBatch}
                    onChange={(e) => handleBatchSelect(e.target.value)}
                  >
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    {/* Add other batch options here */}
                  </select>
                </div>
                {DivisionsMembers[0]?.DivisionsAdmin?.map(
                  (division) =>
                    selectedDivision === division.id && (
                      <div key={division.id} className="mb-8 md:mb-0 lg:mb-0">
                        <ul>
                          {division.administrators?.map(
                            (administrator) =>
                              // Check if the administrator batch matches the selected batch
                              administrator.batch === selectedBatch && (
                                <li
                                  key={administrator.batch}
                                  className="space-y-4"
                                >
                                  <ul className="space-y-4">
                                    {administrator.roles.map((role) => (
                                      <div>
                                        <li
                                          key={role.role}
                                          className="font-bold"
                                        >
                                          {role.role}
                                        </li>
                                        <li>{role.name}</li>
                                      </div>
                                    ))}
                                  </ul>
                                  {/* Render staffs if staffs exist */}
                                  {isStaffAdministrator(administrator) && (
                                    <div>
                                      <h3 className="font-bold">Staf</h3>
                                      <ul className="list-disc pl-6">
                                        {administrator.staffs.map((staff) => (
                                          <li key={staff}>{staff}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                    )
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
