import { useMemo } from "react";
import { useCurrentLocale, useLocale } from "@/contexts";
import { SEOHead } from "@/components/common";

const legalContent = {
  en: {
    backLink: "Back to home",
    pageTitle: "Legal Notice",
    sections: [
      {
        title: "Definitions",
        content: [
          { label: "Client:", text: "any professional or natural person capable within the meaning of Articles 1123 et seq. of the Civil Code, or legal entity, who visits the Site subject to these general conditions." },
          { label: "Services:", text: "https://devmaster.ai/ provides Clients with:" },
          { label: "Content:", text: "All elements constituting the information present on the Site, including text, images, and videos." },
          { label: "Client information:", text: 'Hereinafter referred to as "Information(s)", which corresponds to all personal data that may be held by https://devmaster.ai/ for the management of your account, customer relationship management, and for analysis and statistical purposes.' },
          { label: "User:", text: "Internet user connecting to and using the above-mentioned site." },
          { label: "Personal information:", text: '"Information that allows, in any form whatsoever, directly or indirectly, the identification of the natural persons to whom it applies" (Article 4 of Law No. 78-17 of January 6, 1978).' },
          { text: 'The terms "personal data", "data subject", "processor" and "sensitive data" have the meaning defined by the General Data Protection Regulation (GDPR: No. 2016-679).' },
        ],
      },
      {
        title: "1. Website presentation",
        content: [
          { text: "Pursuant to Article 6 of Law No. 2004-575 of June 21, 2004 on confidence in the digital economy, users of the website https://devmaster.ai/ are informed of the identity of the various parties involved in its creation and monitoring:" },
        ],
        details: [
          { label: "Owner", text: "EI Devmaster – 10 rue Voltaire 44000 Nantes" },
          { label: "Publication manager", text: "Marceau Wambergue – dvmstr.ai@gmail.com" },
          { text: "The publication manager is a natural person or a legal entity." },
          { label: "Webmaster", text: "Marceau Wambergue – dvmstr.ai@gmail.com" },
          { label: "Host", text: "Porkbun LLC – 21370 SW Langer Farms Parkway, Suite 142-429 97140 Sherwood 1 855-767-5286" },
          { label: "Data protection officer", text: "Marceau Wambergue – dvmstr.ai@gmail.com" },
        ],
        attribution: "These legal notices are based on the template provided by the free legal notice generator for websites.",
      },
      {
        title: "2. General conditions of use of the site and services offered",
        content: [
          { text: "The Site constitutes a work of the mind protected by the provisions of the Intellectual Property Code and applicable International Regulations. The Client may in no way reuse, transfer or exploit for their own account all or part of the elements or works of the Site." },
          { text: "The use of the site https://devmaster.ai/ implies full and complete acceptance of the general conditions of use described hereinafter. These conditions of use may be modified or supplemented at any time, users of the site https://devmaster.ai/ are therefore invited to consult them regularly." },
          { text: "This website is normally accessible at all times to users. An interruption for technical maintenance may however be decided by https://devmaster.ai/, which will then endeavour to communicate beforehand to users the dates and times of the intervention. The website https://devmaster.ai/ is regularly updated by https://devmaster.ai/ management. Similarly, the legal notices may be modified at any time: they are nevertheless binding on the user who is invited to refer to them as often as possible in order to take note of them." },
        ],
      },
      {
        title: "3. Description of services provided",
        content: [
          { text: "The website https://devmaster.ai/ aims to provide information concerning all the activities of the company. https://devmaster.ai/ strives to provide information on the site https://devmaster.ai/ that is as accurate as possible. However, it cannot be held responsible for omissions, inaccuracies and shortcomings in updating, whether by itself or by third-party partners who provide it with this information." },
          { text: "All information indicated on the site https://devmaster.ai/ is given for indicative purposes, and is subject to change. Furthermore, the information on the site https://devmaster.ai/ is not exhaustive. It is given subject to modifications having been made since it was put online." },
        ],
      },
      {
        title: "4. Contractual limitations on technical data",
        content: [
          { text: "The site uses JavaScript technology. The website cannot be held responsible for material damage related to the use of the site. In addition, the user of the site undertakes to access the site using recent equipment, free of viruses and with an up-to-date latest generation browser. The site https://devmaster.ai/ is hosted by a provider on the territory of the European Union in accordance with the provisions of the General Data Protection Regulation (GDPR: No. 2016-679)." },
          { text: "The objective is to provide a service that ensures the best accessibility rate. The host ensures the continuity of its service 24 hours a day, every day of the year. It nevertheless reserves the right to interrupt the hosting service for the shortest possible periods, in particular for maintenance purposes, to improve its infrastructure, or in the event of failure of its infrastructure, or if the Services generate traffic deemed abnormal." },
          { text: "https://devmaster.ai/ and the host cannot be held responsible in the event of malfunction of the Internet network, telephone lines or computer and telephone equipment linked in particular to network congestion preventing access to the server." },
        ],
      },
      {
        title: "5. Intellectual property and counterfeiting",
        content: [
          { text: "https://devmaster.ai/ owns the intellectual property rights and holds the rights of use on all elements accessible on the website, including texts, images, graphics, logos, videos, icons and sounds. Any reproduction, representation, modification, publication, adaptation of all or part of the elements of the site, whatever the means or process used, is prohibited, except with the prior written authorization of: https://devmaster.ai/." },
          { text: "Any unauthorized exploitation of the site or of any of the elements it contains will be considered as constituting counterfeiting and prosecuted in accordance with the provisions of Articles L.335-2 et seq. of the Intellectual Property Code." },
        ],
      },
      {
        title: "6. Limitations of liability",
        content: [
          { text: "https://devmaster.ai/ acts as publisher of the site. https://devmaster.ai/ is responsible for the quality and accuracy of the Content it publishes." },
          { text: "https://devmaster.ai/ cannot be held responsible for direct and indirect damage caused to the user's equipment when accessing the website https://devmaster.ai/, resulting either from the use of equipment that does not meet the specifications indicated in point 4, or from the appearance of a bug or incompatibility." },
          { text: "https://devmaster.ai/ cannot also be held responsible for indirect damages (such as, for example, loss of market or loss of opportunity) consecutive to the use of the site https://devmaster.ai/. Interactive spaces (possibility of asking questions in the contact space) are available to users. https://devmaster.ai/ reserves the right to delete, without prior notice, any content posted in this space that would contravene the legislation applicable in France, in particular the provisions relating to data protection." },
        ],
      },
      {
        title: "7. Personal data management",
        content: [
          { text: "The Client is informed of the regulations concerning marketing communication, the law of June 21, 2014 on confidence in the Digital Economy, the Data Protection Act of August 6, 2004, as well as the General Data Protection Regulation (GDPR: No. 2016-679)." },
        ],
        subsections: [
          {
            title: "7.1 Data collection responsibility",
            content: [
              { text: "For Personal Data collected as part of the creation of the User's personal account and navigation on the Site, the data controller is: Devmaster. https://devmaster.ai/ is represented by Marceau Wambergue, its legal representative." },
              { text: "As the data controller, https://devmaster.ai/ undertakes to respect the framework of the legal provisions in force. It is in particular the responsibility of the Client to establish the purposes of its data processing, to provide its prospects and customers, from the collection of their consent, with complete information on the processing of their personal data and to maintain a register of processing in accordance with reality." },
            ],
          },
        ],
      },
      {
        title: "10. Applicable law and jurisdiction",
        content: [
          { text: "Any dispute in connection with the use of the site https://devmaster.ai/ is subject to French law. Except in cases where the law does not allow it, exclusive jurisdiction is given to the competent courts of Nantes." },
        ],
      },
    ],
  },
  fr: {
    backLink: "Retour à l'accueil",
    pageTitle: "Mentions Légales",
    sections: [
      {
        title: "Définitions",
        content: [
          { label: "Client :", text: "tout professionnel ou personne physique capable au sens des articles 1123 et suivants du Code civil, ou personne morale, qui visite le Site objet des présentes conditions générales." },
          { label: "Prestations et Services :", text: "https://devmaster.ai/ met à disposition des Clients :" },
          { label: "Contenu :", text: "Ensemble des éléments constituants l'information présente sur le Site, notamment textes – images – vidéos." },
          { label: "Informations clients :", text: "Ci après dénommé « Information (s) » qui correspondent à l'ensemble des données personnelles susceptibles d'être détenues par https://devmaster.ai/ pour la gestion de votre compte, de la gestion de la relation client et à des fins d'analyses et de statistiques." },
          { label: "Utilisateur :", text: "Internaute se connectant, utilisant le site susnommé." },
          { label: "Informations personnelles :", text: "« Les informations qui permettent, sous quelque forme que ce soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978)." },
          { text: "Les termes « données à caractère personnel », « personne concernée », « sous traitant » et « données sensibles » ont le sens défini par le Règlement Général sur la Protection des Données (RGPD : n° 2016-679)" },
        ],
      },
      {
        title: "1. Présentation du site internet",
        content: [
          { text: "En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site internet https://devmaster.ai/ l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi:" },
        ],
        details: [
          { label: "Propriétaire", text: "EI Devmaster – 10 rue Voltaire 44000 Nantes" },
          { label: "Responsable publication", text: "Marceau Wambergue – dvmstr.ai@gmail.com" },
          { text: "Le responsable publication est une personne physique ou une personne morale." },
          { label: "Webmaster", text: "Marceau Wambergue – dvmstr.ai@gmail.com" },
          { label: "Hébergeur", text: "Porkbun LLC – 21370 SW Langer Farms Parkway, Suite 142-429 97140 Sherwood 1 855-767-5286" },
          { label: "Délégué à la protection des données", text: "Marceau Wambergue – dvmstr.ai@gmail.com" },
        ],
        attribution: "Les mentions légales sont issues du modèle proposé par le générateur gratuit de mentions légales pour un site internet.",
      },
      {
        title: "2. Conditions générales d'utilisation du site et des services proposés",
        content: [
          { text: "Le Site constitue une œuvre de l'esprit protégée par les dispositions du Code de la Propriété Intellectuelle et des Réglementations Internationales applicables. Le Client ne peut en aucune manière réutiliser, céder ou exploiter pour son propre compte tout ou partie des éléments ou travaux du Site." },
          { text: "L'utilisation du site https://devmaster.ai/ implique l'acceptation pleine et entière des conditions générales d'utilisation ci-après décrites. Ces conditions d'utilisation sont susceptibles d'être modifiées ou complétées à tout moment, les utilisateurs du site https://devmaster.ai/ sont donc invités à les consulter de manière régulière." },
          { text: "Ce site internet est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être toutefois décidée par https://devmaster.ai/, qui s'efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l'intervention. Le site web https://devmaster.ai/ est mis à jour régulièrement par https://devmaster.ai/ responsable. De la même façon, les mentions légales peuvent être modifiées à tout moment : elles s'imposent néanmoins à l'utilisateur qui est invité à s'y référer le plus souvent possible afin d'en prendre connaissance." },
        ],
      },
      {
        title: "3. Description des services fournis",
        content: [
          { text: "Le site internet https://devmaster.ai/ a pour objet de fournir une information concernant l'ensemble des activités de la société. https://devmaster.ai/ s'efforce de fournir sur le site https://devmaster.ai/ des informations aussi précises que possible. Toutefois, il ne pourra être tenu responsable des oublis, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations." },
          { text: "Toutes les informations indiquées sur le site https://devmaster.ai/ sont données à titre indicatif, et sont susceptibles d'évoluer. Par ailleurs, les renseignements figurant sur le site https://devmaster.ai/ ne sont pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne." },
        ],
      },
      {
        title: "4. Limitations contractuelles sur les données techniques",
        content: [
          { text: "Le site utilise la technologie JavaScript. Le site Internet ne pourra être tenu responsable de dommages matériels liés à l'utilisation du site. De plus, l'utilisateur du site s'engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis-à-jour. Le site https://devmaster.ai/ est hébergé chez un prestataire sur le territoire de l'Union Européenne conformément aux dispositions du Règlement Général sur la Protection des Données (RGPD : n° 2016-679)" },
          { text: "L'objectif est d'apporter une prestation qui assure le meilleur taux d'accessibilité. L'hébergeur assure la continuité de son service 24 Heures sur 24, tous les jours de l'année. Il se réserve néanmoins la possibilité d'interrompre le service d'hébergement pour les durées les plus courtes possibles notamment à des fins de maintenance, d'amélioration de ses infrastructures, de défaillance de ses infrastructures ou si les Prestations et Services génèrent un trafic réputé anormal." },
          { text: "https://devmaster.ai/ et l'hébergeur ne pourront être tenus responsables en cas de dysfonctionnement du réseau Internet, des lignes téléphoniques ou du matériel informatique et de téléphonie lié notamment à l'encombrement du réseau empêchant l'accès au serveur." },
        ],
      },
      {
        title: "5. Propriété intellectuelle et contrefaçons",
        content: [
          { text: "https://devmaster.ai/ est propriétaire des droits de propriété intellectuelle et détient les droits d'usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, icônes et sons. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de : https://devmaster.ai/." },
          { text: "Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle." },
        ],
      },
      {
        title: "6. Limitations de responsabilité",
        content: [
          { text: "https://devmaster.ai/ agit en tant qu'éditeur du site. https://devmaster.ai/ est responsable de la qualité et de la véracité du Contenu qu'il publie." },
          { text: "https://devmaster.ai/ ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur, lors de l'accès au site internet https://devmaster.ai/, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées au point 4, soit de l'apparition d'un bug ou d'une incompatibilité." },
          { text: "https://devmaster.ai/ ne pourra également être tenu responsable des dommages indirects (tels par exemple qu'une perte de marché ou perte d'une chance) consécutifs à l'utilisation du site https://devmaster.ai/. Des espaces interactifs (possibilité de poser des questions dans l'espace contact) sont à la disposition des utilisateurs. https://devmaster.ai/ se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à la protection des données." },
        ],
      },
      {
        title: "7. Gestion des données personnelles",
        content: [
          { text: "Le Client est informé des réglementations concernant la communication marketing, la loi du 21 Juin 2014 pour la confiance dans l'Economie Numérique, la Loi Informatique et Liberté du 06 Août 2004 ainsi que du Règlement Général sur la Protection des Données (RGPD : n° 2016-679)." },
        ],
        subsections: [
          {
            title: "7.1 Responsables de la collecte des données personnelles",
            content: [
              { text: "Pour les Données Personnelles collectées dans le cadre de la création du compte personnel de l'Utilisateur et de sa navigation sur le Site, le responsable du traitement des Données Personnelles est : Devmaster. https://devmaster.ai/ est représenté par Marceau Wambergue, son représentant légal." },
              { text: "En tant que responsable du traitement des données qu'il collecte, https://devmaster.ai/ s'engage à respecter le cadre des dispositions légales en vigueur. Il lui appartient notamment au Client d'établir les finalités de ses traitements de données, de fournir à ses prospects et clients, à partir de la collecte de leurs consentements, une information complète sur le traitement de leurs données personnelles et de maintenir un registre des traitements conforme à la réalité." },
            ],
          },
        ],
      },
      {
        title: "10. Droit applicable et attribution de juridiction",
        content: [
          { text: "Tout litige en relation avec l'utilisation du site https://devmaster.ai/ est soumis au droit français. En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de Nantes." },
        ],
      },
    ],
  },
  zh: {
    backLink: "返回首页",
    pageTitle: "法律声明",
    sections: [
      {
        title: "定义",
        content: [
          { label: "客户：", text: "根据《民法典》第1123条及后续条款，任何具有行为能力的专业人士或自然人，或访问本网站的法人实体。" },
          { label: "服务：", text: "https://devmaster.ai/ 向客户提供：" },
          { label: "内容：", text: "构成网站信息的所有元素，包括文本、图像和视频。" },
          { label: "客户信息：", text: '以下简称\u201C信息\u201D，指 https://devmaster.ai/ 为管理您的账户、客户关系管理以及分析和统计目的而可能持有的所有个人数据。' },
          { label: "用户：", text: "连接和使用上述网站的互联网用户。" },
          { label: "个人信息：", text: '\u201C以任何形式，直接或间接地识别其所适用的自然人的信息\u201D（1978年1月6日第78-17号法律第4条）。' },
          { text: '\u201C个人数据\u201D、\u201C数据主体\u201D、\u201C处理者\u201D和\u201C敏感数据\u201D等术语具有《通用数据保护条例》（GDPR：第2016-679号）所定义的含义。' },
        ],
      },
      {
        title: "1. 网站介绍",
        content: [
          { text: "根据2004年6月21日第2004-575号数字经济信心法第6条，特此告知 https://devmaster.ai/ 网站用户参与其创建和监督的各方身份：" },
        ],
        details: [
          { label: "所有者", text: "EI Devmaster – 10 rue Voltaire 44000 Nantes" },
          { label: "出版负责人", text: "Marceau Wambergue – dvmstr.ai@gmail.com" },
          { text: "出版负责人为自然人或法人实体。" },
          { label: "网站管理员", text: "Marceau Wambergue – dvmstr.ai@gmail.com" },
          { label: "托管商", text: "Porkbun LLC – 21370 SW Langer Farms Parkway, Suite 142-429 97140 Sherwood 1 855-767-5286" },
          { label: "数据保护官", text: "Marceau Wambergue – dvmstr.ai@gmail.com" },
        ],
        attribution: "本法律声明基于免费网站法律声明生成器提供的模板。",
      },
      {
        title: "2. 网站和服务的一般使用条件",
        content: [
          { text: "本网站构成受《知识产权法典》和适用国际法规保护的智力作品。客户不得以任何方式为自己的利益重新使用、转让或利用本网站的全部或部分元素或作品。" },
          { text: "使用 https://devmaster.ai/ 网站即表示完全接受下述一般使用条件。这些使用条件可能随时被修改或补充，因此 https://devmaster.ai/ 网站用户应定期查阅。" },
          { text: "本网站通常在任何时候都可供用户访问。但 https://devmaster.ai/ 可能会决定因技术维护而中断，届时将尽力提前通知用户干预的日期和时间。" },
        ],
      },
      {
        title: "3. 所提供服务的描述",
        content: [
          { text: "https://devmaster.ai/ 网站旨在提供有关公司所有活动的信息。https://devmaster.ai/ 努力在网站上提供尽可能准确的信息。但是，对于更新中的遗漏、不准确和缺陷，无论是由其自身还是由向其提供这些信息的第三方合作伙伴造成的，均不承担责任。" },
          { text: "https://devmaster.ai/ 网站上标明的所有信息均为指示性信息，可能会发生变化。此外，https://devmaster.ai/ 网站上的信息并非详尽无遗。" },
        ],
      },
      {
        title: "4. 技术数据的合同限制",
        content: [
          { text: "本网站使用JavaScript技术。本网站不对因使用网站而导致的物质损害承担责任。此外，网站用户承诺使用最新设备、无病毒且使用最新一代更新浏览器访问网站。网站 https://devmaster.ai/ 由欧盟境内的服务提供商托管，符合《通用数据保护条例》（GDPR：第2016-679号）的规定。" },
          { text: "目标是提供确保最佳可访问性率的服务。托管商确保其服务全年每天24小时连续运行。但保留在尽可能短的时间内中断托管服务的权利，特别是出于维护目的。" },
          { text: "https://devmaster.ai/ 和托管商在互联网网络、电话线路或计算机和电话设备出现故障的情况下不承担责任。" },
        ],
      },
      {
        title: "5. 知识产权和假冒",
        content: [
          { text: "https://devmaster.ai/ 拥有知识产权，并对网站上可访问的所有元素（包括文本、图像、图形、标志、视频、图标和声音）拥有使用权。未经 https://devmaster.ai/ 事先书面授权，禁止以任何方式或过程复制、展示、修改、出版、改编网站的全部或部分元素。" },
          { text: "任何未经授权的网站利用或其包含的任何元素将被视为构成假冒，并根据《知识产权法典》第L.335-2条及后续条款的规定予以追究。" },
        ],
      },
      {
        title: "6. 责任限制",
        content: [
          { text: "https://devmaster.ai/ 作为网站编辑。https://devmaster.ai/ 对其发布的内容的质量和准确性负责。" },
          { text: "https://devmaster.ai/ 不对在访问 https://devmaster.ai/ 网站时对用户设备造成的直接和间接损害承担责任。" },
          { text: "https://devmaster.ai/ 也不对因使用网站而产生的间接损害（例如市场损失或机会损失）承担责任。" },
        ],
      },
      {
        title: "7. 个人数据管理",
        content: [
          { text: "客户已了解有关营销传播的法规、2014年6月21日数字经济信心法、2004年8月6日数据保护法以及《通用数据保护条例》（GDPR：第2016-679号）。" },
        ],
        subsections: [
          {
            title: "7.1 个人数据收集责任",
            content: [
              { text: "对于在创建用户个人账户和在网站上浏览过程中收集的个人数据，数据控制者为：Devmaster。https://devmaster.ai/ 由其法定代表人 Marceau Wambergue 代表。" },
              { text: "作为其收集数据的控制者，https://devmaster.ai/ 承诺遵守现行法律规定的框架。" },
            ],
          },
        ],
      },
      {
        title: "10. 适用法律和管辖权",
        content: [
          { text: "与使用 https://devmaster.ai/ 网站有关的任何争议均受法国法律管辖。除法律不允许的情况外，专属管辖权归南特的管辖法院。" },
        ],
      },
    ],
  },
};

interface ContentItem {
  label?: string;
  text: string;
}

interface LegalSection {
  title: string;
  content: ContentItem[];
  details?: ContentItem[];
  attribution?: string;
  subsections?: { title: string; content: ContentItem[] }[];
}

export const LegalNotice = () => {
  const locale = useCurrentLocale();
  const { getLocalizedPath } = useLocale();

  const content = useMemo(() => {
    return legalContent[locale] || legalContent.en;
  }, [locale]);

  return (
    <div className="min-h-screen bg-black text-gray-300 py-24 px-4 sm:px-6">
      <SEOHead pageSlug="legal" locale={locale} noIndex={true} />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <a
            href={getLocalizedPath('/')}
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {content.backLink}
          </a>
        </div>
        <h1 className="text-4xl sm:text-5xl font-medium text-white mb-12 text-center">
          {content.pageTitle}
        </h1>

        <div className="space-y-8 text-sm leading-relaxed">
          {content.sections.map((section: LegalSection, sIndex: number) => (
            <section key={sIndex}>
              <h2 className="text-2xl font-medium text-white mb-4">{section.title}</h2>
              {section.content.map((item: ContentItem, cIndex: number) => (
                <p key={cIndex} className={cIndex > 0 ? 'mt-2' : ''}>
                  {item.label && <strong>{item.label} </strong>}
                  {item.text}
                </p>
              ))}
              {section.details && (
                <div className="mt-4 space-y-2">
                  {section.details.map((detail: ContentItem, dIndex: number) => (
                    <p key={dIndex}>
                      {detail.label && <strong>{detail.label}</strong>}
                      {detail.label ? ` : ${detail.text}` : detail.text}
                    </p>
                  ))}
                </div>
              )}
              {section.attribution && (
                <p className="mt-4 text-xs text-gray-400">
                  {section.attribution}
                </p>
              )}
              {section.subsections?.map((sub, subIndex: number) => (
                <div key={subIndex} className="mt-6">
                  <h3 className="text-xl font-medium text-white mb-3">{sub.title}</h3>
                  {sub.content.map((item: ContentItem, cIndex: number) => (
                    <p key={cIndex} className={cIndex > 0 ? 'mt-4' : ''}>
                      {item.text}
                    </p>
                  ))}
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
