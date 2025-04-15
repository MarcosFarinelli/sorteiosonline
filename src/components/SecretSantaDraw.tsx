import React, { useState, useEffect } from 'react';
import { GiftIcon, HomeIcon, PlusIcon, XIcon, SparklesIcon, HeartIcon, UsersIcon, CalendarIcon, TrophyIcon, StarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { shuffleArray } from '../lib/utils';
import { useRaffleStore } from '../store/useRaffleStore';
import { AdSpace } from './AdSpace';
import { sendEmail } from '../lib/email';

interface Participant {
  name: string;
  email: string;
}

// Schema markup for rich snippets
const secretSantaSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Sorteio de Amigo Secreto Online Grátis",
  "description": "Organize seu amigo secreto online de forma fácil e gratuita. Sorteio automático com envio de emails personalizados para cada participante.",
  "applicationCategory": "UtilityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "BRL"
  }
};

export function SecretSantaDraw() {
  window.scrollTo(0, 0);
  
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newParticipant, setNewParticipant] = useState({ name: '', email: '' });
  const [giftSuggestion, setGiftSuggestion] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [emailProgress, setEmailProgress] = useState<number>(0);
  const addToHistory = useRaffleStore((state) => state.addToHistory);

  // Add schema markup to the page
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(secretSantaSchema);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleAddParticipant = () => {
    if (newParticipant.name.trim() && newParticipant.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newParticipant.email.trim())) {
        setError('Por favor, insira um email válido');
        return;
      }

      if (participants.some(p => p.email.toLowerCase() === newParticipant.email.trim().toLowerCase())) {
        setError('Este email já foi adicionado');
        return;
      }

      setParticipants([...participants, {
        name: newParticipant.name.trim(),
        email: newParticipant.email.trim().toLowerCase()
      }]);
      setNewParticipant({ name: '', email: '' });
      setError(null);
      setSuccess(null);
    }
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
    setError(null);
    setSuccess(null);
  };

  const handleDraw = async () => {
    if (participants.length < 2) {
      setError('É necessário pelo menos 2 participantes para realizar o sorteio');
      return;
    }

    setIsDrawing(true);
    setError(null);
    setSuccess(null);
    setEmailProgress(0);
    
    try {
      let validDraw = false;
      let pairs: [Participant, Participant][] = [];
      let attempts = 0;
      const maxAttempts = 100;

      while (!validDraw && attempts < maxAttempts) {
        attempts++;
        const shuffled = shuffleArray([...participants]);
        validDraw = true;
        pairs = [];

        for (let i = 0; i < participants.length; i++) {
          const giver = participants[i];
          const receiver = shuffled[i];

          if (giver.email === receiver.email) {
            validDraw = false;
            break;
          }

          pairs.push([giver, receiver]);
        }
      }

      if (!validDraw) {
        throw new Error('Não foi possível gerar um sorteio válido. Por favor, tente novamente.');
      }

      let successCount = 0;
      const failedEmails: string[] = [];

      for (const [giver, receiver] of pairs) {
        try {
          await sendEmail({
            to: giver.email,
            subject: '🎄 Seu Amigo Secreto foi Sorteado! 🎁',
            templateParams: {
              to_email: giver.email,
              to_name: giver.name,
              subject: '🎄 Seu Amigo Secreto foi Sorteado! 🎁',
              drawn_person: receiver.name,
              gift_suggestion: giftSuggestion || ''
            }
          });
          successCount++;
        } catch (err) {
          console.error(`Failed to send email to ${giver.email}:`, err);
          failedEmails.push(giver.email);
        }
        setEmailProgress(Math.round(((successCount + failedEmails.length) / pairs.length) * 100));
      }

      addToHistory({
        type: 'secret-santa',
        result: `Sorteio realizado com ${participants.length} participantes`,
      });

      if (failedEmails.length > 0) {
        if (failedEmails.length === pairs.length) {
          throw new Error('Não foi possível enviar nenhum email. Por favor, tente novamente mais tarde.');
        }
        setError(`Alguns emails não puderam ser enviados: ${failedEmails.join(', ')}`);
      } else {
        setSuccess(`Sorteio realizado com sucesso! Todos os ${successCount} emails foram enviados.`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao realizar o sorteio. Por favor, tente novamente.');
      console.error('Error in draw process:', err);
    } finally {
      setIsDrawing(false);
      setEmailProgress(0);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          <HomeIcon className="h-4 w-4" />
          Voltar para Início
        </Link>
      </div>

      {/* Hero Section with SEO-optimized heading */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Amigo Secreto Online Grátis 🎁
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Organize seu amigo secreto de forma fácil, rápida e segura. Sorteio automático com envio de emails personalizados para cada participante.
        </p>
      </div>

      <AdSpace />

      <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 p-8 shadow-lg mb-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-br from-red-600 to-pink-600 p-3 shadow-md">
            <GiftIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Organize Seu Amigo Secreto
            </h2>
            <p className="text-gray-600 mt-1">
              Faça o sorteio online e receba o resultado por email
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sugestão de Presente (opcional)
            </label>
            <input
              type="text"
              value={giftSuggestion}
              onChange={(e) => setGiftSuggestion(e.target.value)}
              placeholder="Ex: Valor máximo R$ 50,00 | Tema: Livros"
              className="block w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Adicionar Participantes
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newParticipant.name}
                  onChange={(e) => setNewParticipant({ ...newParticipant, name: e.target.value })}
                  placeholder="Nome do participante"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                />
                <input
                  type="email"
                  value={newParticipant.email}
                  onChange={(e) => setNewParticipant({ ...newParticipant, email: e.target.value })}
                  placeholder="Email do participante"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                />
                <button
                  onClick={handleAddParticipant}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 px-6 py-3 font-semibold text-white shadow-md hover:from-red-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <PlusIcon className="h-5 w-5" />
                  Adicionar
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  ⚠️ {error}
                </p>
              )}
              {success && (
                <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                  ✅ {success}
                </p>
              )}
            </div>
          </div>

          {participants.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Participantes ({participants.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {participants.map((participant, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-gray-100"
                  >
                    <span className="text-sm text-gray-700">
                      {participant.name}
                    </span>
                    <button
                      onClick={() => handleRemoveParticipant(index)}
                      className="rounded-full p-1 hover:bg-red-50"
                    >
                      <XIcon className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleDraw}
            disabled={participants.length < 2 || isDrawing}
            className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-pink-600 px-6 py-4 text-center text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isDrawing ? (
              <>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
                </div>
                <span className="opacity-0">Sorteando...</span>
              </>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <GiftIcon className="h-6 w-6" />
                Realizar Sorteio
              </span>
            )}
          </button>

          {isDrawing && emailProgress > 0 && (
            <div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-red-600 transition-all duration-300"
                  style={{ width: `${emailProgress}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Enviando emails... {emailProgress}%
              </p>
            </div>
          )}
        </div>
      </div>

      <AdSpace />

      {/* Rich content section for SEO */}
      <div className="space-y-8">
        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Como Funciona o Amigo Secreto Online?
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-red-100 p-2">
                  <UsersIcon className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">1. Adicione os Participantes</h3>
                  <p className="text-gray-600">
                    Insira o nome e email de cada participante do seu amigo secreto.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-red-100 p-2">
                  <GiftIcon className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">2. Defina as Regras</h3>
                  <p className="text-gray-600">
                    Estabeleça valor máximo, tema dos presentes ou outras sugestões.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-red-100 p-2">
                  <SparklesIcon className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">3. Realize o Sorteio</h3>
                  <p className="text-gray-600">
                    Nosso sistema faz o sorteio automático e aleatório dos pares.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-red-100 p-2">
                  <HeartIcon className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">4. Receba por Email</h3>
                  <p className="text-gray-600">
                    Cada participante recebe seu amigo secreto diretamente no email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Vantagens do Nosso Amigo Secreto Online
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-gradient-to-br from-red-50 to-pink-50 p-6">
              <div className="mb-4 rounded-full bg-red-100 p-3 w-fit">
                <StarIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Gratuito</h3>
              <p className="text-gray-600">
                Organize quantos amigos secretos quiser, sem nenhum custo.
              </p>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-red-50 to-pink-50 p-6">
              <div className="mb-4 rounded-full bg-red-100 p-3 w-fit">
                <TrophyIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fácil e Rápido</h3>
              <p className="text-gray-600">
                Interface intuitiva e sorteio instantâneo com poucos cliques.
              </p>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-red-50 to-pink-50 p-6">
              <div className="mb-4 rounded-full bg-red-100 p-3 w-fit">
                <CalendarIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sempre Disponível</h3>
              <p className="text-gray-600">
                Acesse 24h por dia, organize seu amigo secreto quando quiser.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Dicas para um Amigo Secreto Divertido
          </h2>

          <div className="space-y-4">
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                🎯 Defina um Tema
              </h3>
              <p className="text-gray-600">
                Escolha um tema específico para os presentes, como "Algo Feito à Mão", "Livros", "Produtos Locais" etc.
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                💝 Personalize a Experiência
              </h3>
              <p className="text-gray-600">
                Peça para cada participante incluir uma carta ou mensagem especial junto com o presente.
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                🎮 Adicione Dinâmicas
              </h3>
              <p className="text-gray-600">
                Crie brincadeiras para o momento da revelação, como "20 perguntas" ou "Mímica".
              </p>
            </div>
          </div>
        </section>
      </div>

      <AdSpace />
    </div>
  );
}