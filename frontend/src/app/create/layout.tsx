import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Everything inside the /admin folder is now securely locked behind your token!
    <ProtectedRoute>
      <div className="admin-container">
        {children}
      </div>
    </ProtectedRoute>
  );
}