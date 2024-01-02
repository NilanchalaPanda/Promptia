import "@styles/global.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metaData = {
  title: "Promptia",
  description:
    "The one stop place to get high class prompts to just directly paste into other AI models and get the best results",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
      </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
