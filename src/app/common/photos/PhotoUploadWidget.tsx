// Semantic UI components
import { Button, Grid, Header } from "semantic-ui-react";

// Components
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

// library
import cuid from "cuid";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

// helpers
import { uploadToFirebaseStorage } from "../../firestore/firebaseService";
import { updateUserProfilePhoto } from "../../firestore/firestoreService";
import { getFileExtension } from "../util/util";

interface IPhotoUploadWidgetProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const PhotoUploadWidget: React.VFC<IPhotoUploadWidgetProps> = ({
  setEditMode,
}) => {
  const { t } = useTranslation();

  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCancelCrop = () => {
    setFiles([]);
    setCropper(null);
  };

  const handleUploadImage = () => {
    setLoading(true);
    const filename = cuid() + "." + getFileExtension(files[0].name);

    cropper.getCroppedCanvas().toBlob((image: any) => {
      const uploadTask = uploadToFirebaseStorage(image, filename);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            snapshot.bytesTransferred / snapshot.totalBytes + 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          toast.error(error.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            updateUserProfilePhoto(downloadURL, filename)
              .then(() => {
                setLoading(false);
                handleCancelCrop();
                setEditMode(false);
              })
              .catch((error) => {
                toast.error(error.message);
                setLoading(false);
              });
          });
        }
      );
    });
  };

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub color="teal" content={t("profile.imageUploader.step1")} />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color="teal" content={t("profile.imageUploader.step2")} />
        {files.length > 0 && (
          <PhotoWidgetCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color="teal" content={t("profile.imageUploader.step3")} />
        {files.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{ minHeight: 200, minWidth: 200, overflow: "hidden" }}
            />
            <Button.Group style={{ marginTop: 5 }}>
              <Button
                loading={loading}
                positive
                icon="check"
                style={{ width: 100 }}
                onClick={handleUploadImage}
              />
              <Button
                icon="close"
                style={{ width: 100 }}
                disabled={loading}
                onClick={handleCancelCrop}
              />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default PhotoUploadWidget;
