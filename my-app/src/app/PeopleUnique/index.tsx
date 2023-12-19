'use client'

import { Button, Spinner } from "@nextui-org/react";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";
import ListFilms from "../components/listFilms";
import { IResultsPeoples } from "../interface/Peoples";
import { IPlanets } from "../interface/Planets";

interface IPeopleUnique {
  url: string;
  homeWord: string
  setPage: Dispatch<SetStateAction<number>>
  page: number
}
export default function PeopleUnique({ url, homeWord, page, setPage }: IPeopleUnique) {

  const { data: inforPeoples, isLoading } = useQuery('getPeopleUnique', handleGetPeopleUnique)
  const { data: dataPlanet } = useQuery('getPeoplePlanet', handleGetPlanet)

  async function handleGetPlanet() {
    try {
      const { data } = await axios.get<IPlanets>(homeWord)
      return data
    } catch (error) {
      console.error("🚀 ~ file: index.tsx:28 ~ handleGetPlanet ~ error:", error)
    }
  }

  async function handleGetPeopleUnique() {
    try {
      const { data } = await axios.get<IResultsPeoples>(url)
      return data
    } catch (error) {
      console.error("🚀 ~ file: index.tsx:21 ~ handleGetPeopleUnique ~ error:", error)
    }
  }

  return (
    <>
      <header className="top-0 absolute p-6 w-full ">
        <Button color="warning" className="text-white" onClick={() => setPage(1)}>
          Back
        </Button>
      </header>
      {

        isLoading ? (
          <Spinner label="Loading..." color="warning" />
        ) : (
          <>
            <main className="">
              <>
                <ul className="flex flex-col gap-6">
                  <li className="flex gap-2 text-white text-xl font-semibold">
                    <strong>Name:</strong>
                    {inforPeoples?.name}
                  </li>
                  <li className="flex gap-2 text-white text-xl font-semibold">
                    <strong>Birthday:</strong>
                    {inforPeoples?.birth_year}
                  </li>
                  <li className="flex gap-2 text-white text-xl font-semibold">
                    <strong>Home planet:</strong>
                    {dataPlanet?.name}
                  </li>
                  <li className="flex gap-2 text-white text-xl font-semibold">
                    <strong>Films:</strong>
                    <ListFilms urlFilms={inforPeoples?.films!} />
                  </li>
                </ul>
              </>
            </main>
          </>
        )
      }

    </>
  )
}