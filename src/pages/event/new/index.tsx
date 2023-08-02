import React from "react";
import type { NextPage } from "next";
import { CreateEventModule } from "@/components/modules/EventModule/module-elements";
import { requireAuth } from "@/common/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const CreateEvent: NextPage = () => <CreateEventModule />;

export default CreateEvent;
