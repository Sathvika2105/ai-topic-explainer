"use client";

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });

    const data = await res.json();
    setExplanation(data.explanation);
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">
        AI Study Topic Explainer
      </h1>

      <input
        type="text"
        placeholder="Enter a topic (Example: Photosynthesis)"
        className="border p-3 rounded-lg w-80"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button
        onClick={handleExplain}
        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Explain Topic
      </button>

      {loading && <p className="mt-4">Generating explanation...</p>}

      {explanation && (
        <div className="mt-6 border p-4 rounded-lg max-w-xl">
          <h2 className="font-bold">Explanation:</h2>
          <p>{explanation}</p>
        </div>
      )}
    </main>
  );
}