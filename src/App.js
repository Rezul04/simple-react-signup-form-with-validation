import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RegistrationForm from "./Components/RegistrationForm"
import SuccessPage from "./Components/SuccessPage"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="title">Registration Form</h1>
                <div className="form-container">
                  <RegistrationForm />
                </div>
              </>
            }
          />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
