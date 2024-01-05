import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

// new imports
import { TRPCError } from "@trpc/server";
import { clerkClient } from "@clerk/nextjs/server";

export const moviesRouter = createTRPCRouter({
  // gets the movies of the user
  getMoviesByUserId: privateProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const movies = await ctx.db.movie.findMany({
        where: {
          userId: input.userId,
        },
        orderBy: [{ createdAt: "desc" }],
      });

      if (!movies) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return movies;
    }),

  updateMovieById: privateProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).max(250),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const movie = await ctx.db.movie.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
        },
      });

      return movie;
    }),

  // DONE: delete movie from list
  deleteMovieById: privateProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).max(250),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const movie = await ctx.db.movie.delete({
        where: {
          id: input.id,
        },
      });

      return movie;
    }),



  // adds a movie to the list
  createMovie: privateProcedure
    .input(
      z.object({
        title: z.string().min(1).max(250),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;

      const movie = await ctx.db.movie.create({
        data: {
          title: input.title,
          userId: authorId,
        },
      });

      return movie;
    }),
});
