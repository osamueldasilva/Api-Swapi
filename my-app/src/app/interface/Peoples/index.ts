export interface IPeopleList {
  count: number;
  next: string;
  previous: undefined;
  results: IResultsPeoples[]
}

export interface IResultsPeoples {
  birth_year: string
  created: string
  edited: string
  eye_color: string
  films: string[] // Importante
  gender: string
  hair_color: string
  height: string
  homeworld: string
  mass: string
  name: string
  skin_color: string
  species: any[] // Importante
  starships: string[] // Importante
  url: string
  vehicles: any[] // Importante
}
