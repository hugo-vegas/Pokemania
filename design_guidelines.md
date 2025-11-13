# Pokémon Quiz Game - Design Guidelines

## Design Approach

**Reference-Based:** Drawing inspiration from official Pokémon games, Nintendo Switch UI, and modern quiz applications like Kahoot and Duolingo, combined with the classic Pokédex aesthetic.

## Core Design Principles

1. **Pokémon Brand Fidelity:** Vibrant, playful, and instantly recognizable
2. **Game-First Mentality:** Clear visual hierarchy for game states and immediate feedback
3. **Progressive Disclosure:** Guide users through region → difficulty → gameplay seamlessly
4. **Celebration of Success:** Reward correct answers with delightful interactions

## Typography

**Primary Font:** 'Press Start 2P' (Google Fonts) - pixelated retro gaming feel for headers/titles
**Secondary Font:** 'Poppins' (Google Fonts) - clean, modern readability for body text

- **Hero/Titles:** Press Start 2P, uppercase, text-2xl to text-4xl
- **Section Headers:** Press Start 2P, text-lg to text-xl
- **Game Text:** Poppins SemiBold, text-base to text-lg
- **Body/Instructions:** Poppins Regular, text-sm to text-base

## Layout System

**Spacing:** Tailwind units of 4, 6, 8, 12, 16 (p-4, gap-6, mt-8, py-12, px-16)

**Container Structure:**
- Main wrapper: max-w-7xl mx-auto px-4
- Game area: max-w-4xl mx-auto for focused gameplay
- Card grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

## Navigation Flow & Screens

### 1. Home/Landing Screen
- **Full-viewport hero** with iconic Pokémon imagery (Pikachu, starter Pokémon collage, or Pokéball graphic)
- Centered "POKÉMON QUIZ MASTER" title with Press Start 2P
- Tagline: "¿Cuánto sabes sobre Pokémon?" 
- Primary CTA button: "COMENZAR AVENTURA"
- Background: Gradient from Pokémon red (#EE1515) to orange (#FB6C6C)

### 2. Region Selection Screen
- **Header:** "ELIGE TU REGIÓN" with Pokéball icon
- **Grid Layout:** 3x3 grid (3 columns on desktop, 2 on tablet, 1 on mobile)
- **Region Cards:** 
  - Each card shows region name + generation badge
  - Iconic landmark illustration/silhouette from each region
  - Hover: lift effect (translate-y-2) + shadow increase
  - Special "MODO GENERAL" card with rainbow gradient border
- Footer breadcrumb: Home > Regiones

### 3. Difficulty Selection Screen
- **Header:** "REGIÓN: [Name] - ELIGE DIFICULTAD"
- **Card Layout:** Horizontal cards (on desktop) stacked vertically (mobile)
- **Difficulty Cards:**
  - **FÁCIL:** Green background, "Adivina el NOMBRE"
  - **MEDIA:** Yellow background, "Adivina el TIPO"  
  - **DIFÍCIL:** Orange background, "Adivina el NÚMERO de Pokédex"
  - **EXPERTO** (General only): Red background, "¡TODO! Nombre + Tipo + Número"
  - Each card shows challenge description + star rating (1-4 stars)
- Breadcrumb: Home > Regiones > [Region Name] > Dificultad

### 4. Game Screen
**Layout:**
- **Top Bar:** Score counter, region badge, difficulty indicator, progress bar
- **Center Card (Large):** 
  - Pokémon sprite/image (240px x 240px minimum)
  - Question based on difficulty
  - Input field(s) or multiple choice buttons
  - Submit button ("CONFIRMAR")
- **Side Info:** Lives/attempts remaining, current streak
- **Bottom:** Skip button (optional) + hint system

**Feedback States:**
- ✓ Correct: Green overlay flash, confetti animation, +points display
- ✗ Incorrect: Red shake animation, show correct answer briefly

### 5. Results Screen
- **Score Summary Card:** Large centered card showing:
  - Total score with trophy icon
  - Accuracy percentage with circular progress
  - Pokémon caught count vs total
  - Achievement badges earned
- **CTA Buttons:** "JUGAR DE NUEVO" | "CAMBIAR REGIÓN" | "MENÚ PRINCIPAL"
- Celebratory background with floating Pokéballs

## Component Library

### Cards
- **Base Card:** Rounded corners (rounded-xl), shadow-lg, padding p-6
- **Interactive Cards:** Hover lift effect, cursor-pointer, transition-transform
- **Region Cards:** Aspect ratio 4:3, image background with gradient overlay
- **Pokémon Display Card:** White/light background, centered sprite, shadow-2xl

### Buttons
- **Primary CTA:** Bold, uppercase, px-8 py-4, rounded-full, shadow-lg
  - Background: Pokémon red gradient
  - Hover: scale-105, increased shadow
- **Secondary:** Outlined style with border-2, transparent background
- **Game Buttons:** Larger touch targets (min 48px height), full-width on mobile

### Input Fields
- **Text Input:** Large (text-xl), centered text, rounded-lg, border-2
- **Focus State:** Pokémon blue border (#3B4CCA), shadow-outline
- **Multiple Choice:** Button-styled options in grid, selected state with blue background

### Progress Indicators
- **Score Counter:** Pill-shaped, yellow background, bold numbers
- **Progress Bar:** Gradient fill (green → yellow → red based on completion)
- **Lives Display:** Heart icons (filled/empty Pokéball icons)

### Icons
Use **Font Awesome** (CDN) for:
- fa-trophy (achievements)
- fa-star (difficulty rating)
- fa-heart (lives)
- fa-arrow-right (navigation)
- fa-home (home button)
- fa-rotate-right (retry)

## Color Palette

**Primary Colors (Pokémon Brand):**
- Pokémon Red: #EE1515
- Pokémon Yellow: #FFCB05
- Pokémon Blue: #3B4CCA
- Pokéball White: #FFFFFF
- Pokéball Black: #2B2B2B

**Difficulty Colors:**
- Easy Green: #10B981
- Medium Yellow: #F59E0B
- Hard Orange: #F97316
- Expert Red: #DC2626

**Feedback Colors:**
- Success: #22C55E
- Error: #EF4444
- Info: #3B82F6

**Neutral Grays:**
- Background: #F3F4F6
- Card Background: #FFFFFF
- Text: #1F2937
- Border: #E5E7EB

## Responsive Behavior

**Mobile (< 768px):**
- Single column layouts
- Stacked navigation
- Full-width cards
- Larger touch targets (minimum 48px)
- Bottom-fixed game controls

**Tablet (768px - 1024px):**
- 2-column grids where applicable
- Maintain card-based navigation

**Desktop (> 1024px):**
- 3-column grids for region selection
- Side-by-side difficulty options
- Centered game area with max-width constraint

## Animations

Use sparingly and purposefully:
- **Page Transitions:** Fade in with slight slide-up (duration-300)
- **Card Hover:** Lift effect (translate-y-2, duration-200)
- **Answer Feedback:** 
  - Correct: Scale pulse + confetti burst
  - Incorrect: Horizontal shake (animate-shake)
- **Score Updates:** Number count-up animation
- **Pokémon Appearance:** Fade in + scale from 0.8 to 1

## Images

### Hero Image (Home Screen):
**Description:** Vibrant collage featuring popular Pokémon (Pikachu, Charizard, Eevee) with Pokéballs scattered around. Bright, energetic composition with red-orange gradient background.
**Placement:** Full-width hero section, 60-70vh height

### Region Card Images:
**Description:** Iconic landmark silhouettes or representative Pokémon for each region (e.g., Kanto = Pokémon Tower silhouette, Johto = Ho-Oh, etc.)
**Placement:** Background images within region selection cards, subtle overlay

### Pokémon Sprites:
**Description:** Official Pokémon sprite artwork (PNG format from PokéAPI or similar)
**Placement:** Center of game card, 240x240px, white/light background

### Background Patterns:
**Description:** Subtle repeating Pokéball pattern or dotted grid
**Placement:** Body background, low opacity (0.05-0.1)

## Accessibility
- Maintain WCAG AA contrast ratios
- Keyboard navigation for all interactive elements
- Clear focus states (blue outline)
- Screen reader labels for icons
- Text alternatives for images
- Sufficient button sizes for touch targets