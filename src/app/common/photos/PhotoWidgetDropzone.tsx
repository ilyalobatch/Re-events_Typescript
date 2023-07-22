// Semantic UI components
import { Header, Icon } from "semantic-ui-react";

// library
import React from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { CSSProperties } from "react";

interface IPhotoWidgetDropzoneProps {
  setFiles: React.Dispatch<any>;
}

const PhotoWidgetDropzone: React.VFC<IPhotoWidgetDropzoneProps> = ({
  setFiles,
}) => {
  const { t } = useTranslation();

  const dropzoneStyles: CSSProperties = {
    border: "3px dashed #eee",
    borderRadius: "5%",
    paddingTop: "30px",
    textAlign: "center",
    transition: "0.15s",
  };

  const dropzoneActive = {
    border: "3px dashed green",
  };

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive
          ? { ...dropzoneStyles, ...dropzoneActive }
          : { ...dropzoneStyles }
      }
    >
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content={t("profile.imageUploader.hint")} />
    </div>
  );
};

export default PhotoWidgetDropzone;
