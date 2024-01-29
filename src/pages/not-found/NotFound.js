import { Link } from 'react-router-dom'
import * as S from './NotFoundStyle'

export const NotFound = () => {
  return (
    <Link to={'*'}>
    <S.Div>
      <S.TextH1>Page was not found :c</S.TextH1>
    </S.Div>
    </Link>
  );
}