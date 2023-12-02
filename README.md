# Entrance with voice

커뮤니티 행사 입장 등록을 도와주는 페이지입니다. 참석자가 이름을 입력하면 실시간으로 참석자 명단이 갱신되고 참석자를 호명하는 음성이 울립니다.

## 구성

1. 페이지 - /
    - 입장 등록 화면

2. 페이지 - /welcome
     - 현재 입장한 전체 참석자 명단 화면

3. API - `GET` /submit
    - 참석자를 등록하고 음성이 재생되는 API route

## 적용하기

### GCP text-to-speech API 등록하기

- TODO

### supabase 가입 및 설정하기

- TODO

## 사용된 기술

- [Next.js](https://nextjs.org)
- [GCP text-to-speech API](https://cloud.google.com/text-to-speech/docs)
- [Supabase realtime database](https://supabase.com/docs/guides/realtime)
