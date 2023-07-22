import { Reducer } from "redux";
import {
  CLEAR_COMMENTS,
  CLEAR_EVENTS,
  CLEAR_SELECTED_EVENT,
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  LISTEN_TO_EVENT_CHAT,
  LISTEN_TO_SELECTED_EVENT,
  RETAIN_STATE,
  SET_FILTER,
  SET_START_DATE,
  UPDATE_EVENT,
} from "./eventConstants";

export interface ILatLng {
  lat: number;
  lng: number;
}

interface ILocation {
  address: string;
  latLng: ILatLng;
}

export interface IAttendee {
  id?: string;
  photoURL?: string;
  displayName?: string;
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  hostUid: string;
  hostPhotoURL: string;
  hostedBy: string;
  date: Date;
  isCancelled: boolean;
  venue: ILocation;
  city: ILocation;
  attendees: IAttendee[];
}

interface ICommentReply {
  id: string;
  uid: string;
  displayName: string;
  photoURL: string;
  text: string;
  date: Date;
  parentId: string;
}

export interface IComment {
  id: string;
  uid: string;
  displayName: string;
  photoURL: string;
  text: string;
  date: Date;
  parentId: string;
  childNodes: ICommentReply[];
}

export interface IEventState {
  events: IEvent[];
  comments: IComment[];
  moreEvents: boolean;
  selectedEvent: IEvent | null;
  lastVisible: any;
  filter: string;
  startDate: any;
  retainState: boolean;
}

type TEventReducer =
  | { type: "CREATE_EVENT"; payload: IEvent }
  | { type: "UPDATE_EVENT"; payload: IEvent }
  | { type: "DELETE_EVENT"; payload: string }
  | { type: "FETCH_EVENTS"; payload: any }
  | { type: "LISTEN_TO_EVENT_CHAT"; payload: IComment[] }
  | { type: "LISTEN_TO_SELECTED_EVENT"; payload: IEvent }
  | { type: "CLEAR_COMMENTS"; payload: IComment[] }
  | { type: "CLEAR_EVENTS"; payload: any }
  | { type: "CLEAR_SELECTED_EVENT"; payload: null }
  | { type: "SET_FILTER"; payload: any }
  | { type: "SET_START_DATE"; payload: any }
  | { type: "RETAIN_STATE"; payload: boolean };

const initialState: IEventState = {
  events: [],
  comments: [],
  moreEvents: true,
  selectedEvent: null,
  lastVisible: null,
  filter: "all",
  startDate: new Date(),
  retainState: false,
};

const eventReducer: Reducer<IEventState, TEventReducer> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, payload],
      };

    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter(
            (event: { id: string }) => event.id !== payload?.id
          ),
          payload,
        ],
      };

    case DELETE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((event: IEvent) => event.id !== payload),
        ],
      };

    case FETCH_EVENTS:
      return {
        ...state,
        events: [...state.events, ...payload.events],
        moreEvents: payload.moreEvents,
        // lastVisible: payload.lastVisible,
      };

    case LISTEN_TO_EVENT_CHAT:
      return {
        ...state,
        comments: payload,
      };

    case LISTEN_TO_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: payload,
      };

    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: [],
      };

    case CLEAR_EVENTS:
      return {
        ...state,
        events: [],
        moreEvents: true,
        lastVisible: null,
      };

    case CLEAR_SELECTED_EVENT:
      return {
        ...state,
        selectedEvent: null,
      };

    case SET_FILTER:
      return {
        ...state,
        retainState: false,
        moreEvents: true,
        filter: payload,
      };

    case SET_START_DATE:
      return {
        ...state,
        retainState: false,
        moreEvents: true,
        startDate: payload,
      };

    case RETAIN_STATE:
      return {
        ...state,
        retainState: true,
      };

    default:
      return state;
  }
};

export default eventReducer;
