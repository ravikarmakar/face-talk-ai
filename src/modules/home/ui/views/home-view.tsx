"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (!session) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700 p-4 gap-4">
        <h1 className="text-white">Welcome, {session?.user.name}!</h1>
        <Button
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => router.push("/sign-in"),
              },
            })
          }
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default HomeView;
