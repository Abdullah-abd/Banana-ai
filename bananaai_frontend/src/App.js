import { Route } from "wouter";
import "./App.css";
import PropertyDashboard from "./pages/PropertyDashboard";

function App() {
  return (
    <div className="App min-h-screen bg-gray-100">
      <Route path="/" component={PropertyDashboard} />
    </div>
  );
}

export default App;
