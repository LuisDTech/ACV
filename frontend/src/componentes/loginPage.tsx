import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Por favor, completa todos los campos");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      alert(`¡Bienvenido al sistema ACVInsight, ${email}!`);
      setLoading(false);
      // Redirigir a dashboard o análisis:
      // navigate('/analisis');
    }, 2000);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-gray-700 rounded-2xl shadow-2xl overflow-hidden relative">
        {/* Efectos decorativos */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-48 h-48 border border-gray-400 rounded-full"></div>
          <div className="absolute bottom-10 right-20 w-32 h-32 border border-gray-400 rounded-full"></div>
        </div>

        <div className="flex min-h-[500px] relative z-10">
          {/* Lado izquierdo */}
          <div className="flex-1 p-8">
            {/* Encabezado */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-white font-medium">ACVInsight</span>
              </div>
            </div>

            {/* Formulario */}
            <div className="max-w-sm">
              <div className="mb-6">
                <p className="text-gray-400 text-xs font-medium mb-1">
                  ACCESO MÉDICO
                </p>
                <h1 className="text-white text-2xl font-bold">
                  Iniciar Sesión<span className="text-blue-500">.</span>
                </h1>
                <p className="text-gray-400 text-sm mt-2">
                  ¿No tienes cuenta?
                  <button
                    onClick={() =>
                      alert("Redirigiendo a la página de registro médico...")
                    }
                    className="text-blue-500 hover:underline ml-1"
                  >
                    Registrarse
                  </button>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Email Médico
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full bg-gray-600 text-white px-4 py-2.5 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none transition-colors pr-10"
                      placeholder="doctor@hospital.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Contraseña */}
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full bg-gray-600 text-white px-4 py-2.5 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none transition-colors pr-10"
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={togglePassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {showPassword ? (
                          <>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                            />
                          </>
                        ) : (
                          <>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Recordarme y enlace */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-500 text-blue-500 focus:ring-blue-500 bg-gray-600"
                    />
                    <span className="text-gray-400">Recordarme</span>
                  </label>
                  <button
                    onClick={() =>
                      alert("Funcionalidad de recuperación de contraseña...")
                    }
                    className="text-blue-500 hover:underline"
                    type="button"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                {/* Botones */}
                <div className="flex space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => alert("Volver a la página anterior")}
                    className="px-4 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium border border-gray-500"
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex-1"
                  >
                    {loading ? "Iniciando..." : "Iniciar Sesión"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Lado derecho - decorativo */}
          <div className="flex-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-green-600/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Logo inferior */}
            <div className="absolute bottom-6 right-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-white font-medium text-sm">
                  ACVInsight
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
