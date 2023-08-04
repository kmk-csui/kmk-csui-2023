import { DivisionEnum } from "@prisma/client";

export interface CreateEventForm {
  title: string;
  startDate: Date | string;
  endDate: Date | string;
  location: string;
  division: DivisionEnum;
  description: string;
  link: string | null;
  image: FileList | null;
}

export enum Division {
  PENGURUS_INTI = "Pengurus Inti",
  DIVISI_ACARA = "Divisi Acara",
  DIVISI_HPDD = "Divisi HPDD",
  DIVISI_PDSM = "Divisi PDSM",
  DIVISI_ITA = "Divisi ITA",
}
