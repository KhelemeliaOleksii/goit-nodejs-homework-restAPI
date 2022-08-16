// export { default } from './Auth';

import getCurrent from "./getCurrent";
import login from "./login";
import signup from "./signup";
import logout from "./logout";
import setSubscription from "./setSubscription";
import setAvatar from "./setAvatar";
import verifyEmail from "./verifyEmail";
import resendVerifyEmail from "./resendVerifyEmail";

const ctrls = {
  signup,
  login,
  getCurrent,
  logout,
  setSubscription,
  setAvatar,
  verifyEmail,
  resendVerifyEmail,
};

export default ctrls;
