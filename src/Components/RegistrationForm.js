"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { countriesData } from "../data/countries-data"
import "../styles/Form.css"

// Validation patterns
const emailValidator =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
const phoneValidator = /^\d{10}$/
const panValidator = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
const aadharValidator = /^\d{12}$/
const usernameValidator = /^[a-zA-Z0-9_]{3,20}$/

function RegistrationForm() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [cities, setCities] = useState([])

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    panNumber: "",
    aadharNumber: "",
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Update cities when country changes
    if (name === "country") {
      const selectedCountry = countriesData.find((c) => c.name === value)
      setCities(selectedCountry?.cities || [])

      // Reset city when country changes
      setFormData((prev) => ({
        ...prev,
        city: "",
        [name]: value,
      }))
    }

    // Validate field on change if it's been touched
    if (touched[name]) {
      validateField(name, value)
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))

    validateField(name, value)
  }

  const validateField = (name, value) => {
    let error = ""

    switch (name) {
      case "firstName":
        if (!value.trim()) error = "First name is required"
        break

      case "lastName":
        if (!value.trim()) error = "Last name is required"
        break

      case "username":
        if (!value.trim()) error = "Username is required"
        else if (!usernameValidator.test(value))
          error = "Username must be 3-20 characters and can only contain letters, numbers, and underscores"
        break

      case "email":
        if (!value.trim()) error = "Email is required"
        else if (!emailValidator.test(value)) error = "Please enter a valid email address"
        break

      case "password":
        if (!value.trim()) error = "Password is required"
        else if (!passwordValidator.test(value))
          error = "Password must contain at least 8 characters, 1 number, 1 uppercase and 1 lowercase letter"
        break

      case "confirmPassword":
        if (!value.trim()) error = "Please confirm your password"
        else if (value !== formData.password) error = "Passwords do not match"
        break

      case "phoneNumber":
        if (!value.trim()) error = "Phone number is required"
        else if (!phoneValidator.test(value)) error = "Please enter a valid 10-digit phone number"
        break

      case "country":
        if (!value.trim()) error = "Please select a country"
        break

      case "city":
        if (!value.trim()) error = "Please select a city"
        break

      case "panNumber":
        if (!value.trim()) error = "PAN number is required"
        else if (!panValidator.test(value)) error = "Please enter a valid PAN number (e.g., ABCDE1234F)"
        break

      case "aadharNumber":
        if (!value.trim()) error = "Aadhar number is required"
        else if (!aadharValidator.test(value)) error = "Please enter a valid 12-digit Aadhar number"
        break

      default:
        break
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))

    return !error
  }

  const validateForm = () => {
    const fields = [
      "firstName",
      "lastName",
      "username",
      "email",
      "password",
      "confirmPassword",
      "phoneNumber",
      "country",
      "city",
      "panNumber",
      "aadharNumber",
    ]

    const newErrors = {}
    let isValid = true

    fields.forEach((field) => {
      const value = formData[field]
      if (!validateField(field, value)) {
        isValid = false
        newErrors[field] = errors[field]
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Mark all fields as touched
    const allTouched = {}
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true
    })
    setTouched(allTouched)

    if (validateForm()) {
      // Store form data in session storage to access on the success page
      sessionStorage.setItem("registrationData", JSON.stringify(formData))

      // Navigate to success page
      navigate("/success")
    }
  }

  const isFormValid = () => {
    return (
      Object.values(errors).every((error) => !error) &&
      Object.keys(formData).every((key) => formData[key].trim() !== "")
    )
  }

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <div className="form-row">
        {/* First Name */}
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.firstName ? "input-error" : ""}
          />
          {errors.firstName && <p className="error-message">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.lastName ? "input-error" : ""}
          />
          {errors.lastName && <p className="error-message">{errors.lastName}</p>}
        </div>
      </div>

      {/* Username */}
      <div className="form-group">
        <label htmlFor="username">Username *</label>
        <input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.username ? "input-error" : ""}
        />
        {errors.username && <p className="error-message">{errors.username}</p>}
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="form-group">
        <label htmlFor="password">Password *</label>
        <div className="password-input">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password ? "input-error" : ""}
          />
          <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>

      {/* Confirm Password */}
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password *</label>
        <div className="password-input">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.confirmPassword ? "input-error" : ""}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
      </div>

      {/* Phone Number */}
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number *</label>
        <div className="phone-input">
          <select name="countryCode" value={formData.countryCode} onChange={handleChange} className="country-code">
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <option value="+61">+61</option>
            <option value="+86">+86</option>
          </select>
          <input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.phoneNumber ? "input-error phone-number" : "phone-number"}
            placeholder="10-digit number"
          />
        </div>
        {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
      </div>

      {/* Country */}
      <div className="form-group">
        <label htmlFor="country">Country *</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.country ? "input-error" : ""}
        >
          <option value="">Select a country</option>
          {countriesData.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        {errors.country && <p className="error-message">{errors.country}</p>}
      </div>

      {/* City */}
      <div className="form-group">
        <label htmlFor="city">City *</label>
        <select
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={!formData.country}
          className={errors.city ? "input-error" : ""}
        >
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <p className="error-message">{errors.city}</p>}
      </div>

      {/* PAN Number */}
      <div className="form-group">
        <label htmlFor="panNumber">PAN Number *</label>
        <input
          id="panNumber"
          name="panNumber"
          value={formData.panNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.panNumber ? "input-error" : ""}
          placeholder="ABCDE1234F"
        />
        {errors.panNumber && <p className="error-message">{errors.panNumber}</p>}
      </div>

      {/* Aadhar Number */}
      <div className="form-group">
        <label htmlFor="aadharNumber">Aadhar Number *</label>
        <input
          id="aadharNumber"
          name="aadharNumber"
          value={formData.aadharNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.aadharNumber ? "input-error" : ""}
          placeholder="12-digit number"
        />
        {errors.aadharNumber && <p className="error-message">{errors.aadharNumber}</p>}
      </div>

      <button type="submit" className="submit-button" disabled={!isFormValid()}>
        Register
      </button>
    </form>
  )
}

export default RegistrationForm
