import * as redis from "redis"

export const getRedisCLient = () => {
  const client = redis.createClient()
  client.on("error", (error) => {
    console.error(error)
  })

  client.connect();

  return client
}
