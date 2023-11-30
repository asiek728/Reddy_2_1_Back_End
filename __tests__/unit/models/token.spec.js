const Token=require('../../../models/token')
const db=require('../../../database/connect')

describe('token', ()=>{
    describe('getAll', () =>{
        it('resolves with tokens on successful',async ()=> {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows:[{user_id:'1',token:'duqh3242347hda2jkh'},{user_id:'2',token:'duqh32423347hdajkh'},{user_id:'3',token:'duqh324245347hdajkh'}]
                })

                const tokens= await Token.getAll()
                expect(tokens).toHaveLength(3)
                expect(tokens[0]).toHaveProperty('token_id')
        } )


    })

    describe('getOneById', () => {
        it('resolves with one token on successful', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [{token_id: 1 , user_id: 1 ,token:'duqh3242347hda2jkh'}]
                });
    
            const token = await Token.getOneById(1);
    
            expect(token).toBeInstanceOf(Token); 
            expect(token.token_id).toEqual(1);
            expect(token.user_id).toEqual(1);
            expect(token.token).toEqual('duqh3242347hda2jkh');
 
        });
    
        it('throws an error when token is not found', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [] 
                });
    
            await expect(Token.getOneById(1)).rejects.toThrow("Unable to locate token.");
        });
    });

    
})

