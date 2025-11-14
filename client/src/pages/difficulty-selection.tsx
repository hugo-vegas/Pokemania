import { useEffect, useRef } from "react";
import { Link, useParams, useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Zap, Target, Trophy, Crown } from "lucide-react";
import { type Region, type Difficulty, regionRanges } from "@shared/schema";

const difficultyConfig: Record<Difficulty, {
  icon: typeof Zap;
  title: string;
  description: string;
  color: string;
  badgeVariant: "default" | "secondary" | "destructive";
}> = {
  easy: {
    icon: Zap,
    title: "Fácil",
    description: "Adivina el nombre del Pokémon",
    color: "text-green-500",
    badgeVariant: "secondary",
  },
  medium: {
    icon: Target,
    title: "Media",
    description: "Adivina el tipo del Pokémon",
    color: "text-blue-500",
    badgeVariant: "default",
  },
  hard: {
    icon: Trophy,
    title: "Difícil",
    description: "Adivina el número de Pokédex",
    color: "text-orange-500",
    badgeVariant: "destructive",
  },
  expert: {
    icon: Crown,
    title: "Experto",
    description: "Adivina número, tipo y nombre",
    color: "text-purple-500",
    badgeVariant: "default",
  },
};

export default function DifficultySelection() {
  const params = useParams<{ region: string }>();
  const [, setLocation] = useLocation();
  const hasRedirected = useRef(false);
  
  const region = params.region;
  const isValidRegion = region && Object.keys(regionRanges).includes(region);
  
  useEffect(() => {
    if (!isValidRegion && !hasRedirected.current) {
      hasRedirected.current = true;
      setLocation('/');
    }
  }, [isValidRegion, setLocation]);
  
  if (!isValidRegion) {
    return null;
  }
  
  const range = regionRanges[region as Region];
  const isGeneral = region === 'General';

  const difficulties: Difficulty[] = isGeneral 
    ? ['easy', 'medium', 'hard', 'expert']
    : ['easy', 'medium', 'hard'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-2xl font-bold text-card-foreground md:text-3xl">
                  {region}
                </h1>
                {isGeneral && (
                  <Badge variant="default" className="bg-accent text-accent-foreground">
                    Todas las regiones
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground font-body">
                Pokédex #{range.min} - #{range.max} • {range.max - range.min + 1} Pokémon
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Cards */}
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="mb-8 text-center font-heading text-2xl font-semibold text-foreground md:text-3xl">
          Selecciona la Dificultad
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {difficulties.map((difficulty) => {
            const config = difficultyConfig[difficulty];
            const Icon = config.icon;

            return (
              <Link 
                key={difficulty} 
                href={`/play/${region}/${difficulty}`}
                data-testid={`link-difficulty-${difficulty}`}
              >
                <Card className="group relative min-h-[180px] cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover-elevate active-elevate-2 p-6">
                  {difficulty === 'expert' && (
                    <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/10" />
                  )}
                  
                  <div className="relative flex h-full flex-col">
                    <div className="mb-4 flex items-center justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ${config.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      {difficulty === 'expert' && (
                        <Badge variant={config.badgeVariant} className="bg-accent text-accent-foreground" data-testid={`badge-expert-${difficulty}`}>
                          Solo en General
                        </Badge>
                      )}
                    </div>

                    <h3 className="mb-2 font-heading text-2xl font-bold text-card-foreground">
                      {config.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground font-body">
                      {config.description}
                    </p>

                    <Button 
                      className="w-full"
                      data-testid={`button-start-${difficulty}`}
                    >
                      Comenzar
                      <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
