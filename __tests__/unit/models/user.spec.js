const User = require('../../../models/user')

const db = require('../../../database/connect')

describe('User', () => {
    beforeEach(() => jest.clearAllMocks())
  
    afterAll(() => jest.resetAllMocks())
  
    it('is defined', () => {
      expect(User).toBeDefined()
    })

    describe('getAll', () => {
        it('resolves with users on successful', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [{ username: 'newUser1', password: 'duqh3242347hdajkh', email: 'email1@email.net', isAdmin: true }, { username: 'newUser2', password: 'dufdbvqh3242347hdajkh', email: 'email2@email.net', isAdmin: false }, { username: 'newUser3', password: 'duqh3242347hdajdsakh', email: 'email3@email.net', isAdmin: false }]
                })

            const users = await User.getAll()
            expect(users).toHaveLength(3)
            expect(users[0]).toHaveProperty('id')
        })
    })

    describe('getOneById', () => {
        it('resolves with one user on successful', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [{ user_id: 1, username: 'newUser1', password: 'duqh3242347hdajkh', email: 'email1@email.net', isadmin: true }]
                });

            const user = await User.getOneById(1);

            expect(user).toBeInstanceOf(User);
            expect(user.id).toEqual(1);
            expect(user.username).toEqual('newUser1');
            expect(user.password).toEqual('duqh3242347hdajkh');
            expect(user.email).toEqual('email1@email.net');

            expect(user.isAdmin).toEqual(true);
        });

        it('throws an error when user is not found', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: []
                });

            await expect(User.getOneById(1)).rejects.toThrow("Unable to locate user.");
        });
    });

    describe('getOneByUsername', () => {
        it('resolves with one user on successful', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [{ username: 'user1', password: 'sdfghjhjbsdf', email: 'user1@email.net', isAdmin: true }, { username: 'user2', password: 'gsfrewersdf', email: 'user2@email.net', isAdmin: false }]
                });

            const user = await User.getOneByUsername('user2');

            expect(user).toBeInstanceOf(User);
            expect(user.id).toEqual(2);
            expect(user.username).toEqual('user2');
            expect(user.password).toEqual('gsfrewersdf');
            expect(user.email).toEqual('user2@email.net');

            expect(user.isAdmin).toEqual(false);
        });

        it('throws an error when user is not found', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: []
                });

            await expect(User.getOneByUsername('user3')).rejects.toThrow("Unable to locate user.");
        });
    });

    describe('create', () => {
        it('resolves with new user on successful db query', async () => {
          let data = { username: "user", password: "sdfsdf", email: "email@email.com" }
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [] })
    
          jest.spyOn(db, 'query')
            .mockResolvedValueOnce({ rows: [{ ...data, user_id: 1, isAdmin: false }] })
    
          const result = await User.create(data)
          expect(result).toBeTruthy()
          expect(result).toHaveProperty('username')
          expect(result).toHaveProperty('password')
        })
      
    describe('create', () => {
        it('resolves with user on successful db query', async () => {
          let userData = { username: 'username1', password: 'fsdfsfsgfsgfds',email:'email@email',isAdmin:true }

          jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ id : 1 }] })

          jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ ...userData, id: 1 }] })

    
          const result = await User.create(userData)
          expect(result).toBeTruthy()
          expect(result).toHaveProperty('id')
          expect(result).toHaveProperty('username')
          expect(result).toHaveProperty('password')
          expect(result).toHaveProperty('email')
          expect(result).toHaveProperty('isAdmin')
        })
    

      })    
    
        it('should throw an Error on db query error', async () => {
    
          try {
            await User.create({ username: "alex" })
          } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe('password is missing')
          }
        })
      })



})


