export type Persona = "teacher" | "it-admin" | "school-director" | "student" | "parent"

export type QuestionCategory = "diagnostic" | "risk" | "decision" | "values"

export type RoadmapTag = "hardware" | "data" | "training" | "software"

export interface QuestionOption {
  id: string
  label: string
  score: number // higher = more Big Tech dependency
  roadmapTag: RoadmapTag
  explain: string // short feedback shown after selection
}

export interface Question {
  id: string
  personaTags: Persona[] // which personas see it, empty = all
  category: QuestionCategory
  text: string
  options: QuestionOption[]
}

export const questions: Question[] = [
  {
    id: "q1",
    personaTags: [],
    category: "diagnostic",
    text: "Quel système d'exploitation utilisent la plupart des ordinateurs de l'école ?",
    options: [
      {
        id: "q1-a1",
        label: "Windows (Microsoft)",
        score: 8,
        roadmapTag: "software",
        explain: "Windows crée un verrouillage fournisseur et des coûts de licence récurrents. Envisagez des distributions Linux comme Ubuntu ou Debian pour un usage éducatif."
      },
      {
        id: "q1-a2",
        label: "macOS (Apple)",
        score: 9,
        roadmapTag: "hardware",
        explain: "Le matériel Apple crée un fort verrouillage en raison des écosystèmes propriétaires. Cela limite la flexibilité et augmente les coûts au fil du temps."
      },
      {
        id: "q1-a3",
        label: "Mélange de Windows et macOS",
        score: 7,
        roadmapTag: "hardware",
        explain: "Les environnements mixtes augmentent la complexité et les coûts. Standardiser sur Linux peut réduire les deux tout en améliorant l'interopérabilité."
      },
      {
        id: "q1-a4",
        label: "Linux (Ubuntu, Debian, etc.)",
        score: 2,
        roadmapTag: "software",
        explain: "Excellent choix ! Linux offre la liberté, la sécurité et aucun frais de licence. Vous êtes déjà sur la voie du Libre."
      }
    ]
  },
  {
    id: "q2",
    personaTags: [],
    category: "diagnostic",
    text: "Où sont principalement stockées les données des élèves et du personnel ?",
    options: [
      {
        id: "q2-a1",
        label: "Google Workspace / Microsoft 365 cloud",
        score: 9,
        roadmapTag: "data",
        explain: "Les services cloud des GAFAM signifient que vos données sont stockées hors de votre contrôle, souvent dans des juridictions étrangères. Envisagez des alternatives auto-hébergées ou hébergées dans l'UE."
      },
      {
        id: "q2-a2",
        label: "Serveurs sur site de l'école",
        score: 3,
        roadmapTag: "data",
        explain: "Bien ! Le contrôle local signifie une meilleure confidentialité et souveraineté des données. Assurez-vous d'utiliser également des logiciels Libres sur ces serveurs."
      },
      {
        id: "q2-a3",
        label: "Mélange de cloud et sur site",
        score: 6,
        roadmapTag: "data",
        explain: "Les approches hybrides peuvent fonctionner, mais priorisez le déplacement des données sensibles vers des solutions Libres auto-hébergées ou hébergées dans l'UE."
      },
      {
        id: "q2-a4",
        label: "Solutions Libres hébergées dans l'UE (Nextcloud, etc.)",
        score: 1,
        roadmapTag: "data",
        explain: "Excellent ! Vous maintenez la souveraineté des données tout en utilisant des logiciels Libres. C'est l'approche idéale."
      }
    ]
  },
  {
    id: "q3",
    personaTags: ["teacher", "it-admin"],
    category: "risk",
    text: "Quelle suite bureautique les enseignants utilisent-ils principalement ?",
    options: [
      {
        id: "q3-a1",
        label: "Microsoft Office",
        score: 8,
        roadmapTag: "software",
        explain: "Microsoft Office crée un verrouillage fournisseur et des coûts récurrents. LibreOffice offre une compatibilité complète et est entièrement gratuit."
      },
      {
        id: "q3-a2",
        label: "Google Workspace",
        score: 9,
        roadmapTag: "data",
        explain: "Google Workspace signifie que vos documents vivent dans le cloud de Google, leur donnant accès à vos données. Envisagez Nextcloud ou OnlyOffice."
      },
      {
        id: "q3-a3",
        label: "LibreOffice ou OnlyOffice",
        score: 2,
        roadmapTag: "software",
        explain: "Parfait ! LibreOffice et OnlyOffice sont puissants, compatibles et respectent votre liberté. Aucun verrouillage fournisseur."
      },
      {
        id: "q3-a4",
        label: "Mélange de logiciels propriétaires et Libres",
        score: 5,
        roadmapTag: "software",
        explain: "La transition est bonne ! Concentrez-vous sur la formation du personnel pour adopter pleinement LibreOffice et compléter la migration."
      }
    ]
  },
  {
    id: "q4",
    personaTags: ["it-admin", "school-director"],
    category: "decision",
    text: "Comment gérez-vous l'email et la communication ?",
    options: [
      {
        id: "q4-a1",
        label: "Gmail / Email Google Workspace",
        score: 9,
        roadmapTag: "data",
        explain: "Gmail scanne les emails pour la publicité et la collecte de données. Envisagez un email auto-hébergé ou des fournisseurs hébergés dans l'UE utilisant des logiciels Libres."
      },
      {
        id: "q4-a2",
        label: "Microsoft Outlook / Exchange",
        score: 8,
        roadmapTag: "software",
        explain: "Les solutions Microsoft créent un verrouillage et des coûts récurrents. Les alternatives Libres comme Zimbra ou les solutions auto-hébergées offrent la liberté."
      },
      {
        id: "q4-a3",
        label: "Email auto-hébergé (Postfix, etc.)",
        score: 2,
        roadmapTag: "software",
        explain: "Excellent ! L'email auto-hébergé vous donne un contrôle total. Assurez-vous d'utiliser des logiciels Libres partout."
      },
      {
        id: "q4-a4",
        label: "Fournisseur d'email hébergé dans l'UE",
        score: 3,
        roadmapTag: "data",
        explain: "Bon choix pour la souveraineté des données. Vérifiez qu'ils utilisent des logiciels Libres et respectent les normes de confidentialité."
      }
    ]
  },
  {
    id: "q5",
    personaTags: [],
    category: "risk",
    text: "Quel navigateur web est standard sur les ordinateurs de l'école ?",
    options: [
      {
        id: "q5-a1",
        label: "Google Chrome",
        score: 8,
        roadmapTag: "software",
        explain: "Chrome envoie des données à Google et suit les utilisateurs. Firefox est un navigateur Libre qui respecte la vie privée et la liberté."
      },
      {
        id: "q5-a2",
        label: "Microsoft Edge",
        score: 7,
        roadmapTag: "software",
        explain: "Edge est propriétaire et lié à l'écosystème Microsoft. Firefox offre une meilleure confidentialité et est entièrement Libre."
      },
      {
        id: "q5-a3",
        label: "Firefox",
        score: 2,
        roadmapTag: "software",
        explain: "Firefox est un logiciel Libre qui respecte la vie privée des utilisateurs. Excellent choix pour les environnements éducatifs !"
      },
      {
        id: "q5-a4",
        label: "Mélange de navigateurs",
        score: 5,
        roadmapTag: "software",
        explain: "Standardiser sur Firefox peut améliorer la confidentialité et réduire la dépendance aux navigateurs des GAFAM."
      }
    ]
  },
  {
    id: "q6",
    personaTags: ["teacher", "student"],
    category: "values",
    text: "Comment les élèves accèdent-ils aux matériels pédagogiques et aux devoirs ?",
    options: [
      {
        id: "q6-a1",
        label: "Google Classroom",
        score: 9,
        roadmapTag: "data",
        explain: "Google Classroom signifie que les données des élèves vont à Google. Envisagez Moodle, une plateforme d'apprentissage Libre que vous pouvez auto-héberger."
      },
      {
        id: "q6-a2",
        label: "Microsoft Teams pour l'éducation",
        score: 8,
        roadmapTag: "software",
        explain: "Teams crée une dépendance à Microsoft. Moodle ou d'autres plateformes LMS Libres offrent un contrôle total et aucun verrouillage fournisseur."
      },
      {
        id: "q6-a3",
        label: "Moodle ou autre LMS Libre",
        score: 2,
        roadmapTag: "software",
        explain: "Moodle est un excellent logiciel Libre pour l'éducation. Vous maintenez le contrôle et les élèves apprennent la liberté numérique."
      },
      {
        id: "q6-a4",
        label: "Mélange de plateformes",
        score: 6,
        roadmapTag: "software",
        explain: "Consolider sur un LMS Libre comme Moodle peut simplifier la gestion et améliorer la souveraineté des données."
      }
    ]
  },
  {
    id: "q7",
    personaTags: ["it-admin", "school-director"],
    category: "diagnostic",
    text: "Quelle est votre approche de l'approvisionnement en matériel ?",
    options: [
      {
        id: "q7-a1",
        label: "Acheter du neuf auprès de grands fournisseurs (Dell, HP, Apple)",
        score: 7,
        roadmapTag: "hardware",
        explain: "Le nouveau matériel arrive souvent avec des logiciels propriétaires préinstallés. Envisagez de réhabiliter d'anciennes machines avec Linux."
      },
      {
        id: "q7-a2",
        label: "Réhabiliter et réparer le matériel existant",
        score: 3,
        roadmapTag: "hardware",
        explain: "La réhabilitation prolonge la durée de vie du matériel et réduit les déchets. Associez avec Linux pour une approche durable et Libre."
      },
      {
        id: "q7-a3",
        label: "Location auprès de fournisseurs",
        score: 8,
        roadmapTag: "hardware",
        explain: "La location crée une dépendance continue et vous enferme souvent dans des logiciels propriétaires. La propriété avec des logiciels Libres est plus durable."
      },
      {
        id: "q7-a4",
        label: "Mélange de neuf et réhabilité",
        score: 5,
        roadmapTag: "hardware",
        explain: "Bon équilibre ! Priorisez la réhabilitation et assurez-vous que tout le matériel exécute des systèmes d'exploitation Libres."
      }
    ]
  },
  {
    id: "q8",
    personaTags: ["teacher", "it-admin"],
    category: "risk",
    text: "Comment la formation du personnel aux outils numériques est-elle gérée ?",
    options: [
      {
        id: "q8-a1",
        label: "Formation fournie par les vendeurs (Microsoft, Google)",
        score: 8,
        roadmapTag: "training",
        explain: "La formation des vendeurs renforce le verrouillage. Les communautés de logiciels Libres offrent d'excellentes ressources de formation gratuites."
      },
      {
        id: "q8-a2",
        label: "Formation interne entre pairs",
        score: 4,
        roadmapTag: "training",
        explain: "La formation entre pairs est précieuse ! Assurez-vous qu'elle couvre les alternatives Libres pour réduire la dépendance aux outils propriétaires."
      },
      {
        id: "q8-a3",
        label: "Ateliers de la communauté des logiciels Libres",
        score: 2,
        roadmapTag: "training",
        explain: "Excellent ! La formation communautaire développe les compétences tout en soutenant l'écosystème Libre. Cela responsabilise votre personnel."
      },
      {
        id: "q8-a4",
        label: "Aucun programme de formation formel",
        score: 6,
        roadmapTag: "training",
        explain: "La formation est cruciale pour une migration réussie. Commencez par les bases des logiciels Libres et construisez à partir de là."
      }
    ]
  },
  {
    id: "q9",
    personaTags: ["school-director", "it-admin"],
    category: "decision",
    text: "Quelle est votre politique en matière de licences logicielles ?",
    options: [
      {
        id: "q9-a1",
        label: "Accords de licence annuels avec les grands fournisseurs",
        score: 9,
        roadmapTag: "software",
        explain: "Les licences créent des coûts récurrents et une dépendance. Les logiciels Libres éliminent complètement les frais de licence."
      },
      {
        id: "q9-a2",
        label: "Mélange de logiciels sous licence et Libres",
        score: 5,
        roadmapTag: "software",
        explain: "Bon progrès ! Créez un plan de migration pour remplacer les logiciels sous licence restants par des alternatives Libres."
      },
      {
        id: "q9-a3",
        label: "Prioriser les logiciels Libres lorsque possible",
        score: 3,
        roadmapTag: "software",
        explain: "Excellente politique ! Continuez à étendre l'adoption des logiciels Libres pour réduire les coûts et augmenter l'indépendance."
      },
      {
        id: "q9-a4",
        label: "Politique d'approvisionnement Libre en premier",
        score: 1,
        roadmapTag: "software",
        explain: "Parfait ! Une politique Libre en premier assure la liberté, réduit les coûts et construit l'indépendance numérique."
      }
    ]
  },
  {
    id: "q10",
    personaTags: [],
    category: "values",
    text: "Comment gérez-vous la confidentialité et la protection des données des élèves ?",
    options: [
      {
        id: "q10-a1",
        label: "Se conformer aux politiques de confidentialité des vendeurs",
        score: 8,
        roadmapTag: "data",
        explain: "Les politiques des vendeurs favorisent souvent le vendeur. Les solutions Libres auto-hébergées vous donnent un contrôle direct sur les données des élèves."
      },
      {
        id: "q10-a2",
        label: "Utiliser des services cloud conformes au RGPD",
        score: 5,
        roadmapTag: "data",
        explain: "La conformité RGPD est importante, mais les solutions Libres auto-hébergées offrent un contrôle et une souveraineté encore meilleurs."
      },
      {
        id: "q10-a3",
        label: "Auto-hébergé avec contrôles d'accès stricts",
        score: 2,
        roadmapTag: "data",
        explain: "Excellent ! L'auto-hébergement avec des logiciels Libres vous donne un contrôle maximum et protège la vie privée des élèves."
      },
      {
        id: "q10-a4",
        label: "Approche de collecte de données minimale",
        score: 3,
        roadmapTag: "data",
        explain: "Bon principe ! Combinez la collecte minimale avec l'hébergement de logiciels Libres pour la meilleure protection de la vie privée."
      }
    ]
  },
  {
    id: "q11",
    personaTags: ["it-admin"],
    category: "diagnostic",
    text: "Quelle infrastructure fait fonctionner les serveurs de votre école ?",
    options: [
      {
        id: "q11-a1",
        label: "Microsoft Windows Server",
        score: 8,
        roadmapTag: "software",
        explain: "Windows Server crée des coûts de licence et un verrouillage. Les serveurs Linux sont plus sécurisés, flexibles et rentables."
      },
      {
        id: "q11-a2",
        label: "Services cloud (AWS, Azure, GCP)",
        score: 7,
        roadmapTag: "data",
        explain: "Les services cloud des GAFAM signifient que votre infrastructure est hors de votre contrôle. Envisagez l'auto-hébergement ou des alternatives basées dans l'UE."
      },
      {
        id: "q11-a3",
        label: "Serveurs basés sur Linux",
        score: 2,
        roadmapTag: "software",
        explain: "Parfait ! Les serveurs Linux offrent la liberté, la sécurité et aucun frais de licence. Vous êtes sur la bonne voie."
      },
      {
        id: "q11-a4",
        label: "Mélange de cloud et sur site",
        score: 5,
        roadmapTag: "data",
        explain: "Bon équilibre ! Priorisez le déplacement des services critiques vers une infrastructure Linux auto-hébergée."
      }
    ]
  },
  {
    id: "q12",
    personaTags: ["teacher", "student"],
    category: "values",
    text: "Quels outils les élèves utilisent-ils pour le travail collaboratif ?",
    options: [
      {
        id: "q12-a1",
        label: "Google Docs / Sheets",
        score: 9,
        roadmapTag: "data",
        explain: "Les outils collaboratifs de Google signifient que le travail des élèves est stocké chez Google. Nextcloud ou OnlyOffice offrent des alternatives Libres."
      },
      {
        id: "q12-a2",
        label: "Microsoft Office Online",
        score: 8,
        roadmapTag: "software",
        explain: "Les outils en ligne de Microsoft créent une dépendance. LibreOffice Online ou Nextcloud offrent la collaboration sans verrouillage."
      },
      {
        id: "q12-a3",
        label: "Nextcloud ou LibreOffice Online",
        score: 2,
        roadmapTag: "software",
        explain: "Excellent ! Ces outils Libres offrent la collaboration tout en maintenant la souveraineté des données et la liberté."
      },
      {
        id: "q12-a4",
        label: "Mélange d'outils",
        score: 6,
        roadmapTag: "software",
        explain: "Standardiser sur des outils collaboratifs Libres peut simplifier les flux de travail et améliorer le contrôle des données."
      }
    ]
  }
]
