import React, {useState, useEffect, useContext} from "react";
import {NavLink, Link} from "react-router-dom";
import Axios, {AxiosResponse} from "axios";
import css from "*.scss";

import SearchContext from "../context/searchContext";
import axios from "axios";
import {Tags} from "../types/interfaces";

function SidePanel(): JSX.Element {
  const [allTags, setAllTags] = useState<Tags[]>([])
  const {searchString, setSearchString} = useContext(SearchContext)
  const {searchTags, setSearchTags} = useContext(SearchContext)

  useEffect(() => {
    axios
      .get<Tags>(`https://api.spevnik.jakubcata.eu/api/tags`)
      .then((response: AxiosResponse) => {
        setAllTags(response.data)
      })
  }, [])

  const tagCheckboxHandler = (event: InputEvent) => {

  }

  return (
    <div className={"sidepanel"} id={"sidePanel"}>
      <div className={"sidepanel__content"}>
        <div>
          <h2>Search by name: </h2>
          <input
            className={"input"}
            value={searchString}
            placeholder={"Enter string to match with"}
            onChange={(event => {setSearchString(event.target.value)})}
          />
        </div>
        <div>
          <h2>Filter by tags:</h2>
          {
            allTags.map(({id, name}) => (
              <div key={id}>
                <input
                  type={"checkbox"}
                  id={"tag" + id}
                  className={"sidepanel__checkbox"}
                  checked={(searchTags.some(((i:number) => i ==id)))}
                  onChange={event => {
                    if (event.target.checked) {
                      setSearchTags((searchTags:[]) => [...searchTags, id])
                    } else {
                      setSearchTags(searchTags.filter((item:number) => item !== id))
                    }
                  }}
                />
                <label
                  className={"sidepanel__checkbox-label"}
                  htmlFor={"tag" + id}
                >
                  {name}
                </label>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default SidePanel