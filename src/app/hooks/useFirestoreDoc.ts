// library
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// helpers
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../async/asyncReducer";
import { dataFromSnapshot } from "../firestore/firestoreService";

interface IUseFirestoreDocProps {
  query: any;
  data: any;
  deps: any;
  shouldExecute?: boolean;
}

const useFirestoreDoc = ({
  query,
  data,
  deps,
  shouldExecute = true,
}: IUseFirestoreDocProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!shouldExecute) {
      return;
    }
    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      (snapshot: any) => {
        if (!snapshot.exists) {
          dispatch(
            asyncActionError({
              code: "not-found",
              message: "Could not find document",
            })
          );

          return;
        }

        data(dataFromSnapshot(snapshot));
        dispatch(asyncActionFinish());
      },
      (error: any) => dispatch(asyncActionError(error))
    );
    return () => {
      unsubscribe();
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useFirestoreDoc;
