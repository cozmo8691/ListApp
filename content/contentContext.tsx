import * as React from "react";
import content from "./content.json";

const ContentContext = React.createContext(content);

function useContent() {
  const context = React.useContext(ContentContext);

  if (!context) {
    throw new Error("Content context provider is required");
  }

  return context;
}

function ContentProvider(props: any) {
  return <ContentContext.Provider value={content} {...props} />;
}

export { ContentProvider, useContent };
