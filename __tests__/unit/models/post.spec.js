const Post=require('../../../models/post')

const db=require('../../../database/connect')


describe('post', ()=>{
    describe('getAll', () =>{
        it('resolves with posts on successful',async ()=> {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows:[{title:'t1',date:'23-10-2023',image_source:"image_url", content:"News1"},{title:'t2',date:'23-10-2025',image_source:"image_url2", content:"News2"},{title:'t3',date:'23-10-2024',image_source:"image_url3", content:"News3"}]
                })

                const post= await Post.getAll()
                expect(post).toHaveLength(3)
                expect(post[0]).toHaveProperty('id')
        } )


    })

    describe('getOneById', () => {
        it('resolves with one post on successful', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [{post_id : 1, title:'t1',date:'23-10-2023',image_source:"image_url", content:"News1"}]
                });
    
            const post = await Post.getOneById(1);
    
            expect(post).toBeInstanceOf(Post); 
            expect(post.id).toEqual(1);
            expect(post.title).toEqual('t1');
            expect(post.date).toEqual('23-10-2023');
            expect(post.image_source).toEqual('image_url');
            expect(post.content).toEqual('News1');
        });
    
        it('throws an error when post is not found', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [] 
                });
    
            await expect(Post.getOneById(1)).rejects.toThrow("Unable to locate post.");
        });
    });

     
    describe('create', () => {
        it('resolves with post on successful db query', async () => {
          let postData = { title: 'New title', date: '21-10-2024',image_source:'image.jpg',content:'Fresh news' }

          jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ id : 1 }] })

          jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ ...postData, id: 1 }] })

    
          const result = await Post.create(postData)
          expect(result).toBeTruthy()
          expect(result).toHaveProperty('id')
          expect(result).toHaveProperty('title')
          expect(result).toHaveProperty('date')
          expect(result).toHaveProperty('image_source')
          expect(result).toHaveProperty('content')
        })
    

      })

    
})

