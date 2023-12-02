import { NextRequest } from "next/server";
import fs from "fs";
import util from "util";
import textToSpeech from "@google-cloud/text-to-speech";
import PlaySound from "play-sound";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

const player = PlaySound({});

export async function GET(request: NextRequest) {
  async function play() {
    return new Promise((resolve, reject) => {
      player.play("output.mp3", function (err) {
        if (err && !err.killed) {
          reject(err);
        } else {
          resolve({});
        }
      });
    });
  }

  const searchParams = request.nextUrl.searchParams;
  const name = decodeURIComponent(searchParams.get("name") || "");
  const org = decodeURIComponent(searchParams.get("org") || "");

  await supabase
    .from(process.env.NEXT_PUBLIC_TABLE_NAME as string)
    .insert({ name, org });

  const client = new textToSpeech.TextToSpeechClient();

  // Performs the text-to-speech request
  const [res] = await client.synthesizeSpeech({
    input: { text: `${name} 님이 입장하였습니다.` },
    // Select the language and SSML voice gender (optional)
    voice: { languageCode: "ko-KR", ssmlGender: "FEMALE" },
    // select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
  });

  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  if (res.audioContent) {
    await writeFile("output.mp3", res.audioContent, "binary");
    await play();
  }

  return Response.json({ meessage: "welcome!" });
}
