"use client";

import { useEffect } from "react";
import { account } from "@/app/(root)/appwrite";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function VerifyPage() {
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const user = await account.get(); // ✅ Now session cookie exists
        console.log("Logged in user:", user);

        /* await fetch("/api/save-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ $id: user.$id, email: user.email }),
        });

        router.push("/dashboard"); */
      } catch (err) {
        console.error("Error:", err);
        //router.push("/auth/login");
      }
    }, 2000); // Allow short delay for cookie to settle

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
      <h1 className="text-xl font-semibold mt-4">Processing...</h1>
    </div>
  );
}
