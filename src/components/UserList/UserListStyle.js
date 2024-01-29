import styled from "styled-components";

export const ContentPlaylist = styled.div`
  height: 56vh;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow-y: scroll;
`;
export const CardsImage = styled.div`
  width: 270px;
  height: 270px;
  background-color: #f0f0f0;
`;
export const CardsImageImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  -o-object-fit: cover;
  object-fit: cover;
`;
