const request = require('supertest')
const app = require('../../app')
const { resetTestDB } = require('./config')

describe('api server', () => {
  let api

  beforeEach(async () => {
    await resetTestDB()
  })

  beforeAll(() => {
    api = app.listen(4000, () => {
      console.log('Test server running on port 4000')
    })
  })

  afterAll((done) => {
    console.log('Gracefully closing server')
    api.close(done)
  })

    test('responds to GET / with status 200', (done) => {
        request(api).get('/').expect(200, done)
    })

     test('responds to POST /posts with a 201 status code', (done) => {
      const testData = {
        title: "Clean beach",
        date: "11/11/2023",
        image_source: 'https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png',
        content: 'We need to clean the beaches'
      }
  
      request(api)
        .post('/posts')
        .send(testData)
        .set('Accept', 'application/json')
        .expect(201)
        .expect({ data: { ...testData, id: 4 } }, done)
    })

    test('responds to DELETE /posts/:id with status 204', (done) => {
      request(api).delete('/posts/1').expect(204, done)
    })

    test('responds to DELETE with a 404 status code if the goat does not exist', (done) => {
      request(api).delete('/posts/9').expect(404, done)
    })


    test('responds to GET / with a message and a description', async () => {
        const response = await request(api).get('/')
    
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe('welcome')
        expect(response.body.description).toBe('Council API')
    })

    test('responds to GET /tasks with status 200', (done) => {
      request(api).get('/tasks').expect(200, done)
    })

    test('responds to POST /tasks with a 201 status code', (done) => {
      const testData = {
        task_name: "Clean beach",
        num_volunteers_needed: 3,
        status: 'not done',
        start_date: '11/11/2023'
      }

  
      request(api)
        .post('/tasks')
        .send(testData)
        .set('Accept', 'application/json')
        .expect(201)
        .expect({ data: { ...testData, id: 4 } }, done)
    })

})
