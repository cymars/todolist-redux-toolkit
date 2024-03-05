import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [
        { id: 1, title: 'Example Todo', done: true },
        { id: 1, title: 'Example Todo', done: true },
        { id: 1, title: 'Example Todo', done: false },
        { id: 1, title: 'Example Todo', done: true },
    ]
}

export const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const { title, done } = action.payload;
            const newTodo = {
                id: state.todos.length + 1,
                title: title,
                done: done
            };
            state.todos.push(newTodo);
         
        },
    deleteTodo:(state, action) => {
        state.todos.splice(action.payload, 1)
    },
    toggleTodo: (state, action) => {
        const todo = state.todos[action.payload];
        todo.done = !todo.done;
      },
  
  updateTodo: (state, action) => {
            const { index, title, done } = action.payload;
            const todoToUpdate = state.todos[index];
            todoToUpdate.title = title;
            todoToUpdate.done = done;
        }
    }
})
export const { addTodo, deleteTodo, toggleTodo, updateTodo} = todoSlice.actions

export default todoSlice.reducer

