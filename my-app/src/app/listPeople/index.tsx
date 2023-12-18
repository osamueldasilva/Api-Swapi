'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import PeopleUnique from "../PeopleUnique"
import { IPeopleList } from "../interface/peoples"

export default function ListPeople() {

  const [url, setUrl] = useState('')

  useEffect(() => {
    handleGetListPeople()
  }, [])

  const { data: listPeoples } = useQuery("getListPeople", handleGetListPeople)

  async function handleGetListPeople() {
    try {
      const { data } = await axios.get<IPeopleList>('https://swapi.dev/api/people/')

      return data
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:22 ~ handleGetListPeople ~ error:", error)
    }
  }

  function getUniquePeople(url: string) {
    setUrl(url)
  }

  return (
    <>
      {!url ? (
        <>
          {listPeoples && listPeoples.results.map(({ name, url }) => (
            <>
              <div>
                <ul>
                  <li className="cursor-pointer" onClick={() => getUniquePeople(url)}>
                    {name}
                  </li>
                </ul>
              </div>
            </>
          ))}

        </>
      ) : (
        <>
          <PeopleUnique url={url} />
        </>
      )}

    </>
  )
}