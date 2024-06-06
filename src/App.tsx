import "./lang/init";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Router from "./Router";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
