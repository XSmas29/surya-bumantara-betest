import { createClient } from "redis"

export const getRedisCLient = () => {
  const client = createClient({url: "redis://redis:6379"})
  client.on("error", (error) => {
    console.error(error)
  })

  client.connect();

  return client
}
