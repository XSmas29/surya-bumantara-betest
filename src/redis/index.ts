import { createClient } from "redis"

const REDIS_URL = process.env.REDIS_URL || "redis://redis:6379"

export const getRedisCLient = () => {
  const client = createClient({url: REDIS_URL})
  client.on("error", (error) => {
    console.error(error)
  })

  client.connect();

  return client
}
