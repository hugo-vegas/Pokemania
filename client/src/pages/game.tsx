import { useState, useEffect, useRef } from "react";
import { Link, useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  type Region, 
  type Difficulty, 
  type QuestionResponse, 
  type AnswerResponse,
  difficultyDescriptions,
  difficultyPlaceholders,
  regionRanges
} from "@shared/schema";
import { 
  ArrowLeft, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  Flame,
  RotateCcw 
} from "lucide-react";

export default function Game() {
  const params = useParams<{ region: string; difficulty: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const hasRedirected = useRef(false);

  const region = params.region;
  const difficulty = params.difficulty;
  
  const isValidRegion = region && Object.keys(regionRanges).includes(region);
  const isValidDifficulty = difficulty && ['easy', 'medium', 'hard', 'expert'].includes(difficulty);
  const isValidExpert = difficulty !== 'expert' || region === 'General';

  useEffect(() => {
    if (hasRedirected.current) return;
    
    if (!isValidRegion || !isValidDifficulty) {
      hasRedirected.current = true;
      setLocation('/');
    } else if (!isValidExpert) {
      hasRedirected.current = true;
      setLocation(`/region/${region}`);
    }
  }, [isValidRegion, isValidDifficulty, isValidExpert, region, setLocation]);

  if (!isValidRegion || !isValidDifficulty || !isValidExpert) {
    return null;
  }
  
  const typedRegion = region as Region;
  const typedDifficulty = difficulty as Difficulty;

  const [answer, setAnswer] = useState("");
  const [expertAnswers, setExpertAnswers] = useState({ number: "", types: "", name: "" });
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastResult, setLastResult] = useState<AnswerResponse | null>(null);
  const [revealed, setRevealed] = useState(false);

  const { data: question, isLoading, refetch } = useQuery<QuestionResponse>({
    queryKey: ['/api/question', typedRegion, typedDifficulty],
    queryFn: async () => {
      const response = await apiRequest('POST', '/api/question', {
        region: typedRegion,
        difficulty: typedDifficulty,
      });
      return response.json();
    },
    enabled: true,
  });

  const answerMutation = useMutation({
    mutationFn: async (userAnswer: string) => {
      if (!question) throw new Error("No question loaded");
      const response = await apiRequest(
        'POST',
        '/api/answer',
        {
          pokemon_id: question.pokemon_id,
          answer: userAnswer,
          difficulty: typedDifficulty,
        }
      );
      return response.json();
    },
    onSuccess: (data) => {
      setLastResult(data);
      setShowFeedback(true);
      setRevealed(true);

      if (data.correct) {
        setScore(score + 1);
        setStreak(streak + 1);
        toast({
          title: "¡Correcto!",
          description: `¡Acertaste! Es ${data.pokemon.name}`,
        });
      } else {
        setStreak(0);
        toast({
          title: "Incorrecto",
          description: data.feedback,
          variant: "destructive",
        });
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let userAnswer = "";
    if (typedDifficulty === 'expert') {
      userAnswer = `${expertAnswers.number}, ${expertAnswers.types}, ${expertAnswers.name}`;
    } else {
      userAnswer = answer;
    }

    if (!userAnswer.trim()) {
      toast({
        title: "Error",
        description: "Por favor escribe tu respuesta",
        variant: "destructive",
      });
      return;
    }

    answerMutation.mutate(userAnswer);
  };

  const handleNext = () => {
    setAnswer("");
    setExpertAnswers({ number: "", types: "", name: "" });
    setShowFeedback(false);
    setLastResult(null);
    setRevealed(false);
    refetch();
  };

  const handleQuit = () => {
    const confirmQuit = window.confirm(
      `¿Seguro que quieres salir?\n\nPuntuación actual: ${score}\nRacha: ${streak}`
    );
    if (confirmQuit) {
      setLocation(`/region/${typedRegion}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={handleQuit} data-testid="button-quit">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-heading text-lg font-bold text-card-foreground md:text-xl">
                  {typedRegion}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {typedDifficulty === 'easy' && 'Fácil'}
                  {typedDifficulty === 'medium' && 'Media'}
                  {typedDifficulty === 'hard' && 'Difícil'}
                  {typedDifficulty === 'expert' && 'Experto'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                <span className="font-heading text-lg font-bold" data-testid="text-score">
                  {score}
                </span>
              </div>
              {streak > 0 && (
                <Badge variant="default" className="flex items-center gap-1 bg-primary" data-testid="badge-streak">
                  <Flame className="h-4 w-4" />
                  {streak}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="mx-auto max-w-2xl px-4 py-8 md:py-12">
        <Card className="overflow-hidden p-6 md:p-8">
          {/* Pokemon Image */}
          <div className="mb-8">
            {isLoading ? (
              <Skeleton className="mx-auto aspect-square w-full max-w-[400px] rounded-3xl" />
            ) : (
              <div className="mx-auto aspect-square w-full max-w-[400px] overflow-hidden rounded-3xl bg-muted p-8">
                <img
                  src={question?.image_url}
                  alt="Pokémon"
                  className={`h-full w-full object-contain transition-all duration-1000 ${
                    revealed ? 'brightness-100' : 'brightness-0'
                  }`}
                  data-testid="img-pokemon"
                />
              </div>
            )}
          </div>

          {/* Question & Input */}
          {!showFeedback ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center">
                <h2 className="mb-2 font-heading text-xl font-semibold text-foreground md:text-2xl">
                  {difficultyDescriptions[typedDifficulty]}
                </h2>
              </div>

              <div className="space-y-4">
                {typedDifficulty === 'expert' ? (
                  <>
                    <div>
                      <Label htmlFor="expert-number" className="font-body text-sm">
                        Número de Pokédex
                      </Label>
                      <Input
                        id="expert-number"
                        type="number"
                        value={expertAnswers.number}
                        onChange={(e) => setExpertAnswers({ ...expertAnswers, number: e.target.value })}
                        placeholder="Ej: 25"
                        className="mt-1 text-lg"
                        data-testid="input-expert-number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expert-types" className="font-body text-sm">
                        Tipo(s) - separa con comas
                      </Label>
                      <Input
                        id="expert-types"
                        value={expertAnswers.types}
                        onChange={(e) => setExpertAnswers({ ...expertAnswers, types: e.target.value })}
                        placeholder="Ej: Electric"
                        className="mt-1 text-lg"
                        data-testid="input-expert-types"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expert-name" className="font-body text-sm">
                        Nombre
                      </Label>
                      <Input
                        id="expert-name"
                        value={expertAnswers.name}
                        onChange={(e) => setExpertAnswers({ ...expertAnswers, name: e.target.value })}
                        placeholder="Ej: Pikachu"
                        className="mt-1 text-lg"
                        data-testid="input-expert-name"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <Input
                      type={typedDifficulty === 'hard' ? 'number' : 'text'}
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder={difficultyPlaceholders[typedDifficulty]}
                      className="w-full text-center text-lg md:text-xl"
                      autoFocus
                      data-testid={`input-${typedDifficulty}-answer`}
                    />
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full text-lg"
                disabled={answerMutation.isPending || isLoading}
                data-testid="button-submit"
              >
                {answerMutation.isPending ? "Verificando..." : "Enviar Respuesta"}
              </Button>
            </form>
          ) : (
            // Feedback Display
            <div className="space-y-6">
              <div className={`rounded-xl border-2 p-6 text-center ${
                lastResult?.correct 
                  ? 'border-green-500 bg-green-50 dark:bg-green-950/20' 
                  : 'border-red-500 bg-red-50 dark:bg-red-950/20'
              }`}>
                <div className="mb-3 flex justify-center">
                  {lastResult?.correct ? (
                    <CheckCircle2 className="h-16 w-16 text-green-600" data-testid="icon-correct" />
                  ) : (
                    <XCircle className="h-16 w-16 text-red-600" data-testid="icon-incorrect" />
                  )}
                </div>
                <h3 className="mb-2 font-heading text-2xl font-bold">
                  {lastResult?.correct ? '¡Correcto!' : 'Incorrecto'}
                </h3>
                <p className="text-sm text-muted-foreground" data-testid="text-feedback">
                  {lastResult?.feedback}
                </p>
              </div>

              {lastResult && (
                <div className="rounded-xl bg-muted p-6">
                  <h4 className="mb-4 text-center font-heading text-lg font-semibold">
                    Información del Pokémon
                  </h4>
                  <div className="space-y-2 text-center font-body">
                    <p data-testid="text-pokemon-name">
                      <strong>Nombre:</strong> {lastResult.pokemon.name}
                    </p>
                    <p data-testid="text-pokemon-number">
                      <strong>Número:</strong> #{lastResult.pokemon.number}
                    </p>
                    <p data-testid="text-pokemon-types">
                      <strong>Tipo(s):</strong> {lastResult.pokemon.types.join(', ')}
                    </p>
                  </div>
                </div>
              )}

              <Button 
                onClick={handleNext} 
                className="w-full text-lg"
                data-testid="button-next"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Siguiente Pokémon
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
