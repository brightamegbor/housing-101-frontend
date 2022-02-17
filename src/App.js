// import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter } from "react-router-dom";
import { LandingNav } from "./components/landing_nav";
import { LandingFooter } from "./components/landing_footer";
import AllRoutes from "./routes";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <LandingNav />

        <AllRoutes />

        <LandingFooter />
      </BrowserRouter>
    </Provider>
  );
  // }
}

export default App;
