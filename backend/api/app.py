from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
import requests  

#Acceso CORS desde localhost:3000
app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

# Configuración de modelos
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'model')

# Configuración de OpenRouter - API
OPENROUTER_API_KEY = "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"
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

try:
    #Carga el modelo entrenado y el codificador
    model = joblib.load(os.path.join(MODEL_DIR, 'modelo.pkl'))
    encoders = joblib.load(os.path.join(MODEL_DIR, 'encoders.pkl'))
except Exception as e:
    raise RuntimeError(f"Error cargando los modelos: {str(e)}")

FEATURE_ORDER = [
    'gender', 'age', 'hypertension', 'heart_disease', 'ever_married',
    'work_type', 'Residence_type', 'avg_glucose_level', 'bmi', 'smoking_status'
]

#Funcion para la recomendacion personalizada basandose en los datos del paciente
def generate_ai_recommendation(prediction_data, medical_result):
    """Genera recomendaciones personalizadas usando IA"""
    try:
        prompt = f"""
        Como experto en neurología y prevención de ACV, genera recomendaciones específicas para:
        - Paciente de {'alto' if medical_result['prediction'] == 'ALTO RIESGO DE ACV' else 'bajo'} riesgo
        - Edad: {prediction_data['age']}
        - Género: {prediction_data['gender']}
        - Hipertensión: {'Sí' if prediction_data['hypertension'] == 1 else 'No'}
        - Enfermedad cardíaca: {'Sí' if prediction_data['heart_disease'] == 1 else 'No'}
        - Nivel de glucosa: {prediction_data['avg_glucose_level']} mg/dL
        - IMC: {prediction_data['bmi']}
        
        Proporciona:
        1. Recomendaciones dietéticas específicas
        2. Actividad física recomendada
        3. Frecuencia de chequeos médicos
        4. Señales de alerta a monitorear
        5. Recursos adicionales
        
        """

        response = requests.post(
            OPENROUTER_URL,
            headers={
                'Authorization': f'Bearer {OPENROUTER_API_KEY}',
                'Content-Type': 'application/json'
            },
            json={
                'model': 'deepseek/deepseek-r1:free',
                'messages': [{'role': 'user', 'content': prompt}]
            }
        )

        if response.status_code == 200:
            return response.json()['choices'][0]['message']['content']
        return "No se pudieron generar recomendaciones en este momento."

    except Exception as e:
        app.logger.error(f'Error en generación de IA: {str(e)}')
        return "Error al generar recomendaciones personalizadas."

#Ruta para recibir los datos desde el fronted y devolver una prediccion-Formato JSON
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Validación de campos
        for field in FEATURE_ORDER:
            if field not in data or data[field] == '':
                return jsonify({'error': f'Campo requerido faltante: {field}'}), 400

        # Preprocesamiento y predicción
        input_data = preprocess_input(data)
        probability = model.predict_proba(input_data)[0][1]
        risk = 'ALTO RIESGO DE ACV' if probability >= 0.5 else 'BAJO RIESGO DE ACV'
        
        # Generar recomendaciones IA
        ai_recommendations = generate_ai_recommendation(data, {
            'prediction': risk,
            'probability': round(probability * 100, 2)
        })

        return jsonify({
            'prediction': risk,
            'probability': round(probability * 100, 2),
            'interpretation': get_interpretation(risk, probability),
            'ai_recommendations': ai_recommendations
        })

    except Exception as e:
        app.logger.error(f'Error en predicción: {str(e)}')
        return jsonify({'error': 'Error procesando la solicitud', 'details': str(e)}), 500

#Funcion para covertir los datos para que el modelo pueda hacer la prediccion
def preprocess_input(data):
    """Transforma los datos del frontend al formato requerido por el modelo"""
    processed = []
    for feature in FEATURE_ORDER:
        value = data[feature]
        
        # Aplicar transformaciones necesarias
        if feature in encoders:
            encoder = encoders[feature]
            try:
                processed.append(encoder.transform([value])[0])
            except ValueError:
                if hasattr(encoder, 'classes_'):
                    processed.append(len(encoder.classes_))
                else:
                    raise
        elif feature in ['hypertension', 'heart_disease']:
            processed.append(int(value))
        else:
            processed.append(float(value))
    
    return np.array([processed])

#Funcion para devolver la interpretacion segun el modelo basado en si hay o no hay probabilidad de un ACV
def get_interpretation(risk, probability):
    """Genera recomendaciones basadas en el riesgo"""
    base_interpretation = {
        'ALTO RIESGO DE ACV': {
            'summary': 'Riesgo elevado detectado',
            'recommendations': [
                'Consulta urgente con neurólogo',
                'Control de presión arterial diario',
                'Monitoreo de niveles de glucosa'
            ],
            'emergency_contact': 'Línea de emergencia: 911'
        },
        'BAJO RIESGO DE ACV': {
            'summary': 'Riesgo bajo',
            'recommendations': [
                'Mantener chequeos anuales',
                'Dieta balanceada',
                'Ejercicio regular'
            ]
        }
    }
    
    interpretation = base_interpretation[risk]
    interpretation['probability'] = probability
    return interpretation

#ejecucion del servidor en el puerto 5000
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)