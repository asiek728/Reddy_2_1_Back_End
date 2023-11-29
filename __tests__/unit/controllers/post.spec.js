const postController = require('../../../controllers/post')
const Post = require('../../../models/post')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

let mocks = 0
describe('post controller', () => {
  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  describe('index', () => {
    it('should return posts with a status code 200', async () => {
      const testPosts = ['g1', 'g2']

      jest.spyOn(Post, 'getAll')
        .mockResolvedValue(testPosts)

      await postController.index(null, mockRes)


      expect(Post.getAll).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockSend).toHaveBeenCalledWith({ data: testPosts })
    })

    it('sends an error upon fail', async () => {
        jest.spyOn(Post, 'getAll')
          .mockRejectedValue(new Error('Something happened to your db'))
  
  
        await postController.index(null, mockRes)
  
        expect(Post.getAll).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(500)
        expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db' })
      })
    })
  })


