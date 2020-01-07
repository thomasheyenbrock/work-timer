import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { idArg, mutationType, stringArg, arg, intArg } from 'nexus'
import { APP_SECRET, getUserId } from '../utils'

export const Mutation = mutationType({
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg(),
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.photon.users.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        })
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, context) => {
        const user = await context.photon.users.findOne({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('updateWorkTime', {
      type: 'WorkTime',
      args: {
        id: idArg({ nullable: false }),
        start: arg({ type: 'DateTime' }),
        end: arg({ type: 'DateTime' }),
      },
      resolve: (_, { id, start, end }, ctx) => {
        return ctx.photon.workTimes.update({
          where: { id },
          data: { start, end },
        })
      },
    })

    t.field('createWorkTime', {
      type: 'WorkTime',
      args: {
        start: arg({ type: 'DateTime' }),
        end: arg({ type: 'DateTime' }),
        weekday: idArg({ nullable: false }),
      },
      resolve: (_, { start, end, weekday }, ctx) => {
        return ctx.photon.workTimes.create({
          data: { start, end, weekday: { connect: { id: weekday } } },
        })
      },
    })

    t.field('deleteWorkTime', {
      type: 'WorkTime',
      args: {
        id: idArg({ nullable: false }),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.photon.workTimes.delete({ where: { id } })
      },
    })

    t.field('updateBreak', {
      type: 'Break',
      args: {
        id: idArg({ nullable: false }),
        duration: intArg(),
      },
      resolve: (_, { id, duration }, ctx) => {
        return ctx.photon.breaks.update({ where: { id }, data: { duration } })
      },
    })

    t.field('createBreak', {
      type: 'Break',
      args: {
        duration: intArg(),
        weekday: idArg({ nullable: false }),
      },
      resolve: (_, { duration, weekday }, ctx) => {
        return ctx.photon.breaks.create({
          data: { duration, weekday: { connect: { id: weekday } } },
        })
      },
    })

    t.field('deleteBreak', {
      type: 'Break',
      args: {
        id: idArg({ nullable: false }),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.photon.breaks.delete({ where: { id } })
      },
    })

    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
      },
      resolve: (parent, { title, content }, ctx) => {
        const userId = getUserId(ctx)
        return ctx.photon.posts.create({
          data: {
            title,
            content,
            published: false,
            author: { connect: { id: userId } },
          },
        })
      },
    })

    t.field('deletePost', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.posts.delete({
          where: {
            id,
          },
        })
      },
    })

    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.posts.update({
          where: { id },
          data: { published: true },
        })
      },
    })
  },
})
