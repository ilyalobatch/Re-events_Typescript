// library
import { toast } from "react-toastify";

// helpers
import firebase from "../config/firebase";
import { setUserProfileData } from "./firestoreService";

interface ICredentials {
  email: string;
  password: string;
  displayName?: string;
}

export const firebaseObjectToArray = (snapshot: any) => {
  if (snapshot) {
    return Object.entries(snapshot).map((element) =>
      Object.assign({}, element[1], { id: element[0] })
    );
  }
};

export const signInWithEmail = (credentials: ICredentials) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password);
};

export const signOutFirebase = () => {
  return firebase.auth().signOut();
};

export const registerInFirebase = async (credentials: ICredentials) => {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password);

    await result.user?.updateProfile({
      displayName: credentials.displayName,
    });
    await setUserProfileData(result.user);
  } catch (error) {
    throw error;
  }
};

export const socialLogin = async (selectedProvider: string) => {
  let provider: any;
  if (selectedProvider === "facebook") {
    provider = new firebase.auth.FacebookAuthProvider();
  }

  if (selectedProvider === "google") {
    provider = new firebase.auth.GoogleAuthProvider();
  }

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    if (result.additionalUserInfo?.isNewUser) {
      await setUserProfileData(result.user);
    }
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const updateUserPassword = (credentials: { newPassword: string }) => {
  const user = firebase.auth().currentUser;

  return user?.updatePassword(credentials.newPassword);
};

export const uploadToFirebaseStorage = (file: any, filename: string) => {
  const user = firebase.auth().currentUser;
  const storageRef = firebase.storage().ref();

  return storageRef.child(`${user?.uid}/user_images/${filename}`).put(file);
};

export const deleteFromFirebaseStorage = (filename: string) => {
  const userUid = firebase.auth().currentUser?.uid;
  const storageRef = firebase.storage().ref();
  const photoRef = storageRef.child(`${userUid}/user_images/${filename}`);

  return photoRef.delete();
};

export const addEventChatComment = (
  eventId: string,
  values: { comment: string; parentId: string | number }
) => {
  const user = firebase.auth().currentUser;
  const newComment = {
    displayName: user?.displayName,
    photoURL: user?.photoURL,
    uid: user?.uid,
    text: values.comment,
    date: Date.now(),
    parentId: values.parentId,
  };

  return firebase.database().ref(`chat/${eventId}`).push(newComment);
};

export const getEventChatRef = (eventId: string) => {
  return firebase.database().ref(`chat/${eventId}`).orderByKey();
};
