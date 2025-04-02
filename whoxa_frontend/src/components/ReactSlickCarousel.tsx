import React, { useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Slider from "react-slick";
import { useAppSelector } from "../utils/hooks";
import LoadingSkeletonImageDynamic from "./LoadingSkeletonImageDynamic";

function ReactSlickCarousel() {
  let image_list = useAppSelector((state) => state.ViewManager);
  // let SendMessageData = useAppSelector((state) => state.SendMessageData);
  const slider = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: image_list.image_src!.length >= 2 ? true : false,
    speed: 500,
    slidesToShow: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  function SampleNextArrow() {
    return (
      <div
        className="custom-next-arrow bg-lightTextColor !text-darkTextColor absolute grid h-11 w-11 cursor-pointer place-content-center rounded-full hover:bg-opacity-70"
        onClick={() => slider?.current?.slickNext()}
      >
        <FiChevronRight className="h-7 w-7" />
      </div>
    );
  }

  function SamplePrevArrow() {
    return (
      <div
        className="custom-prev-arrow bg-lightTextColor !text-darkTextColor grid h-11 w-11 cursor-pointer place-content-center rounded-full hover:bg-opacity-70"
        onClick={() => slider?.current?.slickPrev()}
      >
        <FiChevronLeft className="h-7 w-7" />
      </div>
    );
  }

  // Check if URL is an image
  const isImage = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/i);
  };

  // Check if URL is a video
  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg)$/i);
  };

  useEffect(() => {
    if (slider.current && typeof image_list.currentIndex === "number") {
      slider.current.slickGoTo(image_list.currentIndex);
    }
  }, [image_list.currentIndex]);

  return (
    <div className="slider-container !overflow-hidden">
      <Slider ref={slider} {...settings}>
        {image_list?.image_src?.map((src, index) => (
          <div key={index}>
            {isImage(src) ? (
              <img
                className="h-auto w-[90%] rounded-lg object-contain lg:h-[75vh] lg:w-[90%]"
                src={src}
                alt={`Media ${index + 1}`}
              />
            ) : // <div className="h-auto w-fit rounded-lg object-contain mx-auto lg:h-[75vh] lg:w-[90%]">
            //   <LoadingSkeletonImageDynamic
            //     radius=""
            //     className="h-auto w-full rounded-lg object-contain"
            //     image_height="100%"
            //     image_url={src}
            //     image_width=""
            //   />
            // </div>
            isVideo(src) ? (
              <video
                className="mx-auto h-auto w-fit rounded-lg object-contain lg:h-[75vh] lg:w-[90%]"
                controls
              >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              //  SendMessageData?.message_type == "video" ? (
              //   <video
              //     className="mx-auto h-auto w-fit rounded-lg object-contain lg:h-[75vh] lg:w-[90%]"
              //     controls
              //   >
              //     <source src={src} type="video/mp4" />
              //     Your browser does not support the video tag.
              //   </video>
              // ) :
              <img
                className="h-auto w-fit rounded-lg object-contain lg:h-[75vh] lg:w-[90%]"
                src={src}
                alt={`Media ${index + 1}`}
              />
              // <p>
              //   Unsupported media type.{" "}
              //   <a href={src} target="_blank" rel="noopener noreferrer">
              //     <button>Click here to view.</button>
              //   </a>
              // </p>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ReactSlickCarousel;
