import React, { useState } from 'react';
import PredictionForm from './componentes/PredictionForm';
import ResultCard from './componentes/ResultCard';
import './styles.css';

function App() {
  const [result, setResult] = useState(null);//guarda los resultados del backend
  const [loading, setLoading] = useState(false);//pantalla de carga
  const [error, setError] = useState('');// errores

  //envia una peticion post a el backend y se guarda la respuesta en result
  const handlePrediction = async (formData) => {
    setLoading(true);
    setError('');
    setResult(null); // Limpiar resultados anteriores
    
    try {
      
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error en la predicción');
      const data = await response.json();
      setResult(data);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // se renderiza los valores ingresados ,el resultado de la prediccion y se da la recomendacion con IA
  return (
    <div className="container">
      <h1> </h1>
      
      {/* Formulario */}
      <PredictionForm onSubmit={handlePrediction} />
      
      {/* Loading */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      
      {/* Resultados */}
      {!loading && result && (
        <div className="result-container">
          <ResultCard data={result} />
        </div>
      )}
      
      {/* Error */}
      {!loading && error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
}

export default App;