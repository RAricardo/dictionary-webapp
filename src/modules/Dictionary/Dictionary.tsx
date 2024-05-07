import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import "./Dictionary.css";
import Separator from "../../components/Separator/Separator";
import { Definition, Meaning, Phonetic, Word } from "../../types/types";
import { useDebounce } from "use-debounce";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import { NotFoundError } from "../../types/error";
import React from "react";
import SearchSVG from "../../components/icons/search";
import LinkSVG from "../../components/icons/link";

const Dictionary: React.FC = () => {
  const [word, setWord] = useState<string>("");
  const [debouncedWord] = useDebounce(word, 500);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const { data, loading, error } = useFetch<Array<Word>>(
    debouncedWord
      ? `https://api.dictionaryapi.dev/api/v2/entries/en/${debouncedWord}`
      : ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setIsEmpty(true);
      setWord("");
    } else {
      setWord(e.target.value);
      setIsEmpty(false);
    }
  };

  const findAudioUrl = (phonetics?: Array<Phonetic>) => {
    let audio = "";
    if (phonetics !== undefined) {
      phonetics.forEach((phonetic) => {
        if (phonetic.audio !== "" && phonetic.audio !== undefined) {
          audio = phonetic.audio;
        }
      });
    }
    return audio;
  };

  return (
    <div>
      <div className="input">
        <input
          placeholder="Search for any word..."
          onChange={handleChange}
          className={`${isEmpty ? "empty_error" : ""}`}
        />
        <div className="search_icon">
          <SearchSVG />
        </div>
        {isEmpty && <div className="empty_help">Whoops, can’t be empty…</div>}
      </div>
      {debouncedWord && (
        <>
          {loading && <p>Loading...</p>}
          {data && (
            <div className="word">
              <div className="word-header">
                <div>
                  <h1>{data[0].word}</h1>
                  <h2>{data[0].phonetic}</h2>
                </div>
                {findAudioUrl(data[0].phonetics) && (
                  <AudioPlayer url={findAudioUrl(data[0].phonetics)} />
                )}
              </div>
              {data[0].meanings.map((meaning: Meaning, index: number) => (
                <div key={index} className="meaning">
                  <div className="flex">
                    <h3>{meaning.partOfSpeech}</h3>
                    <Separator />
                  </div>
                  <h4 className="meaning_title">Meaning</h4>
                  <ul>
                    {meaning.definitions.map(
                      (definition: Definition, index: number) => (
                        <li key={index}>
                          <div>{definition.definition}</div>
                          <div className="example">
                            {definition.example && `"${definition?.example}"`}
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                  {meaning.synonyms && meaning.synonyms?.length > 0 && (
                    <div className="flex synonyms">
                      <h4>Synonyms</h4>
                      {meaning.synonyms.map((syn, index) => {
                        return (
                          <div className="synonym" key={index}>
                            {syn}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
              <Separator />
              <div className="sources">
                {data[0].sourceUrl ||
                  (data[0].sourceUrls && (
                    <div className="flex">
                      <h5>Source</h5>
                      <div className="link">
                        <a href={data[0].sourceUrl || data[0].sourceUrls[0]}>
                          {data[0].sourceUrl || data[0].sourceUrls[0]}
                        </a>
                        <a href={data[0].sourceUrl || data[0].sourceUrls[0]}>
                          <LinkSVG />
                        </a>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {error && error instanceof NotFoundError && (
            <div className="error-flex">
              <div className="emoji">😕</div>
              <p className="title">{error.title}</p>
              <div className="resolution">
                <span>{error.message}</span>
                <span> {error.resolution}</span>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dictionary;
