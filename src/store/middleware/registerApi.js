import axios from "axios";
import * as actions from "../api";

const loginApi =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiRegisterCallBegan.type) return next(action);

    const { url, method, data, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });

    next(action);

    try {
      const response = await axios.request({
        baseURL: "/auth",
        url,
        method,
        data,
      });
      // General
      dispatch(actions.apiRegisterCallSuccess(response.data));
      // Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      // General
      dispatch(actions.apiRegisterCallFailed(error.message));
      // Specific
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default loginApi;
