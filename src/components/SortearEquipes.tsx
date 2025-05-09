import React, { useState, useEffect  } from 'react';
import { HomeIcon, Dice1Icon, TextIcon, ListIcon, GiftIcon, SparklesIcon, StarIcon, ShieldCheckIcon, ClockIcon, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generateRandomNumber } from '../lib/utils';
import { ShareButton } from './ShareButton';
import { AdSpace } from './AdSpace';
import { RaffleCard } from './RaffleCard';
import { Helmet } from 'react-helmet-async';
import Perguntas from './perguntas';

const raffleTypes = [
  {
        title: 'Sortear um número',
        description: 'Sorteie números aleatórios de forma rápida e confiável',
        icon: <Dice1Icon className="h-6 w-6 text-blue-600" />,
        path: '/Sortear-Numero',
        gradient: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Sortear Palavras',
    description: 'Sorteie palavras ou nomes de uma lista personalizada',
    icon: <TextIcon className="h-6 w-6 text-green-600" />,
    path: '/Sortear-Palavras',
    gradient: 'from-green-500 to-emerald-400',
  },
  {
    title: 'Sortear uma sequência',
    description: 'Gere sequências numéricas aleatórias para diversos fins',
    icon: <ListIcon className="h-6 w-6 text-purple-600" />,
    path: '/Sortear-Sequencia',
    gradient: 'from-purple-500 to-pink-400',
  },
  {
    title: 'Amigo Secreto',
    description: 'Organize seu amigo secreto com envio automático por email',
    icon: <GiftIcon className="h-6 w-6 text-red-600" />,
    path: '/Amigo-Secreto',
    gradient: 'from-red-500 to-orange-400',
  },
    {
    title: 'Roleta',
    description: 'Faça um sorteio utilizando uma roleta',
    icon: <LifeBuoy className="h-6 w-6 text-red-600" />,
    path: '/roleta',
    gradient: 'from-yellow-400 to-yellow-100',
  },
];

export function SortearEquipes() {
  useEffect(() => {
    window.scrollTo(0, 0);
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6732428339083295" crossorigin="anonymous"></script>
  }, []);

  const [Participantes, setParticipantes] = useState<string[]>([]);
  const [NewParticipantes, setNewParticipantes] = useState('');
  const [Resultado, setResultado] = useState<string | null>(null);
  const [Sorteando, setSorteando] = useState(false);
  const [sorteioTime, setsorteioTime] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-2xl">
      <Helmet> 
        <title>Sortear Equipes Online - Rápido e Fácil | Vamo Sortear</title>
        <meta name="description" content="Sortear equipes online de forma simples, rápida e personalizada. Organize seus sorteios com facilidade no Vamo Sortear. Experimente agora!" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://vamosortear.com.br/Sortear-Equipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta name="keywords" content="sortear equipes, sorteio online, sortear times, organizar equipes, sorteio personalizado, vamo sortear, sorteio rápido" />
        <meta name="author" content="Marcos & Matheus"></meta>
        <meta property="og:title" content="Sortear Equipes Online - Rápido e Fácil | Vamo Sortear" />
        <meta property="og:description" content="Sortear equipes online de forma simples, rápida e personalizada. Organize seus sorteios com facilidade no Vamo Sortear. Experimente agora!" />
        <meta property="og:url" content="https://vamosortear.com.br/Sortear-Equipes" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://vamosortear.com.br/assets/sortear-equipes-thumbnail.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sortear Equipes Online - Rápido e Fácil | Vamo Sortear" />
        <meta name="twitter:description" content="Sortear equipes online de forma simples, rápida e personalizada. Organize seus sorteios com facilidade no Vamo Sortear. Experimente agora!" />
        <meta name="twitter:image" content="https://vamosortear.com.br/assets/sortear-equipes-thumbnail.jpg" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Sortear Equipes Online - Rápido e Fácil | Vamo Sortear",
            "description": "Sortear equipes online de forma simples, rápida e personalizada. Organize seus sorteios com facilidade no Vamo Sortear. Experimente agora!",
            "url": "https://vamosortear.com.br/Sortear-Equipes",
            "publisher": {
              "@type": "Organization",
              "name": "VamoSortear",
              "logo": {
          "@type": "ImageObject",
          "url": "https://vamosortear.com.br/logo.png",
          "width": 1200,
          "height": 630
              }
            },
            "mainEntity": {
              "@type": "WebApplication",
              "name": "VamoSortear",
              "operatingSystem": ["Windows", "macOS", "Linux", "Android", "iOS"],
              "applicationCategory": "UtilityApplication",
              "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "BRL"
              }
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://vamosortear.com.br/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "isAccessibleForFree": true,
            "inLanguage": ["pt-BR", "en"]
          })}
        </script>
      </Helmet>

      

      <div className="mt-8 space-y-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Outros tipos de sorteios</h2>
        <p className="mb-6 text-gray-600">Explore outros tipos de sorteios disponíveis na nossa plataforma.</p>

        <div
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-2 ${
        raffleTypes.length % 2 !== 0 ? 'lg:grid-cols-2 lg:justify-items-center' : ''
          }`}
        >
          {raffleTypes.map((raffle, index) => (
        <Link
          key={index}
          to={raffle.path}
          className={`${
            raffleTypes.length % 2 !== 0 && index === raffleTypes.length - 1
          ? 'lg:col-span-2 lg:justify-self-center w-full'
          : ''
          }`}
        >
          <RaffleCard
            title={raffle.title}
            description={raffle.description}
            icon={raffle.icon}
            gradient={raffle.gradient}
            onClick={() => {}}
          />
        </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mt-4">
        <Perguntas />
      </div> 

    </div>
  );
}