"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");

  const handleChange = (e: any) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "org":
        setOrg(e.target.value);
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setName("");
    setOrg("");

    (document.getElementById("my_modal_1") as HTMLFormElement).showModal();

    await fetch(
      `/submit?name=${encodeURIComponent(name)}&org=${encodeURIComponent(org)}`
    );
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">환영합니다!</h3>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="w-full prose">
        <h1>
          슬러기시 해커스
          <br />
          게으르고 발그레한 연말 파티
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
        <button className="btn w-full" type="submit">
          참석 확인하기
        </button>
      </form>
    </main>
  );
}
