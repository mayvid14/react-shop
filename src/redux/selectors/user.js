export const userState = state => state.user;
export const userSelector = state => {
  const { user } = userState(state);
  return user;
}
export const userErrorSelector = state => {
  const { error } = userState(state);
  return error;
}