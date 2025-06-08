"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Success.css"

function SuccessPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get form data from session storage
    const data = sessionStorage.getItem("registrationData")

    if (data) {
      setFormData(JSON.parse(data))
    } else {
      // Redirect to form if no data is found
      navigate("/")
    }

    setLoading(false)
  }, [navigate])

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (!formData) {
    return null
  }

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="card-header">
          <h2 className="card-title">Registration Successful!</h2>
        </div>
        <div className="card-content">
          <div className="info-grid">
            <div className="info-section">
              <h3 className="section-title">Personal Information</h3>
              <div className="info-list">
                <p>
                  <span className="info-label">First Name:</span> {formData.firstName}
                </p>
                <p>
                  <span className="info-label">Last Name:</span> {formData.lastName}
                </p>
                <p>
                  <span className="info-label">Username:</span> {formData.username}
                </p>
                <p>
                  <span className="info-label">Email:</span> {formData.email}
                </p>
              </div>
            </div>

            <div className="info-section">
              <h3 className="section-title">Contact Information</h3>
              <div className="info-list">
                <p>
                  <span className="info-label">Phone:</span> {formData.countryCode} {formData.phoneNumber}
                </p>
                <p>
                  <span className="info-label">Country:</span> {formData.country}
                </p>
                <p>
                  <span className="info-label">City:</span> {formData.city}
                </p>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3 className="section-title">ID Information</h3>
            <div className="info-list">
              <p>
                <span className="info-label">PAN Number:</span> {formData.panNumber}
              </p>
              <p>
                <span className="info-label">Aadhar Number:</span> {formData.aadharNumber}
              </p>
            </div>
          </div>

          <div className="button-container">
            <button onClick={() => navigate("/")} className="back-button">
              Back to Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage
