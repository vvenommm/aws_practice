import request from 'supertest'
import { createApp } from ".";

// let app: Express.Application
let app :any

beforeAll(async () => {
  app = await createApp()
})

describe("POST /messages", () => {
  it('should respond with a success message', async () => {
    const response = await request(app)
      .post('/messages')
      .send({message: "testing with redis"})

    expect(response.statusCode).toBe(200)
    expect(response.text).toBe("Message added to the list")
  });
})
