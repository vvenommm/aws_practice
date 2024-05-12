import express from "express";
import * as redis from 'redis';

const PORT = 4000;

const createApp = async () => {
  const app = express()
  const client = redis.createClient({url: "redis://localhost:6379"})
  await client.connect(); // await 사용해야해서 전체 내용을 함수로 감싸주기

  app.use(express.json())

  app.get("/", (request, response) => {
    response.status(200).send("hello from express")
  })

  return app;
}

createApp().then((app) => {
  app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`)
  })
})


