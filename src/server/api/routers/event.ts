import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { DivisionEnum } from "@prisma/client";
import { z, ZodType } from "zod";

const ITEMS_PER_PAGE = 9;

export const eventRouter = createTRPCRouter({
  createEvent: publicProcedure
    .input(
      z.object({
        title: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        location: z.string(),
        division: z.nativeEnum(DivisionEnum),
        description: z.string(),
        link: z.string().optional(),
        photo: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const createdEvent = await ctx.prisma.event.create({
          data: input,
        });

        return createdEvent;
      } catch (error) {
        console.error("Error creating Event:", error);
      }
    }),

  getAllEvents: publicProcedure
    .input(
      z.object({
        page: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { page = 1 } = input || {};

      const skip = (page - 1) * ITEMS_PER_PAGE;
      const take = ITEMS_PER_PAGE;

      const events = await ctx.prisma.event.findMany({
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take,
      });

      const totalCount = await ctx.prisma.event.count();

      const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

      return {
        events,
        totalCount,
        totalPages,
      };
    }),

  getEventById: publicProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .query(async ({ input: { eventId }, ctx }) => {
      const event = await ctx.prisma.event.findUnique({
        where: {
          id: eventId,
        },
      });

      if (!event) {
        throw new Error(`Event with ID ${eventId} not found`);
      }

      return event;
    }),

  deleteEvent: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .mutation(async ({ input: { eventId }, ctx }) => {
      const event = await ctx.prisma.event.findUnique({
        where: {
          id: eventId,
        },
      });

      if (!event) {
        throw new Error(`Event with ID ${eventId} not found`);
      }

      await ctx.prisma.event.delete({
        where: {
          id: eventId,
        },
      });

      return {
        message: `Event with ID ${eventId} has been deleted successfully`,
      };
    }),
});
