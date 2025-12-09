/**
 * Script de seed pour peupler la base de données Supabase
 * avec le contenu actuel du site
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '../src/lib/database.types';

const supabaseUrl = 'https://tfjhswxfjkdkigkdtmqj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmamhzd3hmamtka2lna2R0bXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMzg5MDksImV4cCI6MjA4MDgxNDkwOX0.5Gkv-YZ8cXuZXJG9FLeQd9ikTYmw_Q428lYleuyVSns';

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

async function seedDatabase() {
  console.log('🌱 Début du seed de la base de données...\n');

  try {
    // 1. Créer la page d'accueil
    console.log('📄 Création de la page d\'accueil...');
    const { data: homePage, error: pageError } = await supabase
      .from('pages')
      .upsert({
        slug: 'home',
        title: 'DevMaster - Automatisation IA pour votre Business',
        meta_description: 'Transformez votre business avec l\'IA. Automatisez vos processus, gagnez 20h par semaine et boostez votre productivité de 300%. Audit gratuit en 48h.',
        meta_keywords: ['automatisation IA', 'intelligence artificielle', 'n8n', 'workflow automation', 'chatbot IA', 'productivité', 'business automation'],
        og_title: 'DevMaster - Automatisation IA pour votre Business',
        og_description: 'Transformez votre business avec l\'IA. Automatisez vos processus, gagnez 20h par semaine et boostez votre productivité de 300%.',
        og_image: 'https://tfjhswxfjkdkigkdtmqj.supabase.co/storage/v1/object/public/images/og-image.jpg',
        twitter_card: 'summary_large_image',
        canonical_url: 'https://devmaster.ai',
        structured_data: {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'DevMaster',
          description: 'Automatisation IA pour transformer votre business',
          url: 'https://devmaster.ai',
          logo: 'https://devmaster.ai/Logo.png',
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Sales',
            availableLanguage: ['French']
          }
        },
        is_published: true,
      }, { onConflict: 'slug' })
      .select()
      .single();

    if (pageError) throw pageError;
    console.log('✅ Page créée avec succès\n');

    // 2. Créer les sections
    console.log('📝 Création des sections...');
    const sections = [
      {
        page_id: homePage.id,
        section_key: 'hero',
        section_title: 'Transformez votre business avec l\'IA',
        section_subtitle: 'Automatisation IA de nouvelle génération',
        content: {
          badge: 'Automatisation IA de nouvelle génération',
          title: 'Transformez votre business avec l\'IA',
          description: 'Vous n\'utilisez pas l\'Intelligence Artificielle ? Les process de votre entreprise sont certainement obsolètes.',
          cta_primary: 'Réserver mon audit gratuit',
          cta_secondary: 'Comment ça marche',
          logos: ['Google', 'Salesforce', 'HubSpot', 'Slack', 'Microsoft', 'Notion', 'Airtable', 'OpenAI']
        },
        display_order: 1,
        is_visible: true,
        seo_heading_tag: 'h1',
      },
      {
        page_id: homePage.id,
        section_key: 'benefits',
        section_title: 'Pourquoi DevMaster ?',
        section_subtitle: 'Des résultats concrets qui transforment votre façon de travailler',
        content: {
          items: [
            {
              icon: 'Trash2',
              title: 'Éliminez les tâches inutiles',
              description: 'Automatisez les processus à faible valeur ajoutée et concentrez vos équipes sur ce qui compte vraiment.'
            },
            {
              icon: 'Rocket',
              title: 'Prenez une longueur d\'avance',
              description: 'Anticipez la révolution IA et équipez-vous dès aujourd\'hui d\'automatisations qui feront la différence demain.'
            },
            {
              icon: 'TrendingUp',
              title: 'Boostez votre chiffre d\'affaires',
              description: 'Libérez vos talents des tâches répétitives : plus de temps pour créer de la valeur, moins de charges inutiles.'
            },
            {
              icon: 'Users',
              title: 'Valorisez vos collaborateurs',
              description: 'Offrez-leur un travail plus gratifiant : l\'IA gère la routine, ils se consacrent à leur vrai potentiel humain.'
            },
            {
              icon: 'Shield',
              title: 'Sécurité sans compromis',
              description: 'Vos données sont chiffrées, hébergées sur des serveurs sécurisés et jamais partagées. Chaque automatisation est conçue pour garantir confidentialité et conformité.'
            }
          ]
        },
        display_order: 2,
        is_visible: true,
        seo_heading_tag: 'h2',
      },
      {
        page_id: homePage.id,
        section_key: 'results',
        section_title: 'Des résultats mesurables',
        section_subtitle: 'Nos clients constatent un impact immédiat sur leur performance',
        content: {
          stats: [
            { value: 300, unit: '%', label: 'Augmentation de productivité' },
            { value: 20, unit: 'h', label: 'Économisées par semaine' },
            { value: 100, unit: '%', label: 'Satisfait ou remboursé' },
            { value: 48, unit: 'h', label: 'Pour votre Audit & Devis' }
          ]
        },
        display_order: 3,
        is_visible: true,
        seo_heading_tag: 'h2',
      }
    ];

    for (const section of sections) {
      const { error } = await supabase
        .from('sections')
        .upsert(section, { onConflict: 'page_id,section_key' });
      
      if (error) throw error;
      console.log(`✅ Section "${section.section_key}" créée`);
    }
    console.log('✅ Toutes les sections créées\n');

    // 3. Créer les témoignages
    console.log('💬 Création des témoignages...');
    const testimonials = [
      {
        name: 'Sophie Martin',
        role: 'Directrice Marketing',
        company: null,
        testimonial_text: 'Grâce à l\'automatisation de nos emails et du suivi des leads, nous avons multiplié par 3 notre taux de conversion tout en gagnant 15h par semaine.',
        rating: 5,
        display_order: 1,
        is_published: true,
      },
      {
        name: 'Thomas Dubois',
        role: 'Responsable Service Client',
        company: null,
        testimonial_text: 'Le chatbot IA a révolutionné notre service client. Disponible 24/7, il traite 80% des demandes automatiquement avec une satisfaction client qui n\'a jamais été aussi haute.',
        rating: 5,
        display_order: 2,
        is_published: true,
      },
      {
        name: 'Julie Rousseau',
        role: 'Chef de Projet Digital',
        company: null,
        testimonial_text: 'L\'intégration n8n de nos outils a transformé notre productivité. Plus de saisie manuelle, plus d\'erreurs. Tout est synchronisé en temps réel.',
        rating: 5,
        display_order: 3,
        is_published: true,
      },
      {
        name: 'Marc Lefebvre',
        role: 'CEO',
        company: null,
        testimonial_text: 'Les workflows d\'automatisation ont libéré mon équipe des tâches répétitives. Nous nous concentrons enfin sur la stratégie et la créativité.',
        rating: 5,
        display_order: 4,
        is_published: true,
      },
      {
        name: 'Léa Bernard',
        role: 'Directrice Commerciale',
        company: null,
        testimonial_text: 'L\'automatisation de notre CRM et des relances a transformé notre gestion commerciale. Zéro lead oublié, des suivis parfaitement orchestrés.',
        rating: 5,
        display_order: 5,
        is_published: true,
      },
      {
        name: 'Alexandre Petit',
        role: 'Directeur des Opérations',
        company: null,
        testimonial_text: 'Leur expertise en IA et automatisation est impressionnante. En 3 semaines, nos processus métier étaient totalement transformés avec un ROI immédiat.',
        rating: 5,
        display_order: 6,
        is_published: true,
      },
      {
        name: 'Claire Moreau',
        role: 'Responsable Growth',
        company: null,
        testimonial_text: 'Les agents IA personnalisés ont automatisé notre qualification de leads. Nous traitons 5 fois plus de prospects avec la même équipe.',
        rating: 5,
        display_order: 7,
        is_published: true,
      },
      {
        name: 'Pierre Durand',
        role: 'Directeur Technique',
        company: null,
        testimonial_text: 'L\'implémentation a été fluide et rapide. En quelques jours, nos équipes étaient autonomes sur les nouveaux workflows automatisés.',
        rating: 5,
        display_order: 8,
        is_published: true,
      },
      {
        name: 'Émilie Laurent',
        role: 'Responsable Marketing Digital',
        company: null,
        testimonial_text: 'L\'automatisation intelligente de nos campagnes email a boosté notre engagement de 250%. Les résultats parlent d\'eux-mêmes.',
        rating: 5,
        display_order: 9,
        is_published: true,
      },
    ];

    // Vérifier si des témoignages existent déjà
    const { data: existingTestimonials } = await supabase
      .from('testimonials')
      .select('id')
      .limit(1);

    if (!existingTestimonials || existingTestimonials.length === 0) {
      const { error: testimonialsError } = await supabase
        .from('testimonials')
        .insert(testimonials);

      if (testimonialsError) throw testimonialsError;
      console.log(`✅ ${testimonials.length} témoignages créés\n`);
    } else {
      console.log(`ℹ️  Témoignages déjà présents, skip\n`);
    }

    // 4. Créer les FAQs
    console.log('❓ Création des FAQs...');
    const faqs = [
      {
        question: 'Combien de temps avant de voir les premiers résultats ?',
        answer: 'Votre audit personnalisé est livré sous 48h. Les premières automatisations sont déployées immédiatement après validation du plan. Vous constatez un impact mesurable dès la première semaine avec un gain de temps de 20h minimum sur vos tâches répétitives.',
        category: 'general',
        display_order: 1,
        is_published: true,
      },
      {
        question: 'Quelles automatisations proposez-vous concrètement ?',
        answer: 'Nous automatisons vos emails et réponses clients, la génération et qualification de leads, vos chatbots de support 24/7, la synchronisation CRM, la publication sur réseaux sociaux, le traitement de documents et factures, vos reportings en temps réel, et même votre processus de recrutement. Toutes nos solutions s\'adaptent à vos outils actuels.',
        category: 'services',
        display_order: 2,
        is_published: true,
      },
      {
        question: 'Comment garantissez-vous la sécurité de nos données ?',
        answer: 'Nous utilisons uniquement des connexions OAuth sécurisées, sans jamais stocker vos mots de passe. Toutes les clés API sont chiffrées dans des coffres-forts certifiés. Vos données restent sur vos systèmes, nous n\'en conservons aucune copie. Conformité RGPD garantie.',
        category: 'security',
        display_order: 3,
        is_published: true,
      },
      {
        question: 'Travaillez-vous avec notre secteur d\'activité ?',
        answer: 'Nos solutions s\'adaptent à tous les secteurs : e-commerce, services B2B, agences marketing, SaaS, cabinets de conseil, industrie, santé, etc. Chaque automatisation est personnalisée selon votre métier et vos processus spécifiques. Nous analysons vos besoins uniques lors de l\'audit gratuit.',
        category: 'general',
        display_order: 4,
        is_published: true,
      },
      {
        question: 'Quel est votre modèle de tarification ?',
        answer: 'L\'audit de 48h est entièrement gratuit et sans engagement. Ensuite, nous proposons un forfait mensuel adapté à votre volume d\'automatisations, sans frais cachés. Vous pouvez annuler à tout moment. Garantie satisfait ou remboursé à 100% le premier mois.',
        category: 'pricing',
        display_order: 5,
        is_published: true,
      },
      {
        question: 'Quel support nous apportez-vous après la mise en place ?',
        answer: 'Support dédié en français par email, chat et visio. Temps de réponse garanti sous 4h en jours ouvrés. Formation complète de vos équipes incluse. Optimisation continue et ajustements réguliers pour faire évoluer vos automatisations avec votre croissance.',
        category: 'support',
        display_order: 6,
        is_published: true,
      },
      {
        question: 'Que se passe-t-il si nous souhaitons arrêter la collaboration ?',
        answer: 'Réversibilité totale garantie. Vous récupérez l\'intégralité de vos workflows, configurations, documentations et accès. Aucune période d\'engagement minimum. Vos automatisations continuent de fonctionner, vous gardez le contrôle absolu de votre infrastructure.',
        category: 'general',
        display_order: 7,
        is_published: true,
      },
      {
        question: 'Devez-vous accéder à nos systèmes internes ?',
        answer: 'Nous demandons uniquement les permissions minimales nécessaires via OAuth (comme Google ou Microsoft). Vous gardez le contrôle total et pouvez révoquer tous les accès instantanément depuis vos outils. Nous n\'installons aucun logiciel sur vos serveurs.',
        category: 'security',
        display_order: 8,
        is_published: true,
      },
    ];

    // Vérifier si des FAQs existent déjà
    const { data: existingFAQs } = await supabase
      .from('faqs')
      .select('id')
      .limit(1);

    if (!existingFAQs || existingFAQs.length === 0) {
      const { error: faqsError } = await supabase
        .from('faqs')
        .insert(faqs);

      if (faqsError) throw faqsError;
      console.log(`✅ ${faqs.length} FAQs créées\n`);
    } else {
      console.log(`ℹ️  FAQs déjà présentes, skip\n`);
    }

    // 5. Créer les items de navigation
    console.log('🧭 Création de la navigation...');
    const navItems = [
      { label: 'Bénéfices', target_section: 'benefits', display_order: 1, is_visible: true },
      { label: 'Solutions', target_section: 'solutions', display_order: 2, is_visible: true },
      { label: 'Résultats', target_section: 'results', display_order: 3, is_visible: true },
      { label: 'Process', target_section: 'process', display_order: 4, is_visible: true },
      { label: 'FAQ', target_section: 'faq', display_order: 5, is_visible: true },
    ];

    // Vérifier si des items de navigation existent déjà
    const { data: existingNav } = await supabase
      .from('navigation_items')
      .select('id')
      .limit(1);

    if (!existingNav || existingNav.length === 0) {
      const { error: navError } = await supabase
        .from('navigation_items')
        .insert(navItems);

      if (navError) throw navError;
      console.log(`✅ ${navItems.length} items de navigation créés\n`);
    } else {
      console.log(`ℹ️  Navigation déjà présente, skip\n`);
    }

    console.log('🎉 Seed terminé avec succès!\n');
    console.log('Votre base de données est maintenant peuplée avec tout le contenu du site.');
    console.log('Vous pouvez maintenant démarrer le serveur de développement avec: npm run dev');

  } catch (error) {
    console.error('❌ Erreur lors du seed:', error);
    process.exit(1);
  }
}

// Exécuter le seed
seedDatabase();
