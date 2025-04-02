import { useAppDispatch, useAppSelector } from "../../../../utils/hooks";
import { useTheme } from "../../../../context/ThemeProvider";
import { useEffect, useState } from "react";
import { useFile } from "../../../../context/FileProvider";
import { setViewImage } from "../../../../store/Slices/ViewManagerSlice";
import { RxCross2 } from "react-icons/rx";
// import { generateVideoThumbnails } from "@rajesh896/video-thumbnails-generator"; // Import the package
import { updateSendMessageData } from "../../../../store/Slices/SendMessageSlice";
import Skeleton from "react-loading-skeleton";
import { FaPlay } from "react-icons/fa6";
import LoadingSkeletonImageDynamic from "../../../../components/LoadingSkeletonImageDynamic";
import generateVideoThumbnail from "../../../../utils/generateVideoThumbnails";

export default function ShowSelectedFile({
  progress,
  sendMessageLoading,
}: {
  progress: number;
  sendMessageLoading: boolean;
}) {
  const dispatch = useAppDispatch();
  const messageData = useAppSelector((state) => state.SendMessageData);
  const { selectedFile, setSelectedFile } = useFile();
  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  // @ts-ignore
  const { theme } = useTheme();

  useEffect(() => {
    if (selectedFile) {
      if (messageData.message_type === "video") {
        setThumbnail("");
        generateThumbnail();
        setSelectedFileUrl(URL.createObjectURL(selectedFile));
        return;
      }
      setSelectedFileUrl(URL.createObjectURL(selectedFile));
    }
  }, [selectedFile]);

  async function generateThumbnail() {
    // let thumbnailFile = await generateVideoThumbnails(selectedFile!, 1, "png");
    generateVideoThumbnail(selectedFile!, 1, 20).then(
      (thumbnailImage: string) => {
        // console.log(thumbnailImage, "thumbnailImage+++++++++++++++++++++");

        setThumbnail(thumbnailImage);
        dispatch(
          updateSendMessageData({
            thumbnail_url: thumbnailImage,
          }),
        );
      },
    );
  }

  // console.log(thumbnail, "thumbnail");

  const handleImageClick = (image_url: string) => {
    // console.log(image_url, "image_url");

    dispatch(
      setViewImage({
        show_image: true,
        image_src: [image_url],
        currentIndex: 0,
      }),
    );
  };

  return (
    <>
      <div
        className={` ${
          selectedFile != null
            ? "visible translate-y-3"
            : "invisible translate-y-20 opacity-0"
        } -left- absolute max-w-96 bottom-3 z-10 border ${theme === "dark" ? "border-[#EEEEEE14]" : ""} w-full rounded-xl bg-primary transition-all duration-500 sm:-left-0`}
      >
        <div className="relative">
          <RxCross2
            onClick={() => {
              setSelectedFile(null);
              setTimeout(() => {
                setSelectedFileUrl("");
                dispatch(
                  updateSendMessageData({
                    thumbnail_url: "",
                    message_type: "",
                  }),
                );
              }, 500);
            }}
            className="absolute right-3 top-3  z-10 h-10 w-10 cursor-pointer rounded-full bg-secondary p-2"
          />

          {/* Show uploading percentage ====================================================================================*/}
          {sendMessageLoading && (
            <div className="absolute inset-0 grid h-full w-full place-content-center rounded-full">
              {/* Outer circle with border progress */}
              <div
                className="absolute inset-0 mx-auto my-auto h-44 w-44 rounded-full transition-all duration-500 ease-in-out"
                style={{
                  background: `conic-gradient(#facc15 ${progress * 3.6}deg, ${theme === "dark" ? "#eeeeee14" : "#F2F2F2"} 0deg)`,
                }}
              ></div>

              {/* Inner circle background to create ring effect */}
              <div className="absolute inset-[3px] mx-auto my-auto flex h-[10.5rem] w-[10.5rem] items-center justify-center rounded-full bg-primary">
                <div className="text-center">
                  <p className="mb-1 text-sm capitalize text-yellow-400">
                    Sending {messageData.message_type}
                  </p>
                  <span className="text-2xl font-semibold text-yellow-400">
                    {progress}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {messageData.message_type == "video" && (
            <div className="">
              {thumbnail ? (
                <>
                  {/* <img
                    src={thumbnail}
                    // alt="Video Thumbnail"
                    className="h-44 w-[17rem] rounded-xl object-cover lg:h-60 lg:w-96"
                    onClick={() => handleImageClick(thumbnail)}
                  /> */}
                  <div
                    onClick={() => {
                      // handleImageClick(selectedFileUrl);
                    }}
                    className={`relative h-44 sm:h-52 w-full overflow-hidden rounded-lg xl:h-60 xl:w-96`}
                  >
                    <div className="absolute grid h-full w-full place-content-center">
                      <FaPlay className="h-11 w-11 rounded-full bg-[#0000008F] p-3 text-white" />
                    </div>
                    <LoadingSkeletonImageDynamic
                      radius=""
                      className={`h-44 sm:h-52 w-full select-none object-cover xl:h-60 xl:w-96`}
                      image_height="100%"
                      image_url={thumbnail}
                      image_width="100%"
                    />
                  </div>
                </>
              ) : (
                <Skeleton
                  baseColor={theme == "dark" ? "#1d1d1d" : "#DFDFDF"}
                  highlightColor={theme == "dark" ? "#252525" : "#fff"}
                  className="h-44 sm:h-52  w-full rounded-xl object-cover p-5 xl:h-60 xl:w-96"
                  // style={{
                  //   height: image_height,
                  //   width: image_width,
                  //   borderRadius: radius,
                  // }}
                />
              )}
            </div>
          )}
          {messageData.message_type === "image" && (
            <img
              className="h-44 w-full cursor-pointer select-none rounded-xl object-cover transition-all duration-300 lg:h-60 lg:w-96 lg:p-5"
              src={selectedFileUrl}
              alt=""
              onClick={() => handleImageClick(selectedFileUrl)}
            />
          )}

          {messageData.message_type === "document" && (
            <div className="w-full max-w-80 rounded-[9px] rounded-bl-none bg-pdfBg px-1 pb-3 pt-1 lg:min-w-80">
              <div
                className={`flex items-center justify-between gap-2 rounded-[7px] p-4 px-6 text-sm ${theme == "dark" ? "bg-[#1D1D1D]" : "bg-[#FAFAFA]"}`}
              >
                <div className="flex items-center gap-2">
                  <img
                    className="h-10 w-10 object-cover"
                    src="/DarkIcons/pdf_icons.png"
                    alt=""
                  />

                  <div className="w-full max-w-56 overflow-hidden">
                    {messageData.fileName}
                  </div>
                </div>
                {/* <img
                  src="/DarkIcons/Download_icon.png"
                  className="h-8 w-8 cursor-pointer"
                  alt=""
                /> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
