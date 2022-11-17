import react, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"

import {SongInterface} from "../../types/interfaces"
import axios, {AxiosResponse} from "axios";

function Song(): JSX.Element {
  const { id } = useParams()

  const [songData, setSongData] = useState<SongInterface>()
  let numberOfTransposes = 0

  useEffect(() => {
    axios
      .get<SongInterface>(`https://api.spevnik.jakubcata.eu/api/song/${id?.toString()}`)
      .then((response: AxiosResponse) => {
        setSongData(response.data)
      })
  },[])

  const transposeUp = (amount: number) => {
    const scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    const normalizeMap = {"Cb":"B", "Db":"C#", "Eb":"D#", "Fb":"E", "Gb":"F#", "Ab":"G#", "Bb":"A#",  "E#":"F", "B#":"C"}

    const chords = document.getElementsByClassName("chord")
    console.log(chords)

    for (let i = 0; i < chords.length; i++) {
      chords[i].innerHTML = chords[i].innerHTML.replace(/[CDEFGAB](b|#)?/g, (match)=>{
        // @ts-ignore
        let newChordIndex = (scale.indexOf((normalizeMap[match] ? normalizeMap[match] : match)) + amount) % scale.length;
        console.log(scale[newChordIndex])
        console.log(numberOfTransposes)
        return scale[newChordIndex < 0 ? newChordIndex + scale.length : newChordIndex]
      })
    }
    numberOfTransposes += amount;
  }


  return (
    <div className={"content"}>
      <>
        {console.log(songData)}
      </>
      <div className={"song-wrapper"}>
        <h2>{songData?.name}</h2>
        <div className={"song__tags"}>
          {
            songData?.tags.map(({name, id}, i ) => (
              <span className={"song__tags-span"} key={id}>
                {name}
                {i < songData?.tags.length - 1 && ", "}
              </span>
            ))
          }
        </div>
        <br/>
        <div>
          Sem pojdu informacie o dplaylistoch <br/>
          idealne budu mat dva riadky
        </div>
        <div className={"song"}>
          <div className={"song__transpose-buttons"}>
            <button onClick={() => {transposeUp(-2)}}>-2</button>
            <button onClick={() => {transposeUp(-1)}}>-1</button>
            <button onClick={() => {transposeUp(12-numberOfTransposes%12)}}>Original</button>
            <button onClick={() => {transposeUp(1)}}>+1</button>
            <button onClick={() => {transposeUp(2)}}>+2</button>
          </div>
          <>
            {
              songData?.songParts?.map(({order, type, label, image, containsChords, lines, text}) => (
                <div key={order} className={"song__part"}>
                  <h3>{label}: </h3>
                  {
                    image ? <img alt={"sheets"} src={"https://api.spevnik.jakubcata.eu/api/download/" + image}/> : <></>
                  }
                  {
                    containsChords ?
                      lines?.map((line) => (
                        <div className={"song__line"}>
                          <>{console.log(line)}</>
                          {
                            line.tokens.map(({chord, text}) => (
                              <div className={"song__line-token"}>
                                <div className={"chord"}>
                                  {
                                    chord ?
                                      <p>{chord}&nbsp;</p> :
                                      <p>&nbsp;</p>
                                  }
                                </div>
                                <div className={"text"}>
                                  {
                                    (chord.length > text.length) && !(/\s$/.test(text)) && (text.length > 1) ?
                                      <span><p>{text}</p><p>&nbsp;-&nbsp;&nbsp;</p></span> :
                                      <p>{text.replace(/ /g, "\u00A0")}</p>
                                  }
                                </div>
                              </div>
                            ))
                          }
                        </div>
                      ))
                      : <></>
                  }
                </div>
              ))
            }
          </>
        </div>
      </div>
    </div>
  )
}

export default Song