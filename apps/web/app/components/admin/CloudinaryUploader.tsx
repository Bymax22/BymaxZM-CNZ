"use client";

import { useState } from "react";

export default function CloudinaryUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
  const publicCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const publicUploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  async function handleUpload() {
    if (!file) return;

    setUploading(true);

    try {
      // If an unsigned preset and public cloud name are available, upload directly from client
      if (publicUploadPreset && publicCloudName) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', publicUploadPreset);

        const uploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${publicCloudName}/auto/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await uploadResponse.json();

        if (data.secure_url) {
          setUrl(data.secure_url);
        } else {
          console.error('Upload failed', data);
          alert('Upload failed, check console for details.');
        }

        return;
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
      formData.append('file', file);
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
      } else {
        console.error('Upload failed', data);
        alert('Upload failed, check console for details.');
      }
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
        }}
        className="mt-2"
      />

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={handleUpload}
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
          <div className="font-semibold mb-1">Copy this URL into your news data:</div>
          <code className="text-xs">{url}</code>
        </div>
      )}
    </div>
  );
}
