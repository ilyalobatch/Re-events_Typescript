const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

type TModalReducer =
  | { type: "OPEN_MODAL"; payload?: any }
  | { type: "CLOSE_MODAL"; payload?: any };

export const openModal = (payload: any) => {
  return {
    type: OPEN_MODAL,
    payload,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL,
  };
};

const initialState = null;

const modalReducer = (
  state = initialState,
  { type, payload }: TModalReducer
) => {
  switch (type) {
    case OPEN_MODAL:
      const { modalType /*modalProps*/ } = payload;

      return { modalType /*modalProps*/ };

    case CLOSE_MODAL:
      return null;

    default:
      return state;
  }
};

export default modalReducer;
