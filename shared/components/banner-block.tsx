"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

interface Props {
  className?: string;
}

SwiperCore.use([Autoplay]);

export const BannerBlock: React.FC<Props> = ({ className }) => {
  const bannerSlider = [
    {
      desktop: "/banner1.jpg",
      mobile: "/main_slider_mob.png",
    },
    {
      desktop: "/banner2.jpg",
      mobile: "/summer_avecs_comfort_600x600.jpg",
    },
    {
      desktop: "/banner3.png",
      mobile: "/newColl.jpg",
    },
  ];

  const swiperRef = useRef<SwiperCore | null>(null);

  return (
    <div className={className}>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000, // 3 секунды
          disableOnInteraction: false,
        }}
      >
        {bannerSlider.map((item, i) => (
          <SwiperSlide key={i}>
            <Image
              src={item.desktop}
              alt={`banner-${i}`}
              width={2400}
              height={600}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              className="max-md:hidden"
              priority={true}
              draggable={false}
            />
            <Image
              src={item.mobile}
              alt={`banner-${i}`}
              width={2400}
              height={600}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              className="max-md:block md:hidden"
              priority={true}
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
