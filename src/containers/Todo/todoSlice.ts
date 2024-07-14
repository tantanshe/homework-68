import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';

interface Todo {
  id: string;
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

export const fetchTodo = createAsyncThunk<Todo[], void, { state: RootState }>('todo/fetch', async () => {
    const {data: todo} = await axiosApi.get<Todo[] | null>('/todo.json');
    return todo;
  }
);

export const addTodo = createAsyncThunk<Todo, void, { state: RootState }>('todo/addTodo', async () => {
    const {data: todo} = await axiosApi.post<Todo | null>('/todo.json');
    return todo;
  }
);

export const editTodo = createAsyncThunk<void, void, { state: RootState }>('todo/editTodo', async () => {
    const {data: todo} = await axiosApi.put<Todo | null>('/todo/${id}.json');
    return todo;
  }
);

export const deleteTodo = createAsyncThunk<string, string, { state: RootState }>('todo/deleteTodo', async (id) => {
    await axiosApi.delete('/todo/${id}.json');
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
      .addCase(fetchTodo.rejected, (state: TodoState, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addTodo.pending, (state: TodoState) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state: TodoState, action: PayloadAction<Todo>) => {
        state.todo.push(action.payload);
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
      })
      .addCase(deleteTodo.rejected, (state: TodoState) => {
        state.loading = false;
        state.error = true;
      });
  },
});


export const todoReducer = todoSlice.reducer;