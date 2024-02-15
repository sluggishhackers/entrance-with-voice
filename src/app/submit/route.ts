import { NextRequest } from "next/server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

const TABLE_NAME = process.env.NEXT_PUBLIC_TABLE_NAME || "participants";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const eventSlug = decodeURIComponent(searchParams.get("eventSlug") || "");
  const name = decodeURIComponent(searchParams.get("name") || "");
  const org = decodeURIComponent(searchParams.get("org") || "");
  const contact = decodeURIComponent(searchParams.get("contact") || "");

  await supabase
    .from(TABLE_NAME)
    .insert({ name, org, contact, event_slug: eventSlug });

  return Response.json({ meessage: "반갑습니다!" });
}
