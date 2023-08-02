import React from "react";
import type { NextPage } from "next";
import { EventModule } from "@/components";
import { requireAuth } from "@/common/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Event: NextPage = () => <EventModule />;

export default Event;
