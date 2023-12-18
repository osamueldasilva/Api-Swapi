'use client'

import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { IResultsPeoples } from "../interface/peoples";

interface IPeopleUnique {
  url: string;
}
export default function PeopleUnique({ url }: IPeopleUnique) {

  useEffect(() => {
    handleGetPeopleUnique()
  }, [url])

  const { data } = useQuery('getPeopleUnique', handleGetPeopleUnique)

  async function handleGetPeopleUnique() {
    try {
      const { data } = await axios.get<IResultsPeoples[]>(url)

      return data
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:21 ~ handleGetPeopleUnique ~ error:", error)
    }
  }

  return (
    <>
      {data && data.map(({ name, birth_year }) => (
        <>
          <ul>
            <li>{name}</li>
            <li>{birth_year}</li>
            {/* <li>{ }</li> */}
          </ul>
        </>
      ))}
    </>
  )
}