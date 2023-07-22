import { SIGN_IN_USER, SIGN_OUT_USER, SWITCH_LANGUAGE } from "./authConstants";
import { LOCATION_CHANGE } from "connected-react-router";

interface ICurrentsUser {
  id: string;
  email: string;
  photoURL: string;
  uid: string;
  displayName: string;
  providerId: string;
  providerData?: any;
}

export interface IAuthState {
  authenticated: boolean;
  currentUser: ICurrentsUser | null;
  prevLocation: any;
  currentLocation: any;
  lang: string | null;
}

type TAuthReducer =
  | { type: "SIGN_IN_USER"; payload: ICurrentsUser }
  | { type: "SIGN_OUT_USER"; payload?: any }
  | { type: "SWITCH_LANGUAGE"; payload: string }
  | { type: "@@router/LOCATION_CHANGE"; payload: any };

const initialState: IAuthState = {
  authenticated: false,
  currentUser: null,
  prevLocation: null,
  currentLocation: null,
  lang: null,
};

const authReducer = (
  state: IAuthState = initialState,
  { type, payload }: TAuthReducer
) => {
  switch (type) {
    case SIGN_IN_USER:
      return {
        ...state,
        authenticated: true,
        currentUser: {
          email: payload.email,
          photoURL: payload.photoURL,
          uid: payload.uid,
          displayName: payload.displayName,
          providerId: payload.providerData[0].providerId,
        } as ICurrentsUser,
      };

    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        currentUser: null,
      };

    case LOCATION_CHANGE:
      return {
        ...state,
        prevLocation: state.currentLocation,
        currentLocation: payload.location,
      };

    case SWITCH_LANGUAGE:
      return {
        ...state,
        lang: payload,
      };

    default:
      return state;
  }
};

export default authReducer;
