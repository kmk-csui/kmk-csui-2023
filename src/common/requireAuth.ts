import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);

    if (!session) {
      return {
        redirect: {
          destination: "/auth/signIn",
          permanent: false,
        },
      };
    }

    return await func(ctx);
  };
