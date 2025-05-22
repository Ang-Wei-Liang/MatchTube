'use client';

import './globals.css';

import Image from 'next/image';
import Link from 'next/link';

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 transition hover:scale-[1.02] hover:shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-yellow-50 to-white dark:from-gray-900 dark:to-gray-950">
      <main className="max-w-5xl w-full space-y-16 text-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight text-yellow-500 drop-shadow-sm">
            Find Your YouTube Tribe
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with people who share your YouTube interests. 
            Import your subscriptions and match with like-minded viewers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth"
              className="px-6 py-3 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition"
            >
              Sign in with Google
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <FeatureCard 
            title="Import Subscriptions"
            description="Securely import your YouTube subscriptions with one click."
          />
          <FeatureCard 
            title="Find Matches"
            description="Get matched with users who share your interests."
          />
          <FeatureCard 
            title="Connect"
            description="Make new friends with similar YouTube tastes."
          />
        </div>
      </main>
    </div>
  );
}

