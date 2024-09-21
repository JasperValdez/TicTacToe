import "../assets/icomoon/style.css";
export default function PlayerLabel({
  playerLabel,
  playerBtnCycle,
  handlePlayerLabel,
  label,
  handlePlayerBtnClick,
}) {
  return (
    <>
      <div className="relative p-5 flex items-center gap-4">
        <div className="relative h-[40px]  flex items-center text-[18px] justify-center">
          <i className="icon absolute left-4 icon-account_circle text-[16px] text-black" />

          <input
            type="text"
            className={`h-[40px] text-black  pl-12 pr-5 py-5`}
            onChange={handlePlayerLabel}
            value={playerLabel}
            disabled={playerBtnCycle}
          />
          <div className="absolute flex right-0  group">
          <span className="absolute right-4 top-1/2 translate-y-[-50%]">
            <i className={`icon ${label} h-[40px] text-black group-hover:text-transparent`}/>
          </span>
          <button
            className="absolute right-0 top-1/2 translate-y-[-50%] min-h-[40px] group"
            onClick={handlePlayerBtnClick}
          >
            <span className="inline-flex relative min-w-[40px]  justify-center">
              <i
                className={`icon text-[16px] text-transparent group-hover:text-black ${
                  !playerBtnCycle ? "icon-check" : "icon-edit"
                }`}
              />
            </span>
          </button>
          </div>
          
        </div>
      </div>
    </>
  );
}
