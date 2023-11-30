const taskController = require('../../../controllers/task')
const Task = require('../../../models/task')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

let mocks = 0
describe('tasks controller', () => {
  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  describe('index', () => {
    it('should return tasks with a status code 200', async () => {
      const testTasks = ['g1', 'g2']

      jest.spyOn(Task, 'getAll')
        .mockResolvedValue(testTasks)

      await taskController.index(null, mockRes)

      expect(Task.getAll).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockSend).toHaveBeenCalledWith({ data: testTasks })
    })

    it('sends an error upon fail', async () => {
      jest.spyOn(Task, 'getAll')
        .mockRejectedValue(new Error('Something happened to your db'))

      await taskController.index(null, mockRes)

      expect(Task.getAll).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db' })
    })
  })
})