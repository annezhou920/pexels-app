import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.scss";
import CuratedPhotos from "./CuratedPhotos/CuratedPhotos";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <header className="appHeader">
          <h1>Pexel Curation</h1>
        </header>
        <CuratedPhotos />
      </div>
    </QueryClientProvider>
  );
}

export default App;
