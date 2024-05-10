import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ExecuteCode, fetchAllProblems, fetchCodeStatement } from './codeApi';

const initialState = {
  status: 'idle',
  allProblems:[],
  currentProblemStatement:{},
  currentJobId:"",
  currentJobOutput:"",
  currentJobError:"",
  currentJobexecutionTime:"",
  currentJobStatus:""
};

export const ExcuteCodeAsync = createAsyncThunk(
  'codeRunner/executeCode',
  async (CodeData) => {
    const {data} = await ExecuteCode(CodeData);
    return data;
  }
);

export const fetchProblemAsync = createAsyncThunk(
  'codeRunner/fetchProblem',
  async (ProblemId) => {
    const {data} = await fetchCodeStatement(ProblemId);
    return data;
  }
);

export const fetchCodeStatusAsync = createAsyncThunk(
    'codeRunner/fetchCodeStatus',
    async (jobId) => {
      const {data} = await ExecuteCode(jobId);
      return data;
    }
  );

export const fetchAllProblemAsync = createAsyncThunk(
  'codeRunner/fetchAllProblem',
  async () => {
    const {data} = await fetchAllProblems();
    return data;
  }
);

export const codeSlice = createSlice({
  name: 'codeRunner',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProblemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProblemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log(action.payload);
        state.allProblems = action.payload;
      })
      .addCase(fetchProblemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProblemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload);
        state.currentProblemStatement = action.payload;
      })
      .addCase(ExcuteCodeAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ExcuteCodeAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload);
        state.currentJobId = action.payload.jobId;
      })
      .addCase(fetchCodeStatusAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCodeStatusAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload);
        if(action.payload.success){
            const {Output, id, Status} = action.payload.job;
            state.currentJobId = id;
            state.currentJobOutput = Output;
            // state.currentJobError = 
            // state.currentJobexecutionTime = 
            state.currentJobStatus = Status
        }
      })
  },
});


export const selectJobId = (state)=>state.code.currentJobId;
export const selectJobStatus = (state)=>state.code.currentJobStatus;
export const selectProblemStatement = (state)=>state.code.currentProblemStatement;
export const selectAllProblems = (state)=>state.code.allProblems;

export default codeSlice.reducer;