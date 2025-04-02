import React from "react";
import LoadingSkeletonImageDynamic from "../../../components/LoadingSkeletonImageDynamic";
import { FaAngleRight, FaPlay } from "react-icons/fa6";
import { useAppDispatch } from "../../../utils/hooks";
import {
  setViewImage,
  updateViewState,
} from "../../../store/Slices/ViewManagerSlice";
import { useConversationInfo } from "../../../store/api/useConversationInfo";

export default function LinksAndMedia() {
  let dispatch = useAppDispatch();
  let { data, isLoading, refetch } = useConversationInfo();
  const urls = data?.mediaData?.filter((message) => {
    return (
      (message.message_type === "image" || message.message_type === "video") &&
      message.url
    );
  });
  const image_urls = urls?.map((message) => message.url.replace(/\\/g, "/"));
  return (
    <>
      <div className="flex flex-col border border-borderColor bg-otherProfileSidebar px-10 py-2 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
        <div
          onClick={() => {
            dispatch(updateViewState({ showMediaDocLinks: true }));
          }}
          className="flex cursor-pointer items-center justify-between text-sm text-[#959595]"
        >
          <span>Media, links and docs</span>
          <div className="flex items-center gap-1">
            <span>{data?.mediaData.length || 0}</span> <span></span>
            <FaAngleRight />
          </div>
        </div>
        <div
          className={` ${data?.mediaData.length != 0 && "mt-2"} grid grid-cols-2 gap-1 md:grid-cols-3`}
        >
          {data?.mediaData.slice(0, 3).map((message, index) => {
            return (
              <>
                {message.message_type == "image" ? (
                  <div
                    className="h-24 w-full"
                    onClick={() => {
                      dispatch(
                        setViewImage({
                          show_image: true,
                          image_src: image_urls,
                          currentIndex: index,
                        }),
                      );
                    }}
                  >
                    <LoadingSkeletonImageDynamic
                      radius=""
                      className="h-24 w-full cursor-pointer object-cover"
                      image_height="100%"
                      image_url={
                        message.message_type == "image"
                          ? message.url
                          : message.thumbnail
                      }
                      image_width=""
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      dispatch(
                        setViewImage({
                          show_image: true,
                          image_src: image_urls,
                          currentIndex: index,
                        }),
                      );
                    }}
                    className="relative cursor-pointer"
                  >
                    <div className="absolute grid h-full w-full place-content-center">
                      <FaPlay className="h-11 w-11 rounded-full bg-[#0000008F] p-3" />
                    </div>
                    <img
                      className="h-24 w-full cursor-pointer object-cover"
                      src={
                        message.message_type == "video"
                          ? message.thumbnail
                          : message.url
                      }
                      alt=""
                    />
                  </div>
                  // <div
                  //   onClick={() => {
                  //     dispatch(
                  //       setViewImage({
                  //         show_image: true,
                  //         image_src: image_urls,
                  //         currentIndex: index,
                  //       }),
                  //     );
                  //   }}
                  //   className="h-24 w-full cursor-pointer object-cover"
                  // >
                  //   <div className="absolute grid h-full w-full place-content-center">
                  //     <FaPlay className="h-11 w-11 rounded-full bg-[#0000008F] p-3 text-white" />
                  //   </div>
                  //   <LoadingSkeletonImageDynamic
                  //     radius=""
                  //     className="h-24 w-full cursor-pointer object-cover"
                  //     image_height="100%"
                  //     image_url={message.thumbnail}
                  //     image_width=""
                  //   />
                  // </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
