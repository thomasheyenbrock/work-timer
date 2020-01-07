import { objectType } from 'nexus'

export const WorkTime = objectType({
  name: 'WorkTime',
  definition(t) {
    t.model.id()
    t.model.start()
    t.model.end()
  },
})
