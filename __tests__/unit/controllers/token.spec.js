const tokenController = require('../../../controllers/token')
const Token = require('../../../models/token')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockEnd = jest.fn()
// we are mocking .send(), .json() and .end()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: mockEnd }))
const mockRes = { status: mockStatus }

let mocks = 0
describe('token controller', () => {
  beforeEach(() => jest.clearAllMocks())

  afterAll(() => jest.resetAllMocks())

  describe('index', () => {
    it('should return tokens with a status code 200', async () => {
      const testTokens = ['g1', 'g2']

      jest.spyOn(Token, 'getAll')
        .mockResolvedValue(testTokens)

      await tokenController.index(null, mockRes)

      expect(Token.getAll).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockSend).toHaveBeenCalledWith({ data: testTokens })
    })

    it('sends an error upon fail', async () => {
      jest.spyOn(Token, 'getAll')
        .mockRejectedValue(new Error('Something happened to your db'))

      await tokensController.index(null, mockRes)

      expect(Token.getAll).toHaveBeenCalledTimes(1)
      expect(mockStatus).toHaveBeenCalledWith(500)
      expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db' })
    })
  })
    describe('destroy', () => {
      it('should delete tokens with a status code 200', async () => {
        const testTokens = ['g1', 'g2']
  
        jest.spyOn(Token, 'destroy')
          .mockResolvedValue(testTokens)
  
        await tokenController.destroy(null, mockRes)
  
        expect(Token.destroy).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(200)
        expect(mockSend).toHaveBeenCalledWith({ data: testTokens })
      })
  
      it('sends an error upon fail', async () => {
        jest.spyOn(Token, 'destroy')
          .mockRejectedValue(new Error('Something happened to your db'))
  
        await tokenController.index(null, mockRes)
  
        expect(Token.destroy).toHaveBeenCalledTimes(1)
        expect(mockStatus).toHaveBeenCalledWith(404)
        expect(mockSend).toHaveBeenCalledWith({ error: 'Something happened to your db' })
      })
    })
  })