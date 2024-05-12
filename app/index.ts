import express from "express";
import * as redis from 'redis';

const PORT = 4000;
const LIST_KEY = 'message'

export const createApp = async () => { // test를 위해 export 해줘야함
  const app = express()
  const client = redis.createClient({url: "redis://localhost:6379"})
  await client.connect(); // await 사용해야해서 전체 내용을 함수로 감싸주기

  app.use(express.json())

  app.get("/", (request, response) => {
    response.status(200).send("hello from express")
  })

  app.post("/messages", async (request, response) => {
    const {message} = request.body;
    await client.lPush(LIST_KEY, message);
    response.status(200).send("Message added to a list")
  })

  app.get('/messages', async (request, response) => {
    const messages = await client.lRange(LIST_KEY, 0, -1);
    response.status(200).send(messages);
  })

  return app;
}

createApp().then((app) => {
  app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`)
  })
})


