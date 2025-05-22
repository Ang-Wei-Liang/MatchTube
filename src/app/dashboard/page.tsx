"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Subscription {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string };
      medium?: { url: string };
      high?: { url: string };
    };
    resourceId: { channelId: string };
  };
}

export default function Dashboard() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubs() {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        const access_token = data.session?.provider_token;

        if (!access_token) {
          setError("No Google access token found. Please sign in again.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              Accept: "application/json",
            },
          }
        );

        if (!res.ok) {
          const errBody = await res.json();
          throw new Error(errBody?.error?.message || "Failed to fetch subscriptions.");
        }

        const json = await res.json();
        setSubs(json.items || []);
      } catch (err: any) {
        setError(err.message || "Unknown error occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchSubs();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your YouTube Subscriptions</h1>
      <ul className="space-y-4">
        {subs.map((sub) => (
          <li key={sub.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
            <img
              src={sub.snippet.thumbnails.default.url}
              alt={sub.snippet.title}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="font-semibold">{sub.snippet.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{sub.snippet.description}</div>
            </div>
          </li>
        ))}
      </ul>
      {subs.length === 0 && <div className="text-center text-gray-500 mt-8">No subscriptions found.</div>}
    </div>
  );
}
