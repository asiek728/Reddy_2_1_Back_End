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

    describe('create', () => {
        it('resolves with task on successful db query', async () => {
          let taskData = { task_name: 'New task', status: 'done',num_volunteers_needed:4,start_date:'23-10-2021' }
          //jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [] })
    
          jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ id: 1 }] })

          jest.spyOn(db, 'query').mockResolvedValueOnce({ rows: [{ ...taskData, id: 1 }] })
    
          console.log("Console log test")

          const result = await Task.create(taskData)
          console.log("Result=", result)
          expect(result).toBeTruthy()
          expect(result).toHaveProperty('id')
          expect(result).toHaveProperty('task_name')
          expect(result).toHaveProperty('status')
          expect(result).toHaveProperty('num_volunteers_needed')
          expect(result).toHaveProperty('start_date')


        })
    })
})

