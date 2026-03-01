"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** This page has been removed. Redirect visitors to home. */
export default function DetectionPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return null;
}
