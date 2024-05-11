import { defineStore } from 'pinia'

export const useTestStore = defineStore('Test', {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true
    }
  },
  actions: {
    async generate() {
      this.count += 1
      console.log('generate')
    }
  }
})
