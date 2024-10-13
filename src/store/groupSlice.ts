import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { Groups_URls } from '../constants/End-points';
import { ErrorPayload, Group, GroupsState } from '@/utils/interfaces';

// fetch Groups
export const fetchGroups = createAsyncThunk<Group[], void, { rejectValue: ErrorPayload }>(
  'groups/fetchGroups', 
  async (_, {rejectWithValue}) => {
    try {
      const res = await axios.get(Groups_URls.getGroupsList ,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
      })
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({ message: error.response.data.message || 'An error occurred' });
      }
      return rejectWithValue({ message: 'Unknown error' });
    }
  }
)

// Add group
export const addGroup = createAsyncThunk<Group, Group,{ rejectValue: ErrorPayload }>(
  'groups/addGroup',
  async (data: Group, { rejectWithValue }) => {
    try {
      const res = await axios.post(Groups_URls.addGroup, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({ message: error.response.data.message || 'An error occurred' });
      }
      return rejectWithValue({ message: 'Unknown error' });
    }
  }
);

// update group
export const updateGroup = createAsyncThunk<Group, { data: Group; id: string }, { rejectValue: ErrorPayload }>(
  'groups/updateGroup',
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const res = await axios.put(Groups_URls.updateGroup(id), data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({ message: error.response.data.message || 'An error occurred' });
      }
      return rejectWithValue({ message: 'Unknown error' });
    }
  }
);

// Delete group
export const deleteGroup = createAsyncThunk<Group, string, { rejectValue: ErrorPayload }>(
  'groups/deleteGroup',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(Groups_URls.deleteGroup(id), {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({ message: error.response.data.message || 'An error occurred' });
      }
      return rejectWithValue({ message: 'Unknown error' });
    }
  }
);

const initialState: GroupsState = {
  groups: [],
  status: 'idle',
  message: null,
}

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    // omit existing reducers here
  },
  extraReducers: builder => {
    builder
      // Fetch groups
      .addCase(fetchGroups.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.groups.push(...action.payload)
      })
      .addCase(fetchGroups.rejected, (state, action) => {        
        state.status = 'rejected'
        state.message = action.payload?.message ?? 'Unknown Error'
      })
      // Add group
      .addCase(addGroup.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(addGroup.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message = action.payload?.message ?? 'Unknown Error'
        state.groups.push(action.payload)
      })
      .addCase(addGroup.rejected, (state, action) => {        
        state.status = 'rejected'
        state.message = action.payload?.message ?? 'Unknown Error'
      })
      // Update group
      .addCase(updateGroup.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(updateGroup.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message = action.payload?.message ?? 'Unknown Error'
        state.groups = state.groups.filter(group => group._id !== action.payload._id) // TO DO
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.status = 'rejected'
        state.message = action.payload?.message ?? 'Unknown Error'
      })
      // Delete group
      .addCase(deleteGroup.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message = action.payload?.message ?? 'Unknown Error'
        state.groups = state.groups.filter((item) => item._id !== action.payload._id);// TO DO
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.status = 'rejected'
        state.message = action.payload?.message ?? 'Unknown Error'
      })
  }
})

export default groupsSlice.reducer