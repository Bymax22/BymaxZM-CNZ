"use client";

import { useEffect, useState } from "react";

export default function CloudinaryUploader({ imageUrl, onUpload }: { imageUrl?: string; onUpload?: (url: string) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState<string | null>(imageUrl ?? null);
  const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000').replace(/\/+$/, '');
  const publicCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const publicUploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    setUrl(imageUrl ?? null);
  }, [imageUrl]);

  async function handleUpload(selectedFile: File | null = file) {
    if (!selectedFile) return;

    setUploading(true);

    try {
      if (publicUploadPreset && publicCloudName) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', publicUploadPreset);

        const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${publicCloudName}/auto/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await uploadResponse.json();

        if (data.secure_url) {
          setUrl(data.secure_url);
          if (onUpload) onUpload(data.secure_url);
          return;
        }

        throw new Error(data?.error?.message || 'Cloudinary upload failed');
      }

      const signatureResponse = await fetch(`${backendUrl}/cloudinary/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!signatureResponse.ok) {
        throw new Error('Unable to obtain Cloudinary upload signature from the backend.');
      }

      const signData = await signatureResponse.json();
      const { cloudName, apiKey, timestamp, signature, uploadPreset } = signData;

      if (!cloudName || !apiKey || !timestamp || !signature) {
        throw new Error('Cloudinary backend signature response is missing required data.');
      }

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('api_key', apiKey);
      formData.append('timestamp', String(timestamp));
      formData.append('signature', signature);
      if (uploadPreset) {
        formData.append('upload_preset', uploadPreset);
      }

      const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await uploadResponse.json();

      if (data.secure_url) {
        setUrl(data.secure_url);
        if (onUpload) onUpload(data.secure_url);
        return;
      }

      throw new Error(data?.error?.message || 'Cloudinary upload failed');
    } catch (err) {
      console.error(err);
      alert('Upload error, see console.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow">
      <label className="block text-sm font-medium text-gray-700">Select media</label>
      <input
        type="file"
        accept="video/*,image/*"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0] ?? null;
          setFile(selectedFile);
          if (selectedFile) {
            void handleUpload(selectedFile);
          }
        }}
        className="mt-2"
      />

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => void handleUpload()}
          disabled={!file || uploading}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          {uploading ? 'Uploading…' : 'Upload to Cloudinary'}
        </button>
        {url && (
          <a href={url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline">
            Open uploaded file
          </a>
        )}
      </div>

      {url && (
        <div className="mt-3 p-3 bg-gray-50 rounded text-sm break-words">
          <div className="font-semibold mb-1">Cloudinary URL ready:</div>
          <code className="text-xs">{url}</code>
        </div>
      )}
    </div>
  );
}
