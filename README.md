# Entrance with voice

커뮤니티 행사 입장 등록을 도와주는 페이지입니다. 참석자가 이름을 입력하면 실시간으로 참석자 명단이 갱신되고 참석자를 호명하는 음성이 울립니다.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsluggishhackers%2Fentrance-with-voice&env=SUPABASE_KEY,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_ORG_NAME)

## 구성

1. 페이지 - /[eventSlug]
    - 입장 등록 화면

2. 페이지 - /welcome/[eventSlug]
     - 현재 입장한 전체 참석자 명단 화면

3. API - `GET` /submit
    - 참석자를 등록하고 음성이 재생되는 API route

## 적용하기

### 0. 준비물

1. [github](https://github.com)
2. [supabase](https://supabase.com)
3. [vercel](https://vercel.com) (위 github 계정과 연동하는 것을 추천합니다)

### 1. supabase 가입 및 설정하기

1. [supabase](https://supabase.com)에 가입합니다.
2. 새로운 프로젝트를 생성합니다.
3. 생성한 프로젝트 페이지에서 왼쪽 메뉴를 통해 Project Settings -> API 메뉴로 이동합니다.
4. URL 및 Project API keys 에 있는 anon/public, service_role/secret 키 정보를 확인합니다.

### 2. table 생성하기 (개발자를 위한 가이드)

1. 다음 쿼리를 복사하여 테이블을 생성합니다.

   ```sql
   create table participants (
        id bigint generated by default as identity primary key,
        created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
        name text not null,
        event_slug text not null,
        org text);
   ```

2. Table Editor -> RLS 설정에서 `Enable read access for all users` Policy를 추가합니다.
3. Database -> Replication 설정에서 `participants` 테이블을 추가합니다 ([참고 문서](https://supabase.com/docs/guides/realtime#realtime-api))

### 3. 배포하기

1. 위 `Deploy` 버튼을 클릭합니다.
2. 필요한 환경변수를 입력합니다.

   - `SUPABASE_KEY`: service_role/secret
   - `NEXT_PUBLIC_SUPABASE_URL`: URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anon/public
   - `NEXT_PUBLIC_ORG_NAME`: 조직명

### 4. GCP text-to-speech API 등록하기 (선택)

- TODO

## 사용된 기술

- [Next.js](https://nextjs.org)
- [GCP text-to-speech API](https://cloud.google.com/text-to-speech/docs)
- [Supabase realtime database](https://supabase.com/docs/guides/realtime)
