import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, toggleTodo, updateTodo } from '../redux/todoSlice'

export const TodoList = () => {

    const todoState = useSelector(state => state.todoState);
    const [title, setTitle] = useState('');
    const [isDone, setIsDone] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const dispatch = useDispatch();

    console.log('>> todoState', todoState)

    const onSubmit = (event) => {
        event.preventDefault()

        const title = event.target.title1.value;
        const isDone = event.target.ch1.checked;

        
        if (editingIndex !== null) {
            // update
            dispatch(updateTodo({ index: editingIndex, title, done: isDone }));
            setEditingIndex(null); 
        } else {
            
            dispatch(addTodo({ title, done: isDone }));
        }

        setTitle('');
        setIsDone(false);


        // reset form
        event.target.reset();

    };
    const handleToggle = (index) => {
        dispatch(toggleTodo(index));
    };
    const handleEdit = (index) => {
        setEditingIndex(index); 
        const todo = todoState.todos[index];
        setTitle(todo.title);
        setIsDone(todo.done);

    };



    return (
        <>
            <div className='pricing-header p-3 pb-md-4 mx-auto text-center'>
                <h1 className="display-4 fw-normal">
                    TODO List
                </h1>
            </div>

            <form onSubmit={onSubmit}  >
                <div className="container text-center">
                    <div className="row ">
                        <div className='form-group col col-xs-3'>
                            <label for="title1" className="form-label col" type='text'>Title</label>
                            <input type="text" id="title1" className="form-control " placeholder="Enter a Todo (eg: studying chinese)"></input>

                        </div>
                        <div className="form-group col">

                            <div className="col mb-2">Is Done</div>

                            <input className="form-check-input " type="checkbox" value="1" id="ch1"></input>

                        </div>

                        <div className='col col-xs-4'>
                            <button type='submit' className='btn btn-primary mt-2 ' >
                            {editingIndex !== null ? "Update Todo" : "Add Todo"}
                            </button>

                        </div>
                    </div>


                </div>
            </form>

            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">
                            Id
                        </th>
                        <th scope="col">
                            Name
                        </th>
                        <th scope="col">
                            Is Done
                        </th>
                        <th scope="col">
                            Process
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todoState.todos.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.title}
                                    </td>
                                    <td>
                                        <input type='checkbox' checked={item.done} onChange={() => handleToggle(index)} />
                                    </td>
                                    <td>
                                        <button className='btn btn-primary me-2' onClick={() => handleEdit(index)}>
                                            Edit
                                        </button>
                                        <button className='btn btn-danger me-2'
                                            onClick={event => dispatch(deleteTodo(index))}>
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )


}