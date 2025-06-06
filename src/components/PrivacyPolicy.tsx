import React, { useEffect} from 'react';
import Head from 'next/head'
import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function PrivacyPolicy() {
  useEffect(() => {
      window.scrollTo(0, 0);
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6732428339083295" crossorigin="anonymous"></script>
    }, []);
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Head> 
              <title>Política de Privacidade - Vamo Sortear</title>
              <meta name="description" content="Explore nossa política de privacidade e como seus dados são utilizados por nós do VamoSortear.com.br" />
              <meta name="robots" content="index, follow" />
              <link rel="canonical" href="https://vamosortear.com.br/privacidade" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta name="keywords" content="sorteio, sorteios, vamo sortear, sorteio online, politica de privacidade, privacidade" />
        <meta name="author" content="Marcos & Matheus"></meta>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Política de Privacidade - Vamo Sortear",
            "description":
              "Explore nossa política de privacidade e como seus dados são utilizados por nós do VamoSortear.com.br",
            "url": "https://vamosortear.com.br/privacidade",
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
            "image": "https://vamosortear.com.br/assets/images/politica-privacidade.png",
            "mainEntity": {
              "@type": "WebPage",
              "name": "Política de Privacidade",
              "about": "Privacidade e proteção de dados no Vamo Sortear",
            },
            "potentialAction": [
              {
                "@type": "SearchAction",
                "target": "https://vamosortear.com.br/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            ],
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
            "name": "Política de Privacidade",
            "item": "https://vamosortear.com.br/privacidade",
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Política de Privacidade</h1>
        
        <div className="prose prose-blue max-w-none">
          <p>Última atualização: {new Date().toLocaleDateString()}</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">1. Informações que coletamos</h2>
          <p>Coletamos as seguintes informações pessoais:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Endereço de e-mail</li>
            <li>Histórico de sorteios realizados</li>
            <li>Informações de uso do site</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">2. Como usamos suas informações</h2>
          <p>Utilizamos suas informações para:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Fornecer e manter nossos serviços</li>
            <li>Melhorar a experiência do usuário</li>
            <li>Enviar comunicações importantes sobre o serviço</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">3. Proteção de dados</h2>
          <p>Implementamos medidas de segurança para proteger suas informações pessoais, incluindo:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Criptografia de dados</li>
            <li>Acesso restrito a informações pessoais</li>
            <li>Monitoramento regular de segurança</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">4. Seus direitos (LGPD)</h2>
          <p>De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir dados incompletos ou incorretos</li>
            <li>Solicitar a exclusão de seus dados</li>
            <li>Revogar o consentimento de uso dos dados</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-4">5. Contato</h2>
          <p>Para exercer seus direitos ou esclarecer dúvidas sobre nossa política de privacidade, entre em contato conosco.</p>
        </div>
      </div>
    </div>
  );
}