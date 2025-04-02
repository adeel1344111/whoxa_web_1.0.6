import { useAppSelector } from "../../../utils/hooks";

export default function Participants() {
  const ConnectedUser = useAppSelector((state) => state.ConnectedUser);
  // console.log(ConnectedUser, "ConnectedUser");

  return (
    <>
      <div className="flex w-full flex-col gap-y-5 px-5">
        {ConnectedUser.map((user) => {
          return (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <img
                    className="h-10 w-10 rounded-lg object-cover"
                    src={user.profile_image}
                    alt=""
                  />
                  <div className="flex flex-col">
                    <div>{user.first_name}</div>
                    <div className="text-sm text-lightText">
                      {user.user_name}
                    </div>
                  </div>
                </div>
                <div className="rounded-lg bg-[#FDE693] text-black px-3 py-1">Joined</div>
              </div>
            </>
          );
        })}

        {/* <div className="flex justify-between">
          <div className="flex gap-x-4">
            <img
              className="h-8 w-8 rounded-lg"
              src="https://s3-alpha-sig.figma.com/img/df80/8745/d4eeae509bbfb902288411fb819999c2?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=p0SL2-PKflnGoFHtFMI3tldULcqofBd7gu5SPvOK9StofGNT8gudakMkD7pABD1ejwSSGnTEg3qbstNJR5sk9C3TVlA8GzJCeyZDcTvgnLiTowGlQxN8vTqmK-oj4s4J5KZ~RNor1tIDS58eiq3aq8iuoh1awWQiMkDplK7B~pcsHPxX3xufi7BD5uUfBGfsa44Fz7yyG~Lgf6XrO3cnwM7~nNivt6B90-wWg1rIQ2n6SYc8lu1sCkXsM1ieb8CsTQ6GSXg3jhkfuRFFS-Hpfk-oeb4EhdwfHQNnE4cLL~OUgiKVXj-soyN9Sx26rgSyiZx8UhRA74pR88XSCeKLfg__"
              alt=""
            />
            <div>Harry Luthar</div>
          </div>
          <div className="rounded-lg bg-[#FDE693] px-3 py-1 text-black">
            Join
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-x-4">
            <img
              className="h-8 w-8 rounded-lg"
              src="https://s3-alpha-sig.figma.com/img/df80/8745/d4eeae509bbfb902288411fb819999c2?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=p0SL2-PKflnGoFHtFMI3tldULcqofBd7gu5SPvOK9StofGNT8gudakMkD7pABD1ejwSSGnTEg3qbstNJR5sk9C3TVlA8GzJCeyZDcTvgnLiTowGlQxN8vTqmK-oj4s4J5KZ~RNor1tIDS58eiq3aq8iuoh1awWQiMkDplK7B~pcsHPxX3xufi7BD5uUfBGfsa44Fz7yyG~Lgf6XrO3cnwM7~nNivt6B90-wWg1rIQ2n6SYc8lu1sCkXsM1ieb8CsTQ6GSXg3jhkfuRFFS-Hpfk-oeb4EhdwfHQNnE4cLL~OUgiKVXj-soyN9Sx26rgSyiZx8UhRA74pR88XSCeKLfg__"
              alt=""
            />
            <div>Harry Luthar</div>
          </div>
          <div className="rounded-lg bg-green-500 px-3 py-1">Join</div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-x-4">
            <img
              className="h-8 w-8 rounded-lg"
              src="https://s3-alpha-sig.figma.com/img/df80/8745/d4eeae509bbfb902288411fb819999c2?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=p0SL2-PKflnGoFHtFMI3tldULcqofBd7gu5SPvOK9StofGNT8gudakMkD7pABD1ejwSSGnTEg3qbstNJR5sk9C3TVlA8GzJCeyZDcTvgnLiTowGlQxN8vTqmK-oj4s4J5KZ~RNor1tIDS58eiq3aq8iuoh1awWQiMkDplK7B~pcsHPxX3xufi7BD5uUfBGfsa44Fz7yyG~Lgf6XrO3cnwM7~nNivt6B90-wWg1rIQ2n6SYc8lu1sCkXsM1ieb8CsTQ6GSXg3jhkfuRFFS-Hpfk-oeb4EhdwfHQNnE4cLL~OUgiKVXj-soyN9Sx26rgSyiZx8UhRA74pR88XSCeKLfg__"
              alt=""
            />
            <div>Harry Luthar</div>
          </div>
          <div className="rounded-lg bg-green-500 px-3 py-1">Join</div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-x-4">
            <img
              className="h-8 w-8 rounded-lg"
              src="https://s3-alpha-sig.figma.com/img/df80/8745/d4eeae509bbfb902288411fb819999c2?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=p0SL2-PKflnGoFHtFMI3tldULcqofBd7gu5SPvOK9StofGNT8gudakMkD7pABD1ejwSSGnTEg3qbstNJR5sk9C3TVlA8GzJCeyZDcTvgnLiTowGlQxN8vTqmK-oj4s4J5KZ~RNor1tIDS58eiq3aq8iuoh1awWQiMkDplK7B~pcsHPxX3xufi7BD5uUfBGfsa44Fz7yyG~Lgf6XrO3cnwM7~nNivt6B90-wWg1rIQ2n6SYc8lu1sCkXsM1ieb8CsTQ6GSXg3jhkfuRFFS-Hpfk-oeb4EhdwfHQNnE4cLL~OUgiKVXj-soyN9Sx26rgSyiZx8UhRA74pR88XSCeKLfg__"
              alt=""
            />
            <div>Harry Luthar</div>
          </div>
          <div className="rounded-lg bg-[#FDE693] px-3 py-1 text-black">
            Join
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-x-4">
            <img
              className="h-8 w-8 rounded-lg"
              src="https://s3-alpha-sig.figma.com/img/df80/8745/d4eeae509bbfb902288411fb819999c2?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=p0SL2-PKflnGoFHtFMI3tldULcqofBd7gu5SPvOK9StofGNT8gudakMkD7pABD1ejwSSGnTEg3qbstNJR5sk9C3TVlA8GzJCeyZDcTvgnLiTowGlQxN8vTqmK-oj4s4J5KZ~RNor1tIDS58eiq3aq8iuoh1awWQiMkDplK7B~pcsHPxX3xufi7BD5uUfBGfsa44Fz7yyG~Lgf6XrO3cnwM7~nNivt6B90-wWg1rIQ2n6SYc8lu1sCkXsM1ieb8CsTQ6GSXg3jhkfuRFFS-Hpfk-oeb4EhdwfHQNnE4cLL~OUgiKVXj-soyN9Sx26rgSyiZx8UhRA74pR88XSCeKLfg__"
              alt=""
            />
            <div>Harry Luthar</div>
          </div>
          <div className="rounded-lg bg-[#FDE693] px-3 py-1 text-black">
            Join
          </div>
        </div> */}
      </div>
    </>
  );
}
