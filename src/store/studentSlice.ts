import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { Students_URls } from '../constants/End-points';
import { ErrorPayload, Student, StudentsState } from '@/utils/interfaces';

// fetch Students
export const fetchStudents = createAsyncThunk<Student[], void, { rejectValue: ErrorPayload }>(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(Students_URls.getStudentsList ,{
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
);

const initialState: StudentsState = {
  students: [],
  status: 'idle',
  message: null,
}

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    // omit existing reducers here
  },
  extraReducers: builder => {
    builder
      // Fetch students
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.students.push(...action.payload)
      })
      .addCase(fetchStudents.rejected, (state, action) => {        
        state.status = 'rejected'
        state.message = action.payload?.message ?? 'Unknown Error'
      })
  }
})

export default studentSlice.reducer