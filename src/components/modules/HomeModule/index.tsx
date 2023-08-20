import React from "react";
import Image from "next/image";
import { MovingText } from "./module-elements/MovingText";
import { FilosofiCard } from "./module-elements/card/FilosofiCard";
import { MisiCard } from "./module-elements/card/MisiCard";
import { VisiCard } from "./module-elements/card/VisiCard";
import { VisiContainer } from "./module-elements/container/VisiContainer";
import { MisiContainer } from "./module-elements/container/MisiContainer";
import { FilosofiContainer } from "./module-elements/container/FilosofiContainer";
import { MainContentWrapper } from "./module-elements/wrapper/MainContentWrapper";
import { BannerWrapper } from "./module-elements/wrapper/BannerWrapper";

export const HomeModule: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-16">
      <BannerWrapper>
        <div className="relative col-span-2 flex h-full flex-col-reverse md:col-span-3">
          <div className="mb-8 ml-6 text-3xl font-bold text-gray-800 md:ml-12 md:text-5xl lg:mb-32 lg:ml-16 lg:text-7xl">
            <h1>KMK Fasilkom UI 2023</h1>
          </div>
        </div>

        <div className="z-25 col-span-2 md:col-span-3">
          <div className="flex h-full items-center justify-center">
            <div className="relative h-24 w-24 md:h-48 md:w-48">
              <Image
                fill
                src="/illustrations/logo-kmk.svg"
                alt="logo-kmk"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-0 h-full w-full">
          <MovingText />
        </div>
      </BannerWrapper>

      <MainContentWrapper>
        <FilosofiContainer>
          <FilosofiCard
            imgSrc="/images/image-salib.png"
            imgAlt="image-salib"
            illustrationSrc="/illustrations/salib.svg"
            illustrationAlt="salib"
            title="Salib"
          />

          <FilosofiCard
            imgSrc="/images/image-merpati.jpg"
            imgAlt="image-merpati"
            illustrationSrc="/illustrations/merpati.svg"
            illustrationAlt="merpati"
            title="Merpati"
          />

          <FilosofiCard
            imgSrc="/images/image-sinar.jpg"
            imgAlt="image-sinar"
            illustrationSrc="/illustrations/sinar.svg"
            illustrationAlt="sinar"
            title="Sinar"
          />
        </FilosofiContainer>

        <>
          <VisiContainer>
            <VisiCard
              visi="Menjadikan KMK Fasilkom UI sebagai wadah bagi mahasiswa Katolik di
            Fasilkom UI menjalin relasi dan saling mendukung dalam perkuliahan
            dan kehidupan."
            />
          </VisiContainer>

          <MisiContainer>
            <MisiCard
              misi="Menjalin kedekatan antaranggota KMK Fasilkom UI melalui berbagai
            kegiatan yang bermanfaat."
            />
            <MisiCard
              misi="Meningkatkan rasa kepedulian dan rasa ingin saling membantu
            antaranggota KMK Fasilkom UI."
            />
            <MisiCard misi="Mengajak anggota KMK Fasilkom UI mengikuti berbagai kegiatan rohani." />
          </MisiContainer>
        </>
      </MainContentWrapper>
    </div>
  );
};
