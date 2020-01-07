import { objectType } from 'nexus'

export const Break = objectType({
  name: 'Break',
  definition(t) {
    t.model.id()
    t.model.duration()
  },
})
