import React from 'react';
import './stylehome.css'; // Archivo CSS para los estilos

const Index = () => {
  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleGetStartedClick = () => {
    // Lógica para iniciar evaluación
    console.log("Iniciar evaluación");
  };

  return (
    <div className="app-container">
      {/* Encabezado */}
      <header className="header">
        <nav className="nav-container">
          <div className="logo-container">
            <img
              src="/backend/api/static/assets/images/logo.png"
              alt="Logo ACVInsight"
              className="logo-image"
            />
            <span className="logo-text">ACVInsight</span>
          </div>

          {/* Navegación */}
          <div className="nav-links">
            <a href="#" className="nav-link">Inicio</a>
            <button
              id="login-btn"
              className="login-button"
              onClick={handleLoginClick}
            >
              <svg
                className="login-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              <span>Login</span>
            </button>
          </div>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="main-content">
        <div className="hero-container">
          <div className="hero-text">
            <h1 className="hero-title">
              PREDICCIÓN TEMPRANA DE ACV CON IA
            </h1>
            <p className="hero-description">
              Sistema avanzado de inteligencia artificial para la detección
              temprana y predicción de accidentes cerebrovasculares, mejorando los
              tiempos de respuesta médica.
            </p>
            <button
              id="get-started-btn"
              className="cta-button"
              onClick={handleGetStartedClick}
            >
              <span>Iniciar Evaluación</span>
              <svg
                className="cta-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>

          <div className="hero-image-container">
            <div className="image-gradient">
              <img
                src="/backend/api/static/assets/images/principal.png"
                alt="Sistema médico de predicción ACV"
                className="hero-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="stats-container">
          <div className="stats-header">
            <h3 className="stats-title">
              Confiado por Profesionales,
            </h3>
            <p className="stats-subtitle">Respaldado por Datos</p>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">86%</div>
              <p className="stat-description">Precisión en Predicciones</p>
            </div>

            <div className="stat-item">
              <div className="stat-number">150+</div>
              <p className="stat-description">Hospitales Conectados</p>
            </div>

            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <p className="stat-description">Monitoreo Continuo</p>
            </div>

            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <p className="stat-description">Vidas Salvadas</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;