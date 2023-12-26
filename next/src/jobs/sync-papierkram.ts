import { client } from '@/trigger'
import { invokeTrigger } from '@trigger.dev/sdk'

// Your first job
// This Job will be triggered by an event, log a joke to the console, and then wait 5 seconds before logging the punchline.
client.defineJob({
  // This is the unique identifier for your Job, it must be unique across all Jobs in your project.
  id: 'sync-papierkram',
  name: 'Sync Papierkram Data',
  version: '0.0.1',
  // This is triggered by an event using eventTrigger. You can also trigger Jobs with webhooks, on schedules, and more: https://trigger.dev/docs/documentation/concepts/triggers/introduction
  trigger: invokeTrigger(),

  run: async (payload, io, ctx) => {
    // Use a Task to generate a random number. Using a Tasks means it only runs once.
    //   const result = await io.runTask('generate-random-number', async () => {

    //   // To learn how to write much more complex (and probably funnier) Jobs, check out our docs: https://trigger.dev/docs/documentation/guides/create-a-job
    // },

    await io.logger.info('Syncing Papierkram Data')

    const token = process.env.PAPIERKRAM_TOKEN

    if (!token) {
      throw new Error('PAPIERKRAM_TOKEN is not set')
    }

    const apiUrl = process.env.PAPIERKRAM_API_URL

    if (!apiUrl) {
      throw new Error('PAPIERKRAM_API_URL is not set')
    }

    await io.logger.info(`Token: ${token}`)
  },
})
