export default function Home() {
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
        <h1>슬러기시 해커스</h1>
      </div>
    </main>
  );
}
