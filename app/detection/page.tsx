"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ResumeDetectionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult("");
    }
  }

  async function handleDetect() {
    if (!file) return;
    setLoading(true);
    setResult("");
    // Read PDF as base64
    const reader = new FileReader();
    reader.onload = async function (ev) {
      const base64 = (ev.target?.result as string)?.split(",")[1];
      // Call Gemini API endpoint (replace with your actual endpoint and key)
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Detect if this resume is fake or real. Give a short explanation.\n\nPDF (base64): ${base64}` }] }],
        }),
      });
      const data = await response.json();
      setResult(data?.candidates?.[0]?.content?.parts?.[0]?.text || "No result");
      setLoading(false);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
              Resume Fakeness Detection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={e => {
                e.preventDefault();
                handleDetect();
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
              <Button
                type="submit"
                disabled={!file || loading}
                className="w-full"
              >
                {loading ? "Detecting..." : "Detect Fakeness"}
              </Button>
            </form>
            {result && (
              <div className="mt-6 p-4 bg-muted rounded shadow">
                <h2 className="font-semibold mb-2">Detection Result:</h2>
                <pre className="whitespace-pre-wrap text-sm">{result}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
