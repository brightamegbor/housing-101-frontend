import { createSlice, current } from "@reduxjs/toolkit";
import { apiCallBegan, apiLoginCallBegan } from "./api";

const slice = createSlice({
  name: "rentstate",
  initialState: {
    list: [],
    isLoggedIn: false,
    loading: false,
    userData: {},
    loginResponse: "",
  },

  reducers: {
    rentstateRequested: (rentstate) => {
      rentstate.loading = true;
    },

    usersReceived: (users, action) => {
      users.list = users.list.length
        ? [...users.list, ...action.payload]
        : action.payload;

      users.list = users.list.filter(
        (val, id, array) => array.findIndex((va) => va.id === val.id) === id
      );
      console.log(users.list);
      users.loading = false;
    },

    loggedInSuccess: (rentstate, action) => {
      const appState = {
        isLoggedIn: true,
        userData: action.payload,
      };
      // save app state with user date in local storage
      localStorage["appState"] = JSON.stringify(appState);

      rentstate.userData = action.payload;
      rentstate.loading = false;
      rentstate.isLoggedIn = true;
    },

    loggedInFailed: (state, action) => {
      state.loading = false;
      state.loginResponse = action.payload;
    },

    checkAuthState: (rentstate) => {
      const state = localStorage["appState"];

      if (state) {
        const AppState = JSON.parse(state);

        if (AppState.isLoggedIn) {
          rentstate.isLoggedIn = AppState.isLoggedIn;
        } else {
          rentstate.isLoggedIn = false;
        }
      }
    },

    logOutUser: (state) => {
      localStorage.clear();

      state.isLoggedIn = false;
    },

    usersRequestFailed: (users) => {
      users.loading = false;
    },

    updateUsersData: (state, action) => {
      const usersState = current(state);
      const user = action.user;
      console.log(usersState);
      console.log(user.id);
      const users = usersState.list.filter((u) => u.id !== user.id);

      state.list = [
        ...users,
        {
          ...user,
        },
      ];
    },

    addUserData: (state, action) => {
      const usersState = current(state);
      const user = action.user;
      const users = usersState.list;

      state.list = [
        ...users,
        {
          ...user,
        },
      ];
    },

    removeUserData: (state, action) => {
      const usersState = current(state);
      const user = action.user;
      const users = usersState.list.filter((u) => u.id !== user.id);

      state.list = [...users];
    },

    sortUserDataById: (state) => {
      const usersState = current(state);
      const users = usersState.list.concat().sort((a, b) => a.id - b.id);

      state.list = [...users];
    },

    sortUserDataByUsername: (state, action) => {
      const usersState = current(state);
      const sortBy = action.by;
      const users = usersState.list
        .concat()
        .sort((a, b) =>
          sortBy === "a-z"
            ? a.username.localeCompare(b.username)
            : b.username.localeCompare(a.username)
        );

      state.list = [...users];
    },
  },
});

export default slice.reducer;

const {
  rentstateRequested,
  usersReceived,
  usersRequestFailed,
  updateUsersData,
  addUserData,
  removeUserData,
  sortUserDataByUsername,
  sortUserDataById,
  loggedInSuccess,
  loggedInFailed,
  checkAuthState,
  logOutUser,
} = slice.actions;

const url = "/data";
const loginUrl = "/login/";

export const loadUsers = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url,
      onStart: rentstateRequested.type,
      onSuccess: usersReceived.type,
      onError: usersRequestFailed.type,
    })
  );
};

export const loginUser = (data) => (dispatch) => {
  return dispatch(
    apiLoginCallBegan({
      url: loginUrl,
      method: "post",
      data: data,
      onStart: rentstateRequested.type,
      onSuccess: loggedInSuccess.type,
      onError: loggedInFailed.type,
    })
  );
};

export const checkLoginStatus = () => {
  return {
    type: checkAuthState.type,
  };
};

export const logOut = () => {
  return {
    type: logOutUser.type,
  };
};

export const updateUsers = (user) => {
  return {
    type: updateUsersData.type,
    user,
  };
};

export const addUser = (user) => {
  return {
    type: addUserData.type,
    user,
  };
};

export const removeUser = (user) => {
  return {
    type: removeUserData.type,
    user,
  };
};

export const sortUsersbyId = (sortBy) => {
  return {
    type: sortUserDataById.type,
    by: sortBy,
  };
};

export const sortUsersbyUsername = (sortBy) => {
  return {
    type: sortUserDataByUsername.type,
    by: sortBy,
  };
};
