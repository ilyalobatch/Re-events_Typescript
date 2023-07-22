// library
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// helpers
import { dataFromSnapshot } from "../firestore/firestoreService";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../async/asyncReducer";

interface IUseFirestoreCollectionProps {
  query: any;
  data: any;
  deps: any;
}

const useFirestoreCollection = ({
  query,
  data,
  deps,
}: IUseFirestoreCollectionProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncActionStart());
    const unsubscribe = query().onSnapshot(
      (snapshot: any) => {
        const docs = snapshot.docs.map((doc: any) => dataFromSnapshot(doc));
        data(docs);
        dispatch(asyncActionFinish());
      },
      (error: any) => dispatch(asyncActionError(error))
    );
    return () => {
      unsubscribe();
    };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useFirestoreCollection;
