import {
  Sidebar,
  QueryBuilderToggler,
  QueryInputField,
  CustomTable,
  ExecuteQueryButton,
} from "./components";

function App() {
  return (
    <div className="app">
      <header className="app-header d-flex align-items-center">
        Sql Data Viewer
      </header>
      <main className="app-main">
        <Sidebar />
        <div className="app-content">
          <QueryInputField />
          <div className="app-cta-wrapper">
            <ExecuteQueryButton />
            <QueryBuilderToggler />
          </div>
          <CustomTable />
        </div>
      </main>
    </div>
  );
}

export default App;
