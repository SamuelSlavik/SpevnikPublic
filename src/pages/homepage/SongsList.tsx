import React, {useContext} from "react";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

import {Songs} from "../../types/interfaces";
import {Link} from "react-router-dom";
import SearchContext from "../../context/searchContext";

function SongsList(): JSX.Element {
  const letters = ["A", "Á",  "B", "C", "Č", "D", "E", "F", "G", "H", "I", "J", "K", "L", "Ľ", "M", "N", "Ň", "O", "Ó", "P", "Q", "R", "S", "Š", "T", "Ť", "U", "Ú", "V", "W", "X", "Y", "Z", "Ž"]
  const [songsData, setSongsData] = useState<Songs[]>([])

  // String and tags to filter by from user context
  const {searchString, setSearchString} = useContext(SearchContext)
  const {searchTags, setSearchTags} = useContext(SearchContext)

  useEffect(()=>{
    axios
      .get<Songs>(`https://api.spevnik.jakubcata.eu/api/songList`)
      .then((response: AxiosResponse) => {
        setSongsData(response.data)
      })
  } ,[])

  return (
    <div className={"songs"}>
      <>
      {
        letters.map((item) => (
          <div id={item} key={item}>
            <div>

            </div>
            {
              (songsData
                  .filter(({name}) => name.slice(0, 1).toUpperCase() == item)
                .filter(({name, id, tags}) => ((searchTags.length == 0) || searchTags.every((i:number) => tags.some((item) => i==item.id))))
                .some(({name}) => name.toLowerCase().includes(searchString.toLowerCase())))
                ? <div className={"songs__letter"}>{item}</div>
                : <></>}
            {
              songsData
                .filter(({name, id}) => name.toLowerCase().includes(searchString.toLowerCase()))
                .filter(({name}) => name.slice(0, 1).toUpperCase() == item)
                .filter(({name, id, tags}) => ((searchTags.length == 0) || searchTags.every((i:any) => tags.some((item) => i==item.id))))
                .map(({id, name}) => {
                    return (
                      <div key={id} className={"songs__item"}>
                        <p><Link to={"/song/" + id}>{name}</Link></p>
                        <p>{id}</p>
                      </div>
                    )
                  }
                )
            }
          </div>
        ))
      }
      </>
    </div>
  )
}

export default SongsList