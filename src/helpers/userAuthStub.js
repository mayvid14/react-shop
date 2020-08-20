export const login = ({ username, password }) => username.trim() === password.trim();
export const logout = () => true;