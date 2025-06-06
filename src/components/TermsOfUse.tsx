import React from 'react';
import Head from 'next/head'
import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';


export function TermsOfUse() {
  window.scrollTo(0, 0);
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6732428339083295" crossorigin="anonymous"></script>
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
            <Head>
              <title>Termo de Uso - Vamo Sortear</title>
              <meta
                name="description"
                content="Descubra quais são nossos termos de uso para realizar seus sorteios online sabendo tudo!!!"
              />
              <meta name="robots" content="index, follow" />
              <link rel="canonical" href="https://vamosortear.com.br/termos" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta
                name="keywords"
                content="sorteio, sorteios, vamo sortear, sorteio online, termos, termos de uso"
              />
              <meta name="author" content="Marcos & Matheus" />
              <script type="application/ld+json">
                {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Termos de Uso - Vamo Sortear",
              "description":
                "Confira os Termos de Uso do Vamo Sortear e saiba como utilizar nossa plataforma de sorteios online de forma segura e responsável.",
              "url": "https://vamosortear.com.br/termos",
              "publisher": {
                "@type": "Organization",
                "name": "Vamo Sortear",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://vamosortear.com.br/logo.png",
                  "width": 1200,
                  "height": 630,
                },
              },
              "image": "https://vamosortear.com.br/assets/images/termos-de-uso.png",
              "mainEntity": {
                "@type": "WebPage",
                "name": "Termos de Uso",
                "about": "Termos e condições de uso do Vamo Sortear",
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                "@type": "ListItem",
                "position": 1,
                "name": "Início",
                "item": "https://vamosortear.com.br/",
                  },
                  {
                "@type": "ListItem",
                "position": 2,
                "name": "Termos de Uso",
                "item": "https://vamosortear.com.br/termos",
                  },
                ],
              },
                })}
              </script>
            </Head>
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
        >
          <HomeIcon className="h-4 w-4" />
          Voltar para Início
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Termos de Uso</h1>
        
        <div className="prose prose-blue max-w-none">
          <p>Última atualização: {new Date().toLocaleDateString()}</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">1. Aceitação dos Termos</h2>
          <p>Ao acessar e usar este site, você aceita e concorda em cumprir estes termos e condições de uso.</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">2. Uso do Serviço</h2>
          <p>Nosso serviço de Vamo Sortear deve ser usado apenas para fins legais e de acordo com estes termos.</p>
          <p>Você concorda em não:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Usar o serviço para fins ilegais</li>
            <li>Tentar acessar áreas restritas do site</li>
            <li>Interferir no funcionamento do serviço</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">3. Conta de Usuário</h2>
          <p>Para algumas funcionalidades, é necessário criar uma conta. Você é responsável por:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Manter a confidencialidade de sua senha</li>
            <li>Todas as atividades realizadas em sua conta</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">4. Limitação de Responsabilidade</h2>
          <p>Não nos responsabilizamos por:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Uso indevido do serviço</li>
            <li>Problemas técnicos temporários</li>
            <li>Decisões tomadas com base nos resultados dos sorteios</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">5. Modificações dos Termos</h2>
          <p>Reservamos o direito de modificar estes termos a qualquer momento. Alterações significativas serão notificadas aos usuários.</p>
        </div>
      </div>
    </div>
  );
}