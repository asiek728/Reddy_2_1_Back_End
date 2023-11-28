const request = require('supertest')
const app = require('../../app')


describe('api server', () => {
    let api;
  
    beforeAll(() => {
      api = app.listen(4000, () => {
        console.log('Test server running on port 4000')
      })
    })
  
    afterAll((done) => {
      console.log('Gracefully stopping test server')
      api.close(done)
    })

    test('responds to GET / with status 200', (done) => {
        request(api).get('/').expect(200, done)
    })


    it('responds to GET / with a message and a description', async () => {
        const response = await request(api).get('/')
    
        expect(response.statusCode).toBe(200)
        expect(response.body.message).toBe('welcome')
        expect(response.body.description).toBe('Council API')
    })

    test('responds to GET /tasks with status 200', (done) => {
      request(api).get('/tasks').expect(200, done)
    })

})
