import { mockDB } from "@/app/mock/db";
import { useAuthStore } from "@/app/store/auth-store";

export const DebugPanel = () => {
  const { user, token, isAuthenticated } = useAuthStore();
  return (
    <div className="fixed bottom-2 right-2 p-4  border rounded-lg">
      <h3 className="font-bold mb-2">Debug Panel</h3>

      <div className="mb-2">
        <h4>Database State:</h4>
        <pre className="text-xs">{JSON.stringify(mockDB, null, 2)}</pre>
      </div>

      <div>
        <h4>Auth State:</h4>
        <pre className="text-xs">
          {JSON.stringify({ user, token, isAuthenticated }, null, 2)}
        </pre>
      </div>
    </div>
  );
};
