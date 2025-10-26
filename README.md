# G-Cloud Search Travel

AI-powered travel itinerary planner using Google Gemini AI and Google Maps integration.

## Project Status

**Version:** 0.0.0  
**Status:** Development Phase  
**Updated:** October 26, 2025

## Features

### Core Functionality
- AI itinerary generation via Google Gemini
- Interactive trip planning form
- 6 activity categories (Adventure, Culture, Wellness, Food, Shopping, Nightlife)
- Google Maps integration with location plotting
- User authentication (Supabase)
- Trip history management
- PDF export functionality

### Technical Features
- Responsive design with dark/light themes
- Real-time loading states
- Error handling and validation
- Session management

## Tech Stack

**Frontend:** React 18, TypeScript, Vite  
**UI:** Tailwind CSS, Radix UI  
**AI:** Google Gemini API  
**Maps:** Google Maps API  
**Backend:** Supabase  
**Utils:** jsPDF, html2canvas, Framer Motion

## Development

```bash
npm install
npm run dev
npm run build
```

## Environment Setup

```env
VITE_GOOGLE_MAPS_API_KEY=your_key
VITE_GEMINI_API_KEY=your_key
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

## Project Structure

```
src/
├── components/     # UI components
├── pages/         # Route components
├── services/      # API integrations
├── types/         # TypeScript definitions
├── lib/           # Utilities
└── hooks/         # Custom hooks
```

## Roadmap

- [ ] Flight booking integration
- [ ] Hotel recommendations
- [ ] Weather data integration
- [ ] Mobile app
- [ ] Collaborative planning
- [ ] Budget tracking
- [ ] Social sharing
