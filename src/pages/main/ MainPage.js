import { useEffect, useState } from "react";
import { UserList } from "../../components/UserList/UserList";
import { createGlobalStyle } from "styled-components";
import { Search } from "../../components/Search/Search";
import * as S from "../../pages/main/AppStyle";
import { useGetAllTracksQuery } from "../../service/playlistApi";
export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

*:before,
*:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

a,
a:visited {
  text-decoration: none;
  font-family: 'StratosSkyeng', sans-serif;
  cursor: pointer;
}

button,
._btn {
  cursor: pointer;
}

ul li {
  list-style: none;
}

@font-face {
  font-family: "StratosSkyeng";
  font-weight: 400;
  font-style: normal;
  src: local("StratosSkyeng"), local("StratosSkyeng"),
    url("/fonts/StratosSkyeng.woff2") format("woff2"),
    url("/fonts/StratosSkyeng.woff") format("woff");
  
}


body {
  width: 100%;
  height: 100%;
  font-family: 'StratosSkyeng', sans-serif;

}
._btn-text:hover {
  border-color: #d9b6ff;
  color: #d9b6ff;
  cursor: pointer;
}

._btn-icon:hover svg {
  fill: transparent;
  stroke: #acacac;
  cursor: pointer;
}

._btn-text:active {
  border-color: #ad61ff;
  color: #ad61ff;
  cursor: pointer;
}

._btn-icon:active svg {
  fill: transparent;
  stroke: #ffffff;
  cursor: pointer;
}

._btn-icon:active .track-play__like-svg,
._btn-icon:active .track-play__dislike-svg {
  fill: #696969;
  stroke: #ffffff;
  cursor: pointer;
}
  }
`;

function MainPage() {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);

  const { data, isLoading, error } = useGetAllTracksQuery();

  useEffect(() => {
    if (!isLoading && !error && data && data.items) {
      setUsers(data.items);
    }
  }, [data, isLoading, error]);

  const searchMusic = (searchValue, list) => {
    if (Array.isArray(list)) {
      return list.filter(({ login }) =>
        login.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      return [];
    }
  };

  return (
    <>
      <S.Main>
        <S.MainCenterblock>
          <Search setSearchValue={setSearchValue} />
          <S.CenterblockH2>Пользователи</S.CenterblockH2>
          <S.CenterblockContent>
            {searchValue && searchMusic(searchValue, users).length === 0 ? (
              <h2>Ничего не найдено</h2>
            ) : (
              <>
                {!isLoading && (
                  <UserList
                    users={
                      searchValue ? searchMusic(searchValue, users) : users
                    }
                  />
                )}
              </>
            )}
          </S.CenterblockContent>
        </S.MainCenterblock>
      </S.Main>
    </>
  );
}

export default MainPage;
