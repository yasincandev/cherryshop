import Layout from "../components/Layout";
import "../styles/globals.css";
import "swiper/css/bundle";
import { Provider } from "react-redux";
import store from "../store";
import ReduxToastr from "react-redux-toastr/lib/ReduxToastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position='top-right'
        getState={(state) => state.toastr}
        transitionIn='fadeIn'
        transitionOut='fadeOut'
        progressBar
        closeOnToastrClick
      />
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
