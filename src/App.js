// import { user } from './components/handleLogin'
import { useReducer } from "react";
import { reducer, UserContext, UserDispatchContext } from "./contex";
import { AppRoutes } from "./routes";
import * as S from "./pages/main/AppStyle";

function getInitialState() {
  const user = JSON.parse(localStorage.getItem("user")) || "";
  return { user };
}
function App() {
  const [state, dispatch] = useReducer(reducer, getInitialState);
  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        <S.App>
          <AppRoutes />
        </S.App>
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}
export default App;
