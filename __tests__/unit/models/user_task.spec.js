const User_Task=require('../../../models/user_task')

const db=require('../../../database/connect')


describe('user_task', ()=>{
    describe('getAll', () =>{
        it('resolves with users with tasks on successful',async ()=> {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows:[{user_id:1,task_id:2,start_date:'23-10-2002',task_name:"newTask", status:"done" },{user_id:2,task_id:3,start_date:'23-10-2002',task_name:"newTask", status:"not done" },{user_id:3,task_id:4,start_date:'23-10-2002',task_name:"newTask", status:"done" }]
                })

                const user_tasks= await User_Task.getAll()
                expect(user_tasks).toHaveLength(3)
                expect(user_tasks[0]).toHaveProperty('id')
        } )


    })

    describe('getOneById', () => {
        it('resolves with one user task on successful', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [{id : 1,user_id:1,task_id:2,start_date:'23-10-2002',task_name:"newTask", status:"done" }]
                });
    
            const user_task = await User_Task.getOneById(1);
    
            expect(user_task).toBeInstanceOf(User_Task); 
            expect(user_task.id).toEqual(1);
            expect(user_task.user_id).toEqual(1);
            expect(user_task.task_id).toEqual(2);
            expect(user_task.start_date).toEqual('23-10-2002');
            
            expect(user_task.task_name).toEqual('newTask'); 
            expect(user_task.status).toEqual("done"); 
        });
    
        it('throws an error when user task is not found', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({
                    rows: [] 
                });
    
            await expect(User_Task.getOneById(1)).rejects.toThrow("Unable to locate task.");
        });
    });  


    
    
})

