import { idArg, queryType, stringArg, arg } from 'nexus'
import { differenceInDays, parseISO, addDays, isEqual } from 'date-fns'
import { getUserId } from '../utils'

export const Query = queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        return ctx.photon.users.findOne({
          where: {
            id: userId,
          },
        })
      },
    })

    t.list.field('weekDays', {
      type: 'Weekday',
      args: {
        startDate: arg({ type: 'DateTime' }),
        endDate: arg({ type: 'DateTime' }),
      },
      resolve: async (_, { startDate, endDate }, ctx) => {
        console.log(startDate, endDate)
        // plus one as we want to represent each day in the range including
        // start and end date
        const amountOfDays = differenceInDays(
          parseISO(endDate),
          parseISO(startDate),
        ) + 1
        const days = Array.from({ length: amountOfDays }).map((_, index) =>
          addDays(parseISO(startDate), index),
        )
        console.log(days)
        const weekdaysInDb = await ctx.photon.weekdays.findMany({
          where: { date: { gte: startDate, lte: endDate } },
        })
        const allWeekdays = await Promise.all(
          days.map(
            async day =>
              weekdaysInDb.find(weekday => isEqual(weekday.date, day)) ||
              ctx.photon.weekdays.create({ data: { date: day } }),
          ),
        )
        return allWeekdays
      },
    })

    t.list.field('feed', {
      type: 'Post',
      resolve: (parent, args, ctx) => {
        return ctx.photon.posts.findMany({
          where: { published: true },
        })
      },
    })

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (parent, { searchString }, ctx) => {
        return ctx.photon.posts.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: searchString,
                },
              },
              {
                content: {
                  contains: searchString,
                },
              },
            ],
          },
        })
      },
    })

    t.field('post', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.posts.findOne({
          where: {
            id,
          },
        })
      },
    })
  },
})
