export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div>{children}</div>
    </div>
  );
}
