import { IEvent } from "./eventReducer";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import {
  dataFromSnapshot,
  fetchEventsFromFirestore,
} from "../../app/firestore/firestoreService";
import {
  CLEAR_EVENTS,
  CLEAR_SELECTED_EVENT,
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENTS,
  LISTEN_TO_EVENT_CHAT,
  LISTEN_TO_SELECTED_EVENT,
  SET_FILTER,
  SET_START_DATE,
  UPDATE_EVENT,
} from "./eventConstants";

export const fetchEvents = (
  filter: string,
  startDate: any,
  limit: number,
  lastDocSnapshot?: IEvent | null
) => {
  return async function (dispatch: any) {
    dispatch(asyncActionStart());

    try {
      const snapshot = await fetchEventsFromFirestore(
        filter,
        startDate,
        limit,
        lastDocSnapshot
      ).get();
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const moreEvents = snapshot.docs.length >= limit;
      const events = snapshot.docs.map((doc) => dataFromSnapshot(doc));
      dispatch({
        type: FETCH_EVENTS,
        payload: { events, moreEvents, lastVisible },
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
};

export const setFilter = (value: string) => {
  return function (dispatch: any) {
    dispatch(clearEvents());
    dispatch({ type: SET_FILTER, payload: value });
  };
};

export const setStartDate = (date: any) => {
  return function (dispatch: any) {
    dispatch(clearEvents());
    dispatch({ type: SET_START_DATE, payload: date });
  };
};

export const listenToSelectedEvent = (event: IEvent) => {
  return {
    type: LISTEN_TO_SELECTED_EVENT,
    payload: event,
  };
};

export function clearSelectedEvent() {
  return {
    type: CLEAR_SELECTED_EVENT,
  };
}

export const createEvent = (event: IEvent) => {
  return {
    type: CREATE_EVENT,
    payload: event,
  };
};

export const updateEvent = (event: IEvent) => {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
};

export const deleteEvent = (eventId: string) => {
  return {
    type: DELETE_EVENT,
    payload: eventId,
  };
};

export const listenToEventChat = (comments: any) => {
  return {
    type: LISTEN_TO_EVENT_CHAT,
    payload: comments,
  };
};

export const clearEvents = () => {
  return {
    type: CLEAR_EVENTS,
  };
};
