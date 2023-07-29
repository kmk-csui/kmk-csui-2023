import {
  Button,
  FileInput,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { CreateEventForm, Division } from "./interface";
import { useForm } from "react-hook-form";
import { cfg } from "@/components/config";
import { api } from "@/utils/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CreateEventModule: React.FC = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateEventForm>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getEnumKeysAndValues = (e: any) => {
    return Object.keys(e).map((key) => ({
      key: key,
      value: e[key],
    }));
  };

  const createEventMutation = api.event.createEvent.useMutation();

  const onSubmit = async (formData: CreateEventForm) => {
    try {
      setIsLoading(true);
      const avatarFile = formData.image[0];
      if (avatarFile) {
        const { data, error } = await cfg.supabase.storage
          .from("event")
          .upload(`${avatarFile.name}`, avatarFile, {
            cacheControl: "3600",
            upsert: false,
          });
        if (error) {
          toast.error("Try another image file name!");
          setIsLoading(false);
          return;
        }
        await createEventMutation.mutateAsync({
          title: formData.name,
          startDate: formData.start_date.toISOString(),
          endDate: formData.end_date.toISOString(),
          location: formData.location,
          division: formData.division,
          description: formData.description,
          link: formData.link,
          photo: avatarFile.name,
        });
        toast.success("Event created succesfully!");
      }
    } catch (error) {
      toast.error("Error, check your input!");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col items-center rounded-b-[25px] md:rounded-b-[100px] lg:rounded-b-[150px] lg:p-32">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <h2>Buat Kegiatan</h2>
          <br />
          <div className="flex w-full flex-col justify-items-stretch gap-4 md:grid md:grid-cols-5">
            <div className="col-span-2">
              <h4>Judul Kegiatan</h4>
            </div>
            <TextInput
              className="col-span-3 w-full"
              required
              {...register("name", {
                required: "Judul kegiatan wajib diisi",
                maxLength: 100,
                minLength: 1,
              })}
            />
            <div className="col-span-2">
              <h4>Deskripsi</h4>
            </div>
            <Textarea
              required
              className="col-span-3 w-full text-base"
              rows={8}
              {...register("description", { required: true })}
            />
            <div className="col-span-2">
              <h4>Link (opsional)</h4>
            </div>
            <TextInput
              className="col-span-3 w-full"
              type="link"
              {...register("link", { required: false })}
            />
            <div className="col-span-2">
              <h4>Lokasi</h4>
            </div>
            <TextInput
              required
              className="col-span-3 w-full"
              {...register("location", { required: true })}
            />
            <div className="col-span-2">
              <h4>Divisi</h4>
            </div>
            <Select
              className="col-span-3 w-full"
              id="countries"
              required
              {...register("division", { required: true })}
            >
              {getEnumKeysAndValues(Division).map((item) => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </Select>

            <div className="col-span-2">
              <h4>Foto</h4>
            </div>
            <div className="col-span-3">
              <FileInput
                {...register("image", {
                  required: true,
                  validate: (val) => {
                    if (val && val.length > 0 && val[0]) {
                      return val[0].size <
                        cfg.MAX_IMG_SIZE_IN_MEGABYTE * cfg.MEGABYTE
                        ? true
                        : `File tidak boleh lebih besar dari ${cfg.MAX_IMG_SIZE_IN_MEGABYTE} MB.`;
                    }
                    return "File harus dipilih";
                  },
                })}
                accept="image/*"
              />
              <p className="text-sm text-red-500">
                {errors.image?.message ?? ""}
              </p>
            </div>

            <div className="col-span-2">
              <h4>Tanggal & Waktu Mulai</h4>
              <p className="text-xs font-extralight">
                Menggunakan timezone setempat
              </p>
            </div>
            <div className="col-span-3 w-full">
              <TextInput
                {...register("start_date", {
                  required: true,
                  valueAsDate: true,
                  validate: (val) =>
                    val < control._formValues.end_date ||
                    "Tanggal & waktu mulai harus sebelum tanggal & waktu selesai.",
                })}
                type="datetime-local"
              />
              <p className="text-sm text-red-500">
                {errors.start_date?.message}
              </p>
            </div>
            <div className="col-span-2">
              <h4>Tanggal & Waktu Selesai</h4>
              <p className="text-xs font-extralight">
                Menggunakan timezone setempat
              </p>
            </div>
            <div className="col-span-3 w-full">
              <TextInput
                {...register("end_date", {
                  required: true,
                  valueAsDate: true,
                  validate: (val) =>
                    val > new Date() ||
                    "Tanggal & waktu selesai harus di masa mendatang.",
                })}
                type="datetime-local"
              />
              <p className="text-sm text-red-500">{errors.end_date?.message}</p>
            </div>

            <div className="col-span-5 mx-auto flex w-[100%] justify-end gap-x-4">
              <Button disabled={isLoading} type="submit">
                {isLoading ? <Spinner /> : <h4>Ajukan Kegiatan</h4>}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
