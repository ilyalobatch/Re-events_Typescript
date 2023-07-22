import {
  CLEAR_FOLLOWINGS,
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_FOLLOWERS,
  LISTEN_TO_FOLLOWINGS,
  LISTEN_TO_SELECTED_USER_PROFILE,
  LISTEN_TO_USER_EVENTS,
  LISTEN_TO_USER_PHOTOS,
  SET_FOLLOW_USER,
  SET_UNFOLLOW_USER,
} from "./profileContansts";

export interface IUser {
  id: string;
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  followerCount: number;
  followingCount: number;
  createdAt: number | Date;
  description: string;
}

export interface IPhotos {
  id: string;
  url: string;
  name: string;
}

export interface IProfileEvents {
  id: string;
  title: string;
  category: string;
  date: Date;
}

export interface IProfileState {
  currentUserProfile: IUser | null;
  selectedUserProfile: IUser | null;
  photos?: IPhotos[];
  profileEvents?: IProfileEvents[];
  followers?: IUser[];
  followings?: IUser[];
  followingUser?: boolean;
}

type TProfileReducer =
  | {
      type: "LISTEN_TO_CURRENT_USER_PROFILE";
      payload: IUser | null;
    }
  | {
      type: "LISTEN_TO_SELECTED_USER_PROFILE";
      payload: IUser | null;
    }
  | { type: "LISTEN_TO_USER_PHOTOS"; payload?: IPhotos[] }
  | { type: "LISTEN_TO_USER_EVENTS"; payload?: IProfileEvents[] }
  | { type: "LISTEN_TO_FOLLOWERS"; payload?: IUser[] }
  | { type: "LISTEN_TO_FOLLOWINGS"; payload?: IUser[] }
  | { type: "SET_FOLLOW_USER"; payload?: boolean }
  | { type: "SET_UNFOLLOW_USER"; payload?: boolean }
  | {
      type: "CLEAR_FOLLOWINGS";
      payload?: IUser[];
    };

const initialState: IProfileState = {
  currentUserProfile: null,
  selectedUserProfile: null,
  photos: [],
  profileEvents: [],
  followers: [],
  followings: [],
  followingUser: false,
};

const profileReducer = (
  state: IProfileState = initialState,
  { type, payload }: TProfileReducer
) => {
  switch (type) {
    case LISTEN_TO_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: payload,
      };

    case LISTEN_TO_SELECTED_USER_PROFILE:
      return {
        ...state,
        selectedUserProfile: payload,
      };

    case LISTEN_TO_USER_PHOTOS:
      return {
        ...state,
        photos: payload,
      };

    case LISTEN_TO_USER_EVENTS:
      return {
        ...state,
        profileEvents: payload,
      };

    case LISTEN_TO_FOLLOWERS:
      return {
        ...state,
        followers: payload,
      };

    case LISTEN_TO_FOLLOWINGS:
      return {
        ...state,
        followings: payload,
      };

    case SET_FOLLOW_USER:
      return {
        ...state,
        followingUser: true,
      };

    case SET_UNFOLLOW_USER:
      return {
        ...state,
        followingUser: false,
      };

    case CLEAR_FOLLOWINGS:
      return {
        ...state,
        followers: [],
        followings: [],
      };

    default: {
      return state;
    }
  }
};

export default profileReducer;
