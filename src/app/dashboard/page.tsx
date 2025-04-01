"use client";
import { PrivateRoute } from "../components/auth/private-route";
import { useBearStore } from "../store/store";

export default function Dashboard() {
  const bears = useBearStore((state) => state.bears);
  const { increasePopulation, decreasePopulation } = useBearStore();
  return (
    <PrivateRoute>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-8">
          <div className="font-bold text-3xl text-center">
            Protected Content
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-light text-neutral-500">
              Bear Counter
            </h1>
            <div className="text-2xl font-medium text-neutral-700 bg-neutral-100 rounded-lg p-4">
              {bears}
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={increasePopulation}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-all font-medium"
              >
                Increase
              </button>
              <button
                onClick={decreasePopulation}
                className="px-4 py-2 border-2 border-neutral-300 hover:border-neutral-400 rounded-lg transition-all font-medium"
              >
                Decrease
              </button>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
