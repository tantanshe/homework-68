import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';

interface Todo {
  id?: string;
  title: string;
  completed: boolean;
}

interface TodoState {
  todo: Todo[];
  loading: boolean;
  error: boolean;
}

const initialState: TodoState = {
  todo: [],
  loading: false,
  error: false,
};

export const fetchTodo = createAsyncThunk<Todo[], void, { state: RootState }>('todo/fetch',
  async () => {
    const {data: todo} = await axiosApi.get<{ [id: string]: Todo }>(`/todo.json`);
    return Object.keys(todo).map(id => ({
      id,
      ...todo[id]
    }));
  }
);

export const addTodo = createAsyncThunk<Todo, Todo, { state: RootState }>('todo/addTodo', async (newTodo) => {
    const {data: todo} = await axiosApi.post<Todo | null>(`/todo.json`, newTodo);
    return todo;
  }
);

export const editTodo = createAsyncThunk<void, { id: string, updatedTodo: Todo }, {
  state: RootState
}>('todo/editTodo', async ({id, updatedTodo}) => {
    await axiosApi.put<Todo>(`/todo/${id}.json`, updatedTodo);
  }
);

export const deleteTodo = createAsyncThunk<string, string, { state: RootState }>('todo/deleteTodo',
  async (id) => {
    await axiosApi.delete(`/todo/${id}.json`);
    return id;
  }
);
export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    emptyReducer: (state) => {
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state: TodoState) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchTodo.fulfilled, (state: TodoState, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todo = action.payload;
      })
      .addCase(fetchTodo.rejected, (state: TodoState) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addTodo.pending, (state: TodoState) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state: TodoState, action: PayloadAction<Todo>) => {
        state.todo.push(action.payload);
        state.loading = false;
      })
      .addCase(addTodo.rejected, (state: TodoState) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(editTodo.pending, (state: TodoState) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(editTodo.fulfilled, (state: TodoState) => {
        state.loading = false;
      })
      .addCase(editTodo.rejected, (state: TodoState) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteTodo.pending, (state: TodoState) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state: TodoState, action: PayloadAction<string>) => {
        state.todo = state.todo.filter(todo => todo.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTodo.rejected, (state: TodoState) => {
        state.loading = false;
        state.error = true;
      });
  },
});


export const todoReducer = todoSlice.reducer;