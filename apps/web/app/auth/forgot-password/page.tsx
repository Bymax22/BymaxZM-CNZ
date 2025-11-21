export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <p className="text-sm text-gray-600">Enter your email to receive password reset instructions.</p>
        {/* Minimal placeholder form */}
        <form className="mt-4 space-y-3">
          <input name="email" type="email" placeholder="Email" className="w-full border rounded px-3 py-2" />
          <button type="submit" className="w-full bg-amber-500 text-white py-2 rounded">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
}
