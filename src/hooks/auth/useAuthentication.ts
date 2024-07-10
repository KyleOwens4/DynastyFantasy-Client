import { useContext } from "react";

import {
  AuthenticationContext,
  AuthenticationSession,
} from "../../providers/AuthenticationProvider";

export default function useAuthentication(): AuthenticationSession {
  return useContext(AuthenticationContext);
}
