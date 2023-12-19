'use client'
import { Pagination, Spinner } from "@nextui-org/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import PeopleUnique from "../PeopleUnique"
import { IPeopleList } from "../interface/Peoples"

export default function ListPeople() {

  const [url, setUrl] = useState('')
  const [word, setWord] = useState('')
  const [valuePagination, setValuePagination] = useState(1)
  const [page, setPage] = useState(1)

  const { data: listPeoples, isLoading, refetch } = useQuery(["getListPeople", valuePagination], handleGetListPeople,)

  const qtdListPeople = listPeoples?.results.length!
  const countPagination = listPeoples?.count! / qtdListPeople
  const vlPagination = Math.round(countPagination)

  useEffect(() => {
    refetch()
  }, [valuePagination, refetch])

  async function handleGetListPeople() {
    try {
      const { data } = await axios.get<IPeopleList>(`https://swapi.dev/api/people/?page=${valuePagination}`)
      return data
    } catch (error) {
      console.error("🚀 ~ file: index.tsx:22 ~ handleGetListPeople ~ error:", error)
    }
  }

  function getUniquePeople(url: string, homeWord: string) {
    setPage(2)
    setUrl(url)
    setWord(homeWord)
  }

  return (
    <main className="flex flex-col gap-4 justify-center items-center w-full h-full">
      {page === 1 ? (
        <>
          {isLoading ? (
            <Spinner label="Loading..." color="warning" />
          ) : (
            <>
              {listPeoples && listPeoples.results.map(({ name, url, homeworld }, index) => (
                <>
                  <div>
                    <ul >
                      <li
                        key={index}
                        className="
                        cursor-pointer text-white text-xl font-semibold
                         hover:text-yellow-400 transition-transform transform 
                         hover:scale-110
                         "
                        onClick={() => getUniquePeople(url, homeworld)}>
                        {name}
                      </li>
                    </ul>
                  </div>
                </>
              ))}
              <footer className=" w-full p-6 gap-4 flex justify-center items-center">
                <Pagination total={vlPagination} initialPage={valuePagination} color={"warning"} onChange={(e) => setValuePagination(e)} />
              </footer>
            </>
          )}
        </>
      ) : (
        <>
          <PeopleUnique url={url} homeWord={word} setPage={setPage} page={page} />
        </>
      )}

    </main>
  )
}