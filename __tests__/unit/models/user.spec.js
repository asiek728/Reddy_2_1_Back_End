const User=require('../../../models/user')

const db=require('../../../database/connect')



describe('user', ()=>{
    describe('getAll', () =>{
        it('resolves with users on successful',async ()=> {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows:[{username:'newUser1',password:'duqh3242347hdajkh',email:'email1@email.net',isAdmin:true },{username:'newUser2',password:'dufdbvqh3242347hdajkh',email:'email2@email.net',isAdmin:false },{username:'newUser3',password:'duqh3242347hdajdsakh',email:'email3@email.net',isAdmin:false }]
                })

                const users= await User.getAll()
                expect(users).toHaveLength(3)
                expect(users[0]).toHaveProperty('id')
        } )


    })

    describe('getOneById', () => {
        it('resolves with one user on successful', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [{user_id :1 , username:'newUser1', password:'duqh3242347hdajkh', email:'email1@email.net', isadmin : true }]
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

    
})

