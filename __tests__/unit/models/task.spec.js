const Task=require('../../../models/task')

const db=require('../../../database/connect')

describe('task', ()=>{
    describe('getAll', () =>{
        it('resolves with tasks on successful',async ()=> {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows:[{task_name:'t1',status:'done'},{task_name:'t2',status:'not done'},{task_name:'t3',status:'done'}]
                })

                const tasks= await Task.getAll()
                expect(tasks).toHaveLength(3)
                expect(tasks[0]).toHaveProperty('id')
        } )


    })

    describe('getOneById', () => {
        it('resolves with one task on successful', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [{ id: 1, task_name: 't1', status: 'done' }]
                });
    
            const task = await Task.getOneById(1);
    
            expect(task).toBeInstanceOf(Task); 
            expect(task.id).toEqual(1);
            expect(task.task_name).toEqual('t1');
            expect(task.status).toEqual('done');
        });
    
        it('throws an error when task is not found', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [] 
                });
    
            await expect(Task.getOneById(1)).rejects.toThrow("Unable to locate task.");
        });
    });

    
})

