import React from "react";
import { Outlet } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { useTheme } from "../../../context/ThemeProvider";
// import ConversationList from "./ConversationList";
import MessageList from "../MessageList/MessageList";
import StatusProfile from "./StatusProfile";

export default function Status() {
  // @ts-ignore
  const { theme } = useTheme();
  return (
    <>
      <div className="flex flex-col pt-16 pb-0 min-w-80 2xl:min-w-96 bg-secondary shadow-inner  h-screen ">
        <div className="px-4 w-full">
          <h4 className="text-lg font-semibold mb-5">Brandon_1203_</h4>

          <StatusProfile
            name="My Status"
            profile_url="/Profile_iamge/fake_profile.jpg"
            time="No Updates"
          />
        </div>

        <h4 className="text-lg font-semibold px-4">Status</h4>

        {/* <Seen Status /> */}
        <div className="flex flex-col my-5 w-full overflow-y-auto  overflow-x-hidden px-4">
          <StatusProfile
            classes="border-[#FCC604]"
            name="Alena Lubin"
            profile_url="/Profile_iamge/fake_profile.jpg"
            time="Today at 12 pm"
          />
          <hr className="border-t border-borderColor" />
          <StatusProfile
            classes="border-[#FCC604]"
            name="Alena Lubin"
            profile_url="https://s3-alpha-sig.figma.com/img/e9ed/d956/9bc13b1d5ff27d479fd12ad692cc1bd5?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FrWZS0E-AsA0Q1zmN7UZ2P8ml~~lPRWvWujeXWcqDiWeArxdQi~Q-FEccneRhh8j8RCJsBVHJCZgUwTYyHlbOrxiByv~AC3Wb1dPH20SP3C6KmN9PiC3ClTRKr8dzUP5WI~DN86L3ZPxOw-syUzhRbd-tmnmOj-uLIqOxjwYWCx-l3Hi51aqReAgp0HIKUCndZNo2myGA0NKoiOh-rffNgzh55UVrXXK1sTN44iA4o~pMzt~y6pesrFWwhqj3Brya0qK00THSErW1iTWmOp69eErcO7c-fBgctUOny-kKo49ZlAY-VCFq-0sj0s~Hn1yf97gxf0ejvczDvI6DuuE~A__"
            time="Today at 12 pm"
          />
          <StatusProfile
            classes="border-[#FCC604]"
            name="Alena Lubin"
            profile_url="/Profile_iamge/fake_profile.jpg"
            time="Today at 12 pm"
          />
          <hr className="border-t border-borderColor" />
          <StatusProfile
            classes="border-[#FCC604]"
            name="Alena Lubin"
            profile_url="https://s3-alpha-sig.figma.com/img/e9ed/d956/9bc13b1d5ff27d479fd12ad692cc1bd5?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FrWZS0E-AsA0Q1zmN7UZ2P8ml~~lPRWvWujeXWcqDiWeArxdQi~Q-FEccneRhh8j8RCJsBVHJCZgUwTYyHlbOrxiByv~AC3Wb1dPH20SP3C6KmN9PiC3ClTRKr8dzUP5WI~DN86L3ZPxOw-syUzhRbd-tmnmOj-uLIqOxjwYWCx-l3Hi51aqReAgp0HIKUCndZNo2myGA0NKoiOh-rffNgzh55UVrXXK1sTN44iA4o~pMzt~y6pesrFWwhqj3Brya0qK00THSErW1iTWmOp69eErcO7c-fBgctUOny-kKo49ZlAY-VCFq-0sj0s~Hn1yf97gxf0ejvczDvI6DuuE~A__"
            time="Today at 12 pm"
          />
          
          <hr className="border-t border-borderColor" />
        </div>

        {/* Viewed Status /> */}
        <h4 className="text-lg font-semibold px-4">Viewed</h4>
        <div className="flex flex-col my-3 w-full overflow-y-auto  overflow-x-hidden px-4">
          <StatusProfile
            // classes="border-[#FCC604]"
            name="Alena Lubin"
            profile_url="/Profile_iamge/fake_profile.jpg"
            time="Today at 12 pm"
          />
          <hr className="border-t border-borderColor" />
          <StatusProfile
            // classes="border-[#FCC604]"
            name="Alena Lubin"
            profile_url="https://s3-alpha-sig.figma.com/img/e9ed/d956/9bc13b1d5ff27d479fd12ad692cc1bd5?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FrWZS0E-AsA0Q1zmN7UZ2P8ml~~lPRWvWujeXWcqDiWeArxdQi~Q-FEccneRhh8j8RCJsBVHJCZgUwTYyHlbOrxiByv~AC3Wb1dPH20SP3C6KmN9PiC3ClTRKr8dzUP5WI~DN86L3ZPxOw-syUzhRbd-tmnmOj-uLIqOxjwYWCx-l3Hi51aqReAgp0HIKUCndZNo2myGA0NKoiOh-rffNgzh55UVrXXK1sTN44iA4o~pMzt~y6pesrFWwhqj3Brya0qK00THSErW1iTWmOp69eErcO7c-fBgctUOny-kKo49ZlAY-VCFq-0sj0s~Hn1yf97gxf0ejvczDvI6DuuE~A__"
            time="Today at 12 pm"
          />
          <hr className="border-t border-borderColor" />
        </div>
      </div>
    </>
  );
}
