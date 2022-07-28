import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import customFetch, { checkForUnauthorizedResponse } from "../../util/axios";
import { clearValues } from "./jobSlice";
import { logoutUser } from "../user/userSlice";

export const createJobThunk = async (job, thunkApi) => {
  try {
    const res = customFetch.post("/jobs", job);

    thunkApi.dispatch(clearValues());
    return res.data;
  } catch (error) {
    // logout user
    return checkForUnauthorizedResponse(error, thunkApi);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job);

    thunkAPI.dispatch(clearValues());
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    const res = await customFetch.delete(`/jobs/${jobId}`);

    thunkAPI.dispatch(getAllJobs());
    return res.data;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
