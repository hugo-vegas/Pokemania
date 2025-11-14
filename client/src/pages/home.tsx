import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { regionNames, regionRanges, type Region } from "@shared/schema";
import { Sparkles } from "lucide-react";
import heroImage from "@assets/generated_images/Pokemon_hero_banner_illustration_49944a26.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background" />
        </div>
        
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-accent" />
            <h1 className="font-heading text-5xl font-bold text-white md:text-6xl lg:text-7xl">
              PokéQuiz
            </h1>
            <Sparkles className="h-8 w-8 text-accent" />
          </div>
          <p className="mb-8 max-w-2xl font-body text-lg text-white/90 md:text-xl">
            ¡Pon a prueba tus conocimientos Pokémon! Adivina por nombre, tipo o número de Pokédex
          </p>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
              10 Regiones
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
              4 Dificultades
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
              1025 Pokémon
            </Badge>
          </div>
        </div>
      </div>

      {/* Regions Grid */}
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h2 className="mb-8 text-center font-heading text-3xl font-semibold text-foreground md:text-4xl">
          Selecciona tu Región
        </h2>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {regionNames.map((region) => (
            <RegionCard key={region} region={region} />
          ))}
        </div>
      </div>
    </div>
  );
}

function RegionCard({ region }: { region: Region }) {
  const range = regionRanges[region];
  const isGeneral = region === 'General';
  
  return (
    <Link href={`/region/${region}`} data-testid={`link-region-${region.toLowerCase()}`}>
      <Card className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer hover-elevate active-elevate-2 p-6">
        {isGeneral && (
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/20" />
        )}
        
        <div className="relative">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-heading text-xl font-bold text-card-foreground">
              {region}
            </h3>
            {isGeneral && (
              <Badge variant="default" className="bg-accent text-accent-foreground" data-testid={`badge-general-${region.toLowerCase()}`}>
                Todas
              </Badge>
            )}
          </div>
          
          <p className="mb-4 text-sm text-muted-foreground font-body">
            Pokédex #{range.min} - #{range.max}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              {range.max - range.min + 1} Pokémon
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
