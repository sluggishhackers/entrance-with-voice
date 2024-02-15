"use client";

import Head from "next/head";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const params = useParams();
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [contact, setContact] = useState("");

  const handleChange = (e: any) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "org":
        setOrg(e.target.value);
        break;
      case "contact":
        setOrg(e.target.value);
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setName("");
    setOrg("");
    setContact("");

    (document.getElementById("my_modal_1") as HTMLFormElement).showModal();

    await fetch(
      `/submit?eventSlug=${params.eventSlug}&name=${encodeURIComponent(
        name
      )}&org=${encodeURIComponent(org)}&contact=${encodeURIComponent(contact)}`
    );
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">환영합니다!</h3>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">확인</button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="w-full prose">
        <h1>
          {process.env.NEXT_PUBLIC_ORG_NAME}
          <br />에 오신 것을 환영합니다!
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          onChange={handleChange}
          value={name}
          placeholder="참석자명"
          className="input input-bordered w-full"
        />

        <input
          name="org"
          onChange={handleChange}
          value={org}
          placeholder="소속(선택)"
          className="input input-bordered w-full"
        />

        <input
          name="contact"
          onChange={handleChange}
          value={contact}
          placeholder="연락처(선택)"
          className="input input-bordered w-full"
        />

        <button className="btn w-full" type="submit">
          참석 확인하기
        </button>
      </form>
    </main>
  );
}
