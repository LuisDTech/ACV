"use client"

import { useState } from "react"

const PredictionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    hypertension: "",
    heart_disease: "",
    ever_married: "",
    work_type: "",
    Residence_type: "",
    avg_glucose_level: "",
    bmi: "",
    smoking_status: "",
  })

  const [showResults, setShowResults] = useState(false)
  const [recommendations, setRecommendations] = useState([])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (onSubmit) {
      try {
        const result = await onSubmit(formData)
        if (result && result.recommendations) {
          setRecommendations(result.recommendations)
          setShowResults(true)
        }
      } catch (error) {
        console.error("Error al obtener recomendaciones:", error)
      }
    }
  }

  return (
    <div className="prediction-container">
      <div className="header-section">
        <h1 className="main-title">Predictor de Riesgo de ACV</h1>
        <p className="subtitle">Evalúa tu riesgo de accidente cerebrovascular</p>
      </div>

      <div className="form-card">
        <div className="card-header">
          <div className="header-icon">📊</div>
          <h2>Información del Paciente</h2>
        </div>

        <form onSubmit={handleSubmit} className="prediction-form">
          {/* Información Personal */}
          <div className="section">
            <div className="section-header">
              <div className="section-icon">👤</div>
              <h3>Información Personal</h3>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Género</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Masculino / Femenino / Otro</option>
                  <option value="Male">Masculino</option>
                  <option value="Female">Femenino</option>
                  <option value="Other">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label>Edad</label>
                <input
                  type="number"
                  name="age"
                  min="0"
                  max="120"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Ingrese su edad"
                  required
                />
              </div>
            </div>
          </div>

          {/* Historial Médico */}
          <div className="section">
            <div className="section-header">
              <div className="section-icon">❤️</div>
              <h3>Historial Médico</h3>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>¿Hipertenso?</label>
                <select name="hypertension" value={formData.hypertension} onChange={handleChange} required>
                  <option value="">Sí / No</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>¿Enfermedad cardíaca?</label>
                <select name="heart_disease" value={formData.heart_disease} onChange={handleChange} required>
                  <option value="">Sí / No</option>
                  <option value="1">Sí</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Alguna vez casado</label>
                <select name="ever_married" value={formData.ever_married} onChange={handleChange} required>
                  <option value="">Sí / No</option>
                  <option value="Yes">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tipo de trabajo</label>
                <select name="work_type" value={formData.work_type} onChange={handleChange} required>
                  <option value="">Seleccionar tipo de trabajo</option>
                  <option value="children">Niños</option>
                  <option value="Govt_job">Empleo público</option>
                  <option value="Never_worked">Nunca ha trabajado</option>
                  <option value="Private">Privado</option>
                  <option value="Self-employed">Autónomo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="section">
            <div className="section-header">
              <div className="section-icon">🏠</div>
              <h3>Información Adicional</h3>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Zona de residencia</label>
                <select name="Residence_type" value={formData.Residence_type} onChange={handleChange} required>
                  <option value="">Urbana / Rural</option>
                  <option value="Urban">Urbana</option>
                  <option value="Rural">Rural</option>
                </select>
              </div>

              <div className="form-group">
                <label>¿Fuma?</label>
                <select name="smoking_status" value={formData.smoking_status} onChange={handleChange} required>
                  <option value="">Fumaba / Nunca / Actualmente...</option>
                  <option value="formerly smoked">Ex-fumador</option>
                  <option value="never smoked">Nunca fumó</option>
                  <option value="smokes">Fumador actual</option>
                  <option value="Unknown">Desconocido</option>
                </select>
              </div>
            </div>
          </div>

          {/* Métricas de Salud */}
          <div className="section">
            <div className="section-header">
              <div className="section-icon">🩺</div>
              <h3>Métricas de Salud</h3>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Nivel promedio de glucosa (mg/dL)</label>
                <input
                  type="number"
                  name="avg_glucose_level"
                  step="0.1"
                  min="50"
                  max="500"
                  value={formData.avg_glucose_level}
                  onChange={handleChange}
                  placeholder="Ej: 120.5"
                  required
                />
              </div>

              <div className="form-group">
                <label>IMC (Índice de Masa Corporal)</label>
                <input
                  type="number"
                  name="bmi"
                  step="0.1"
                  min="10"
                  max="50"
                  value={formData.bmi}
                  onChange={handleChange}
                  placeholder="Ej: 25.3"
                  required
                />
              </div>
            </div>
          </div>

          {/* Información Importante */}
          <div className="info-section">
            <div className="info-icon">ℹ️</div>
            <div className="info-content">
              <h4>Información Importante</h4>
              <p>
                Esta herramienta proporciona una evaluación preliminar basada en factores de riesgo conocidos. Los
                resultados son orientativos y no sustituyen el diagnóstico médico profesional. Siempre consulte con un
                especialista para una evaluación completa.
              </p>
            </div>
          </div>

          <button type="submit" className="submit-button">
            <span>▶</span>
            Iniciar Evaluación
          </button>

          <p className="form-footer">Complete el formulario para obtener su evaluación de riesgo personalizada</p>
        </form>
      </div>

      {showResults && recommendations.length > 0 && (
        <div className="result-container">
          <div className="result-card">
            <div className="recommendations-content">
              <h4>Recomendaciones:</h4>
              <ul>
                {recommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>

              <button
                onClick={() => {
                  setShowResults(false)
                  setRecommendations([])
                  setFormData({
                    gender: "",
                    age: "",
                    hypertension: "",
                    heart_disease: "",
                    ever_married: "",
                    work_type: "",
                    Residence_type: "",
                    avg_glucose_level: "",
                    bmi: "",
                    smoking_status: "",
                  })
                }}
                className="submit-button"
                style={{ marginTop: "1.5rem" }}
              >
                Nueva Evaluación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PredictionForm
