import "../styles/globals.css";
import "tailwindcss/tailwind.css";
// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import OngContext from "../context/ongContext";
import { config } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";

// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  const [ongInSession, setOngInSession] = useState({id : ""})
  return (
    <>
      <OngContext.Provider value={{state: ongInSession,setState:setOngInSession}}>
        <Component {...pageProps} />
      </OngContext.Provider>
    </>
  );
}
