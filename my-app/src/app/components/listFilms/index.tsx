"use client"
import { IFilms } from "@/app/interface/Films";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import { useQuery } from "react-query";

interface IlistFilms {
  urlFilms: string[];
}

export default function ListFilms({ urlFilms }: IlistFilms) {

  const { data, isLoading } = useQuery('filmsDetails', handleGetFilms)

  async function handleGetFilms(): Promise<IFilms[] | undefined> {
    try {
      const responses = await Promise.all(urlFilms.map(url => axios.get<IFilms>(url)));

      const filmsData = responses.map(response => response.data);
      return filmsData
    } catch (error) {
      console.error("🚀 ~ file: index.tsx:26 ~ handleGetFilms ~ error:", error)
    }
  }

  function formatDateTime(dateTimeString: string) {
    const dataHoursObject = new Date(dateTimeString);

    const dias = dataHoursObject.getDate().toString().padStart(2, "0");

    const meses = [
      "janeiro", "fevereiro", "março", "abril",
      "maio", "junho", "julho", "agosto",
      "setembro", "outubro", "novembro", "dezembro"
    ];
    const mes = meses[dataHoursObject.getMonth()];

    const ano = dataHoursObject.getFullYear();

    return `${dias} de ${mes} de ${ano}`;
  }

  return (
    <>
      {isLoading ? (
        <Spinner label="Loading..." color="warning" />
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {data && data.map(({ title, created }, index) => (
              <>
                <p className="text-white text-lg font-semibold">{title} ({formatDateTime(created)})</p>
              </>
            ))}
          </div>
        </>
      )}
    </>
  )
}