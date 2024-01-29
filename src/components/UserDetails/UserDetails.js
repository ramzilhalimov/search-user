import React from "react";
import * as S from "../UserList/UserListStyle";

export const UserDetails = ({ user }) => {
  return (
    <div>
      <h2>Подробности о пользователе : {user?.login}</h2>
      <S.CardsImage>
        <S.CardsImageImg src={user?.avatar_url} alt="picture" />
      </S.CardsImage>
    </div>
  );
};
