import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const API_URL = "https://jsonplaceholder.typicode.com/users";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  nextId: number;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  nextId: 11,
};

export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch users");

    const users = await response.json();
    return users.map((user: User) => ({
      ...user,
      address: user.address || {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
      }, // Ensure address exists
    }));
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Create User Slice
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (
      state,
      action: PayloadAction<{ name: string; email: string; address?: Address }>
    ) => {
      const newUser: User = {
        id: state.nextId,
        name: action.payload.name,
        email: action.payload.email,
        address: action.payload.address || {
          street: "",
          suite: "",
          city: "",
          zipcode: "",
        }, // Default address if not provided
      };
      state.users.push(newUser);
      state.nextId += 1; // Increment ID for next user
    },

    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },

    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;

        // Ensure nextId is greater than the highest existing ID
        const maxId = Math.max(...state.users.map((user) => user.id), 10);
        state.nextId = maxId + 1;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

// Export Actions
export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
