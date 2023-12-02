"use client";

import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useEffect, useState } from "react";

const { NEXT_PUBLIC_TABLE_NAME } = process.env;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default function Home() {
  const [participants, setParticipants] = useState<
    { name: string; org?: string }[]
  >([]);

  const refresh = async () => {
    const { data } = await supabase
      .from(NEXT_PUBLIC_TABLE_NAME as string)
      .select("*");
    setParticipants(data as { name: string; org?: string }[]);
  };

  const subscribe = () => {
    const handleInserts = () => {
      refresh();
    };

    // Listen to inserts
    supabase
      .channel("yearend2023")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: NEXT_PUBLIC_TABLE_NAME },
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
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/logo.gif"
          alt="Sluggish Hackers"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="grid text-center lg:max-w-5xl lg:w-full lg:text-left">
        <p className="text-2xl font-bold">
          {participants
            .map((p) => `${p.name}${p.org ? `-${p.org}` : ""}`)
            .join(", ")}
        </p>
      </div>
    </main>
  );
}
