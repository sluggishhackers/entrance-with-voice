import { NextRequest } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const eventSlug = decodeURIComponent(searchParams.get("eventSlug") || "");
  const name = decodeURIComponent(searchParams.get("name") || "");
  const org = decodeURIComponent(searchParams.get("org") || "");

  await supabase
    .from(process.env.NEXT_PUBLIC_TABLE_NAME as string)
    .insert({ name, org, event_slug: eventSlug });

  return Response.json({ meessage: "welcome!" });
}
