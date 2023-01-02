import { createSlice } from "@reduxjs/toolkit";

const UserState = {
  firstName: "",
  lastName: "",
  projects: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: UserState,
  reducers: {
    setUser: (state, action) => {
      const { firstName, lastName, projects } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.projects = projects;
    },
    resetUser: (state) => {
      const { firstName, lastName, projects } = UserState;
      state.firstName = firstName;
      state.lastName = lastName;
      state.projects = projects;
    },
    addProject: (state, action) => {
      state.projects = [...action.payload];
    },
    updateProject: (state, action) => {
      const { projectID, updatedProject } = action.payload;
      state.projects = [...state.projects].map((proj) => {
        if (proj.projectID === projectID)
          return {
            ...proj,
            ...updatedProject,
          };

        return proj;
      });
    },
    updateProjects: (state, action) => {
      state.projects = [...action.payload];
    },
  },
});

export const { setUser, resetUser, addProject, updateProject, updateProjects } =
  userSlice.actions;

export default userSlice.reducer;
