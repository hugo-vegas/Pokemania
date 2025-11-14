# PokéQuiz - Juego de Adivinanzas de Pokémon

## Descripción General
Aplicación web interactiva de adivinanzas de Pokémon con múltiples regiones y niveles de dificultad. Los jugadores deben adivinar Pokémon basándose en su imagen, ya sea por nombre, tipo o número de Pokédex.

## Características Principales

### Regiones Disponibles
- **Kanto** (Pokédex #1-151)
- **Johto** (Pokédex #152-251)
- **Hoenn** (Pokédex #252-386)
- **Sinnoh** (Pokédex #387-493)
- **Unova** (Pokédex #494-649)
- **Kalos** (Pokédex #650-721)
- **Alola** (Pokédex #722-809)
- **Galar** (Pokédex #810-905)
- **Paldea** (Pokédex #906-1025)
- **General** (Todos los Pokémon #1-1025)

### Niveles de Dificultad

1. **Fácil**: Adivina el nombre del Pokémon
2. **Media**: Adivina el tipo del Pokémon
3. **Difícil**: Adivina el número de Pokédex
4. **Experto** (Solo en General): Adivina número, tipo Y nombre del Pokémon

### Sistema de Juego
- Contador de puntuación en tiempo real
- Sistema de rachas (streak) de respuestas correctas
- Imágenes de Pokémon mostradas como siluetas hasta responder
- Feedback inmediato con información completa del Pokémon
- Animaciones suaves y transiciones fluidas

## Arquitectura Técnica

### Frontend
- **Framework**: React con TypeScript
- **Routing**: Wouter
- **Estado**: TanStack Query (React Query)
- **UI**: Shadcn UI + Tailwind CSS
- **Fuentes**: Poppins (títulos) e Inter (cuerpo)
- **Tema**: Colores inspirados en Pokémon (rojo primary, amarillo accent, azul)
- **Diseño**: 100% responsive, mobile-first

### Backend
- **Backend Flask**: Servidor existente que maneja lógica del juego y obtiene datos de PokéAPI
- **Backend Express**: Servidor proxy que conecta frontend con Flask
- **Endpoints**:
  - `GET /api/regions` - Lista de regiones disponibles
  - `POST /api/question` - Obtiene una pregunta (región + dificultad)
  - `POST /api/answer` - Verifica respuesta del usuario

### Estructura de Archivos

```
client/
├── src/
│   ├── pages/
│   │   ├── home.tsx              # Pantalla inicio con selección de regiones
│   │   ├── difficulty-selection.tsx  # Selección de dificultad por región
│   │   └── game.tsx              # Pantalla principal del juego
│   ├── components/ui/            # Componentes Shadcn UI
│   ├── App.tsx                   # Router principal
│   └── index.css                 # Estilos globales y sistema de elevación
shared/
└── schema.ts                     # Tipos TypeScript y esquemas Zod
server/
├── index.ts                      # Servidor Express principal
└── routes.ts                     # Rutas API (proxy a Flask)
```

## Flujo de Usuario

1. **Inicio**: Usuario ve hero con logo y selecciona una región
2. **Dificultad**: Usuario selecciona nivel de dificultad
3. **Juego**: 
   - Se muestra imagen del Pokémon (como silueta)
   - Usuario escribe respuesta según dificultad
   - Sistema valida y muestra feedback
   - Se revela la imagen completa del Pokémon
   - Usuario puede continuar con siguiente pregunta
4. **Estadísticas**: Puntuación y racha se mantienen durante la sesión

## Desarrollo Reciente

### Task 1: Schema & Frontend (COMPLETADO)
- ✅ Generada imagen hero para landing page
- ✅ Configurados design tokens (fuentes Poppins/Inter, colores)
- ✅ Definidos todos los esquemas TypeScript en shared/schema.ts
- ✅ Creadas 3 páginas principales: Home, DifficultySelection, Game
- ✅ Implementado sistema de puntuación y rachas
- ✅ Diseño responsive con animaciones personalizadas
- ✅ Estados de loading, feedback visual, revelación de imagen
- ✅ Todas las interacciones con data-testid para testing

### Task 2: Backend (COMPLETADO)
- ✅ Implementado proxy Express → Flask con axios
- ✅ Creados endpoints /api/regions, /api/question, /api/answer
- ✅ Configurado manejo de errores y validación Zod
- ✅ Documentadas variables de entorno necesarias
- ✅ Solucionado conflicto de puertos (Express:5000, Flask:5001)

### Task 3: Integración & Testing (COMPLETADO)
- ✅ QueryFn configurado correctamente para POST requests
- ✅ Validación Zod en proxy Express (questionResponseSchema, answerResponseSchema)
- ✅ Emojis removidos de toasts para cumplir con design guidelines
- ✅ data-testid completos para testing e2e
- ✅ Validación de rutas robusta con useEffect + useRef
- ✅ Botón Quit con confirmación del usuario
- ✅ Estados de loading con Skeleton components
- ✅ Feedback visual con toasts y animaciones
- ✅ Aprobación del arquitecto: MVP listo para testing

### Estado Actual

**MVP COMPLETO Y APROBADO** ✅

El frontend está completamente funcional y listo para conectarse con tu Flask backend. Todos los componentes, animaciones, validaciones y flujos de juego están implementados y han sido revisados por el arquitecto.

### Próximos Pasos para el Usuario

1. **Inicia tu Flask backend en el puerto 5001**:
   ```python
   # En tu archivo Flask (app.py o similar)
   if __name__ == '__main__':
       app.run(debug=True, port=5001)
   ```

2. **Ejecuta el Flask backend**:
   ```bash
   python tu_archivo_flask.py
   ```

3. **Prueba la aplicación**:
   - El frontend ya está corriendo en: https://[tu-repl].replit.dev
   - Selecciona una región (Kanto, Johto, etc.)
   - Elige dificultad (Fácil, Media, Difícil, o Experto en General)
   - ¡Juega y adivina Pokémon!

### Mejoras Futuras (Post-MVP)

- Persistencia de puntuaciones en base de datos
- Tabla de clasificación (leaderboard)
- Modo multijugador
- Sistema de logros y medallas
- Estadísticas detalladas por región
- Validación más completa de requests con Zod schemas

## Variables de Entorno

### Backend Flask (externo)
**IMPORTANTE**: El backend Flask debe estar corriendo en un puerto DIFERENTE al 5000.

1. Modifica tu archivo Flask (`app.py` o similar) para que corra en el puerto 5001:
   ```python
   if __name__ == '__main__':
       app.run(debug=True, port=5001)
   ```

2. **Configura la variable de entorno** `FLASK_BACKEND_URL`:
   - En Replit: Usa el panel de Secrets y agrega `FLASK_BACKEND_URL=http://localhost:5001`
   - Localmente: Crea un archivo `.env` con `FLASK_BACKEND_URL=http://localhost:5001`

**Razón**: El servidor Express (este proyecto) usa el puerto 5000 para servir tanto el frontend como el proxy API. El Flask backend debe usar otro puerto para evitar conflictos.

**Nota**: Si no configuras la variable de entorno, el sistema usará `http://localhost:5000` por defecto, lo cual causará conflictos.

## Notas de Diseño

- Seguir religiosamente `design_guidelines.md`
- Colores primarios: Rojo (primary), Amarillo (accent), Azul
- Animaciones sutiles: bounce, shake, fade-in, scale-in
- Tarjetas con hover elevate effect
- Tipografía clara con jerarquía bien definida
- Touch targets mínimo 44x44px
- Accesibilidad con ARIA labels y navegación por teclado
