"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { auth } from "@/lib/config/firebase";

const AuthGuard = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const session = auth.currentUser;
      console.log("asasa", session);

      // Jika belum login atau role tidak sesuai
      if (!session) {
        router.push("/auth/login");
      }
    };

    checkAuth();
  }, [router]);

  return null;
};

export default AuthGuard;
