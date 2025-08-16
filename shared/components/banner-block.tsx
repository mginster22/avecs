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
  const bannerElements = ["/banner1.jpg", "/banner2.jpg", "/banner3.png"];
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
        {bannerElements.map((item, i) => (
          <SwiperSlide key={i}>
            <Image
              src={item}
              alt={`banner-${i}`}
              width={2400}
              height={600}
              style={{ width: "100%", height: "100%",objectFit: "cover" }}
              priority={true}
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
