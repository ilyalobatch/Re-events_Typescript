// Semantic UI components
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";

// Components
import PhotoUploadWidget from "../../../app/common/photos/PhotoUploadWidget";

// library
import React, { useState, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// helpers
import useFirestoreCollection from "../../../app/hooks/useFirestoreCollection";
import { deleteFromFirebaseStorage } from "../../../app/firestore/firebaseService";
import {
  deletePhotoFromCollection,
  getUserPhotos,
  setMainPhoto,
} from "../../../app/firestore/firestoreService";
import { listenToUserPhotos } from "../profileActions";
import { WindowContext } from "../../../app/context/WindowContext";
import { IPhotos, IUser } from "../profileReducer";
import { RootState, useAppDispatch } from "../../../app/store/configureStore";

interface IPhotosTabProps {
  profile: IUser;
  isCurrentUser: boolean;
}

const PhotosTab: React.VFC<IPhotosTabProps> = ({ profile, isCurrentUser }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isTablet, isMobile } = useContext(WindowContext);

  const { loading } = useSelector((state: RootState) => state.async);
  const { photos } = useSelector((state: RootState) => state.profile);

  const [editMode, setEditMode] = useState(false);
  const [updating, setUpdating] = useState({ isUpdating: false, target: null });
  const [deleting, setDeleting] = useState({ isDeleting: false, target: null });

  const cardsPerRow = useMemo(() => {
    switch (true) {
      case isTablet:
        return 3;
      case isMobile:
        return 2;
      default:
        return 5;
    }
  }, [isTablet, isMobile]);

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos: IPhotos) => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  async function handleSetMainPhoto(photo: IPhotos, target: any) {
    setUpdating({ isUpdating: true, target });
    try {
      await setMainPhoto(photo);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUpdating({ isUpdating: false, target: null });
    }
  }

  async function handleDeletePhoto(photo: IPhotos, target: any) {
    setDeleting({ isDeleting: true, target });
    try {
      await deleteFromFirebaseStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeleting({ isDeleting: false, target: null });
    }
  }

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={t("profile.panes.photos.label")}
          />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              floated="right"
              basic
              content={
                editMode
                  ? t("profile.panes.photos.cancelEdit")
                  : t("profile.panes.photos.edit")
              }
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotoUploadWidget setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={cardsPerRow}>
              {photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} wrapped />
                  <Button.Group fluid widths={2}>
                    <Button
                      name={photo.id}
                      loading={
                        updating.isUpdating && updating.target === photo.id
                      }
                      basic
                      color="green"
                      content={t("profile.panes.photos.main")}
                      disabled={photo.url === profile.photoURL}
                      onClick={(e) =>
                        handleSetMainPhoto(
                          photo,
                          (e.target as HTMLButtonElement).name
                        )
                      }
                    />
                    <Button
                      name={photo.id}
                      loading={
                        deleting.isDeleting && deleting.target === photo.id
                      }
                      basic
                      color="red"
                      icon="trash"
                      disabled={photo.url === profile.photoURL}
                      onClick={(e) =>
                        handleDeletePhoto(
                          photo,
                          (e.target as HTMLButtonElement).name
                        )
                      }
                    />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default PhotosTab;
