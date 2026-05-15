import CloudinaryUploader from '../../components/admin/CloudinaryUploader';

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Upload Media to Cloudinary</h1>
        <p className="mb-6 text-sm text-gray-600">Use this page to upload images or videos and copy the returned Cloudinary URL into your site content.</p>
        <CloudinaryUploader />
      </div>
    </div>
  );
}
