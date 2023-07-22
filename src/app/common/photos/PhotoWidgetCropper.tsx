// library
import React, { useRef } from "react";
import Cropper from "react-cropper";

// assets
import "cropperjs/dist/cropper.css";

interface IPhotoWidgetCropperProps {
  setCropper: React.Dispatch<any>;
  imagePreview: string;
}

const PhotoWidgetCropper: React.VFC<IPhotoWidgetCropperProps> = ({
  setCropper,
  imagePreview,
}) => {
  const cropperRef = useRef<any>(null);

  return (
    <Cropper
      ref={cropperRef}
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      initialAspectRatio={1}
      preview=".img-preview"
      viewMode={1}
      dragMode="move"
      guides={false}
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={() => setCropper(cropperRef.current.cropper)}
    />
  );
};

export default PhotoWidgetCropper;
