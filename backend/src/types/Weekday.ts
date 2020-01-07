import { objectType } from 'nexus'

export const Weekday = objectType({
  name: 'Weekday',
  definition(t) {
    t.model.id()
    t.model.date()
    t.model.workTimes()
    t.model.breaks()
  },
})
