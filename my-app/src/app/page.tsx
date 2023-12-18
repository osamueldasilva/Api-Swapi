"use client"
import { QueryClient, QueryClientProvider } from "react-query";
import ListPeople from "./listPeople";
const queryClient = new QueryClient()

export default function Home() {

  return (
    <QueryClientProvider client={queryClient}>
      <ListPeople />
    </QueryClientProvider>
  )
}
