"use client";

import { createClient } from "@supabase/supabase-js";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TABLE_NAME = process.env.NEXT_PUBLIC_TABLE_NAME || "participants";

export default function Home() {
  const params = useParams();
  const [participants, setParticipants] = useState<
    { name: string; org?: string }[]
  >([]);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  const refresh = async () => {
    const { data } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .eq("event_slug", params.eventSlug);

    setParticipants((data as { name: string; org?: string }[]) || []);
  };

  const subscribe = () => {
    const handleInserts = (data: any) => {
      if (process.env.NEXT_PUBLIC_WITH_GOOGLE_VOICE === "on") {
        fetch("/voice", {
          method: "POST",
          body: JSON.stringify({ name: data.new.name }),
        });
      }

      refresh();
    };

    supabase
      .channel(TABLE_NAME)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: TABLE_NAME,
        },
        handleInserts
      )
      .subscribe();
  };

  useEffect(() => {
    subscribe();
    refresh();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="grid text-center lg:max-w-5xl lg:w-full lg:text-left mt-20">
        <p className="text-2xl font-bold">
          {participants.map((p, index) => (
            <span
              className="text-slate-200 ml-4 bg-black italic first-of-type:ml-0"
              key={index}
            >
              {p.org ? `${p.org} - ` : ""}
              {p.name}
              {index < participants.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>
    </main>
  );
}
