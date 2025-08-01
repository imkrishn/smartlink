import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop";

interface Props {
  imageSrc: string;
  onClose: () => void;
  onCropDone: (croppedImage: string) => void;
}

const ImageCropper: React.FC<Props> = ({ imageSrc, onClose, onCropDone }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = (_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  };

  // Call this with a real implementation of image cropping
  const handleCropDone = async () => {
    if (!croppedAreaPixels) return;
    // Call your image cropping logic here
    const dummy = imageSrc; // Replace this with actual cropped image logic
    onCropDone(dummy);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl w-[90vw] max-w-lg">
      <div className="relative w-full h-64 bg-gray-100">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="rect"
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          objectFit="horizontal-cover"
        />
      </div>

      <div className="flex justify-between mt-4">
        <button className="bg-gray-300 px-4 py-1 rounded-md" onClick={onClose}>
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded-md"
          onClick={handleCropDone}
        >
          Crop & Save
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
