import React from "react";
import type { NextPage } from "next";
import { requireAuth } from "@/common/requireAuth";
import { EditEventModule } from "@/components/modules/EventModule/module-elements";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const EditEvent: NextPage = () => <EditEventModule />;

export default EditEvent;
