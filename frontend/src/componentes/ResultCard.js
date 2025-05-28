import React from 'react';
import { marked } from 'marked'; // Importar marked para parsear markdown

const ResultCard = ({ data }) => {
  const isHighRisk = data.prediction.includes('ALTO');
  
  return (
    <div className={`result-card ${isHighRisk ? 'high-risk' : 'low-risk'}`}>
      <div className="risk-header">
        <div className="risk-icon">
          {isHighRisk ? '⚠️' : '✅'}
        </div>
        <div>
          <h3>{data.prediction}</h3>
          <div className="probability-badge">
            Probabilidad: {data.probability}%
          </div>
        </div>
      </div>

      <div className="recommendations-content">
        <div dangerouslySetInnerHTML={{ 
          __html: marked.parse(data.ai_recommendations || '') 
        }} />
      </div>

      {isHighRisk && (
        <div className="emergency-alert">
          <p>🚨 Contacto de emergencia: 911</p>
        </div>
      )}
    </div>
  );
};

export default ResultCard;