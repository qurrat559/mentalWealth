let userDetails = null;

const setUserDetails = (details) => {
  userDetails = details;
};

const getUserDetails = () => userDetails;

export { setUserDetails, getUserDetails };