import { cfg } from "@/components/config";
import { useEffect, useState } from "react";

export const GalleryModule: React.FC = () => {
  const [images, setImages] = useState<Array<any> | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await cfg.supabase.storage.from("gallery").list();

      if (error) {
        console.error("Error fetching data:", error);
        return;
      }

      setImages(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="relative flex w-full flex-col items-center rounded-b-[25px] p-5 pt-24 font-jakarta  md:rounded-b-[100px] lg:rounded-b-[150px] lg:px-32 lg:pb-20 lg:pt-32">
        <h1 className="mb-3 w-full items-center justify-center text-left text-2xl font-semibold md:text-3xl lg:text-5xl">
          Gallery KMK Fasilkom UI
        </h1>
        <div className="columns-1 gap-2 sm:columns-2 md:columns-3">
          {images?.map((image, index) => (
            <div key={image.id} className="break-inside-avoid p-3">
              <img
                src={
                  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/` +
                  image.name
                }
                alt={image.name}
                className="h-auto w-full transform rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
