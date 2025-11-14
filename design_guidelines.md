# Pokémon Quiz Game - Design Guidelines

## Design Approach

**Reference-Based Approach:** Drawing inspiration from Pokémon GO, official Pokémon digital experiences, and modern gaming interfaces (like Duolingo's playful engagement patterns and Nintendo's polished UI). The design should be vibrant, energetic, playful yet professional.

## Core Design Principles

1. **Playful Professionalism** - Gaming aesthetic with polished execution
2. **Clear Game States** - Instant visual feedback for all interactions
3. **Energy & Motion** - Dynamic but not distracting
4. **Accessibility First** - Clear typography, high contrast, readable at all sizes

---

## Typography

**Primary Font:** "Poppins" (Google Fonts) - playful, rounded, gaming-friendly
**Secondary Font:** "Inter" (Google Fonts) - clean readability for UI text

**Hierarchy:**
- Hero/Title: 3xl-5xl, Bold (700)
- Section Headers: 2xl-3xl, SemiBold (600)
- Game Questions: xl-2xl, Medium (500)
- Body Text: base-lg, Regular (400)
- UI Labels: sm-base, Medium (500)

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16
- Micro spacing: p-2, gap-2
- Standard spacing: p-4, m-4, gap-4
- Section padding: py-8 to py-16
- Container spacing: px-4 to px-8

**Grid System:**
- Mobile: Single column, full width
- Tablet: 2-column for region selection
- Desktop: 3-4 column for region cards, centered game area

**Containers:**
- Max width: max-w-6xl for main content
- Game area: max-w-2xl centered
- Full bleed for backgrounds

---

## Component Library

### 1. Home/Region Selection Screen

**Layout:**
- Hero section (60vh min): Large logo/title, tagline, "Start Playing" CTA
- Region grid below: Card-based layout, 3-4 columns desktop, 2 tablet, 1 mobile
- Each region card: Region name, representative Pokémon sprite, Pokédex range indicator

**Region Cards:**
- Elevated cards with soft shadows (shadow-lg)
- Rounded corners (rounded-2xl)
- Hover: Lift effect (transform scale-105, increased shadow)
- Icon/sprite: 96x96px placeholder for region representative Pokémon
- Typography: Region name (text-xl font-bold), subtitle (text-sm)

### 2. Difficulty Selection Screen

**Layout:**
- Breadcrumb navigation: Home > [Region Name]
- Header: Region name with icon/badge
- Difficulty cards: 2-column grid (desktop), stacked (mobile)
- Back button: Top-left

**Difficulty Cards:**
- Larger cards than regions (min-h-40)
- Badge/icon for difficulty level
- Title: "Easy", "Medium", "Hard", "Expert"
- Description: What user needs to guess
- CTA button: "Start Quiz"
- Expert mode: Special visual treatment (border, badge) only in General

### 3. Game/Question Screen

**Layout Structure:**
- Fixed header: Score counter, region indicator, difficulty badge, quit button
- Centered game area (max-w-2xl):
  - Pokémon image container (400x400px, centered)
  - Question prompt
  - Input field(s) based on difficulty
  - Submit button
  - Feedback area (appears after submission)
- Progress indicator: Question count (optional: "Question 5 of 10")

**Pokémon Display:**
- Square container (aspect-square)
- Silhouette effect until answered (filter: brightness(0))
- Rounded container (rounded-3xl)
- Soft shadow behind image

**Input Fields:**
- Easy: Single text input (Name)
- Medium: Single text input with helper text "Separate types with commas"
- Hard: Number input (Pokédex #)
- Expert: Three separate inputs stacked (Number, Types, Name) with clear labels

**Input Styling:**
- Large, friendly inputs (text-lg, p-4)
- Rounded (rounded-xl)
- Clear focus states
- Placeholder text with examples

**Submit Button:**
- Prominent, wide (w-full on mobile, max-w-xs centered on desktop)
- Large text (text-lg)
- Rounded (rounded-xl)
- Active state: Transform scale-95

### 4. Feedback Component

**Appears after submission:**
- Correct: Celebration animation, checkmark icon, "Correct!" message
- Incorrect: Shake animation, X icon, "Try Again" message, show correct answer
- Display full Pokémon details: Image (revealed), Name, Types, Number

**Layout:**
- Card overlay or section below question
- Pokémon stats displayed cleanly
- "Next Question" button (correct) or "Try Again" button (incorrect)

### 5. Score/Stats Display

**Header Component:**
- Current score/streak counter
- Visual progress bar or badge system
- Clean, compact design (doesn't overwhelm game)

**Session Stats (optional screen):**
- Total questions answered
- Correct/Incorrect ratio
- Current streak
- Best streak

### 6. Navigation & UI Elements

**Header Navigation:**
- Logo/title (left)
- Stats/score (center or right)
- Quit/Menu button (right)

**Buttons:**
- Primary: Solid, bold, rounded-xl
- Secondary: Outline or ghost style
- Icon buttons: Circular (rounded-full), 40x40 min

**Cards:**
- Consistent rounded-2xl
- Shadow-md default, shadow-lg on hover
- Smooth transitions (transition-all duration-300)

---

## Responsive Breakpoints

**Mobile (base):**
- Single column layouts
- Full-width cards
- Stacked difficulty options
- Pokémon image: 280x280px

**Tablet (md: 768px):**
- 2-column region grid
- Pokémon image: 350x350px
- Side-by-side difficulty cards

**Desktop (lg: 1024px):**
- 3-4 column region grid
- Centered game area with breathing room
- Pokémon image: 400x400px
- Max-width containers for readability

---

## Images

**Required Images:**

1. **Hero Section (Home):**
   - Large hero image/illustration featuring iconic Pokémon (Pikachu, Charizard, etc.)
   - Position: Background with overlay, or split-screen design
   - Dimensions: Full viewport width, 60vh height

2. **Region Cards:**
   - Sprite/icon for each region's signature Pokémon (64x64 to 96x96px)
   - Kanto: Charizard, Johto: Lugia, Hoenn: Rayquaza, etc.

3. **Game Screen:**
   - Dynamic Pokémon images from PokéAPI (provided by backend)
   - Display: 280x280px (mobile) to 400x400px (desktop)
   - Initially shown as silhouette (CSS filter)

4. **Empty States:**
   - Pokéball icon or graphic when no question loaded
   - Victory/completion screen illustration

---

## Animations

**Use Sparingly - Gaming Context:**

1. **Card Hover:** Subtle lift (translateY(-4px)) + shadow increase
2. **Feedback States:**
   - Correct: Gentle bounce or scale pulse
   - Incorrect: Horizontal shake (3-4 times)
3. **Image Reveal:** Transition from silhouette to full color (1s duration)
4. **Page Transitions:** Smooth fade (300ms) between screens
5. **Button Active:** Quick scale-down (95%) on click

**No Background Animations:** Keep distracting motion minimal to maintain focus on gameplay.

---

## Special Considerations

**Pokémon Imagery:**
- All Pokémon images come from PokéAPI (backend provides URLs)
- Use aspect-ratio utility for consistent sizing
- Loading states for images (skeleton or spinner)

**Expert Mode Badge:**
- Distinctive visual treatment only in General region
- Clearly indicate "All Pokémon" scope
- Special badge/icon to show advanced difficulty

**Mobile-First:**
- Touch targets: Minimum 44x44px
- Thumb-friendly button placement
- Prevent zoom on input focus (font-size: 16px minimum)

**Accessibility:**
- ARIA labels for game state
- Keyboard navigation support
- Screen reader announcements for correct/incorrect
- High contrast mode friendly

---

## Key Implementation Notes

- Use Heroicons for all UI icons (via CDN)
- Google Fonts: Poppins (headings), Inter (body)
- Maintain 8px base spacing rhythm throughout
- Cards use consistent shadow and border-radius system
- All interactive elements have clear hover/focus states
- Form inputs follow consistent styling pattern across all difficulty modes