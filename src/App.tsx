import { AppRoutes } from "./components/AppRoutes";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className='h-screen w-screen bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark'>
    <Header>
    </Header>
    <AppRoutes/>
    </div>
  );
}

export default App;
