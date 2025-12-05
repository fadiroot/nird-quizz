import type { RoadmapTag } from "./questions"
import type { Answer } from "./storage"

export type EffortLevel = "low" | "med" | "high"

export interface RoadmapAction {
  id: string
  title: string
  effort: EffortLevel
  description?: string
}

export interface RoadmapStage {
  id: number
  title: string
  why: string
  actions: RoadmapAction[]
}

const allStages: RoadmapStage[] = [
  {
    id: 0,
    title: "Sensibilisation et inventaire",
    why: "Comprendre votre dépendance numérique actuelle et identifier les zones de verrouillage avant d'apporter des changements.",
    actions: [
      {
        id: "audit-hardware",
        title: "Effectuer un audit du matériel",
        effort: "low",
        description: "Lister tous les appareils, leurs systèmes d'exploitation et leur âge. Identifier les candidats pour la migration Linux."
      },
      {
        id: "audit-software",
        title: "Cartographier l'inventaire des logiciels",
        effort: "low",
        description: "Documenter tous les logiciels utilisés, les coûts de licence et les alternatives Libres disponibles."
      },
      {
        id: "data-location",
        title: "Cartographier les emplacements des données",
        effort: "med",
        description: "Identifier où sont stockées les données des élèves et du personnel (fournisseurs cloud, juridictions, contrôles d'accès)."
      },
      {
        id: "identify-lockins",
        title: "Identifier les verrouillages fournisseurs",
        effort: "med",
        description: "Lister les dépendances vis-à-vis de fournisseurs spécifiques (Google, Microsoft, Apple) et leur impact."
      },
      {
        id: "staff-survey",
        title: "Sonder les besoins du personnel",
        effort: "low",
        description: "Comprendre quels outils le personnel utilise le plus et où ils seraient ouverts aux alternatives Libres."
      }
    ]
  },
  {
    id: 1,
    title: "Réduction rapide des risques",
    why: "Aborder les préoccupations immédiates de confidentialité et de coût avec des gains à faible effort qui créent de l'élan.",
    actions: [
      {
        id: "firefox-adoption",
        title: "Passer au navigateur Firefox par défaut",
        effort: "low",
        description: "Remplacer Chrome/Edge par Firefox. Offre une meilleure confidentialité et est entièrement Libre."
      },
      {
        id: "libreoffice-pilot",
        title: "Piloter LibreOffice avec du personnel volontaire",
        effort: "low",
        description: "Commencer avec un petit groupe pour démontrer la compatibilité et renforcer la confiance."
      },
      {
        id: "safer-hosting",
        title: "Évaluer les alternatives hébergées dans l'UE",
        effort: "med",
        description: "Rechercher l'hébergement Nextcloud, OnlyOffice ou Moodle dans des juridictions de l'UE."
      },
      {
        id: "privacy-training",
        title: "Formation de base à la sensibilisation à la confidentialité",
        effort: "low",
        description: "Ateliers courts sur la souveraineté des données et pourquoi les logiciels Libres sont importants pour l'éducation."
      },
      {
        id: "password-manager",
        title: "Déployer un gestionnaire de mots de passe Libre",
        effort: "low",
        description: "Utiliser Bitwarden (auto-hébergé) ou une solution Libre similaire pour une meilleure sécurité."
      }
    ]
  },
  {
    id: 2,
    title: "Migration progressive",
    why: "Remplacer systématiquement les outils propriétaires par des alternatives Libres tout en maintenant la fonctionnalité.",
    actions: [
      {
        id: "linux-pilot",
        title: "Pilote Linux sur des machines plus anciennes",
        effort: "med",
        description: "Installer Ubuntu ou Debian sur 5 à 10 ordinateurs plus anciens. Former le personnel IT et les premiers adoptants."
      },
      {
        id: "libreoffice-rollout",
        title: "Déploiement complet de LibreOffice",
        effort: "med",
        description: "Remplacer Microsoft Office sur toutes les machines. Fournir des ressources de formation et de support."
      },
      {
        id: "nextcloud-deploy",
        title: "Déployer Nextcloud pour le partage de fichiers",
        effort: "high",
        description: "Auto-héberger ou utiliser Nextcloud hébergé dans l'UE pour remplacer Google Drive/Dropbox."
      },
      {
        id: "moodle-migration",
        title: "Migrer vers Moodle LMS",
        effort: "high",
        description: "Remplacer Google Classroom ou Teams par une instance Moodle auto-hébergée."
      },
      {
        id: "email-migration",
        title: "Migrer vers une solution email Libre",
        effort: "high",
        description: "Passer de Gmail/Outlook à un email auto-hébergé ou hébergé dans l'UE utilisant des logiciels Libres."
      }
    ]
  },
  {
    id: 3,
    title: "Indépendance et durabilité",
    why: "Construire une indépendance numérique à long terme grâce à des pratiques durables et à l'engagement communautaire.",
    actions: [
      {
        id: "repair-policy",
        title: "Établir une politique de réparation/réutilisation",
        effort: "med",
        description: "Prioriser la réparation et la réhabilitation du matériel plutôt que l'achat de neuf. Prolonger les cycles de vie des appareils."
      },
      {
        id: "open-procurement",
        title: "Adopter un approvisionnement Libre en premier",
        effort: "med",
        description: "Mettre à jour les politiques d'achat pour exiger l'évaluation des logiciels Libres avant les options propriétaires."
      },
      {
        id: "community-contribute",
        title: "Contribuer à la communauté NIRD",
        effort: "low",
        description: "Partager votre expérience de migration, aider d'autres écoles et soutenir les initiatives d'éducation Libre."
      },
      {
        id: "student-training",
        title: "Intégrer les logiciels Libres dans le programme",
        effort: "med",
        description: "Enseigner aux élèves la liberté numérique et les logiciels Libres dans le cadre de la littératie numérique."
      },
      {
        id: "sustainability-plan",
        title: "Créer un plan de durabilité à long terme",
        effort: "high",
        description: "Documenter les procédures de maintenance, les programmes de formation et les connexions communautaires pour un support continu."
      }
    ]
  }
]

function getTopWeaknessTags(answers: Answer[]): RoadmapTag[] {
  const tagScores: Record<RoadmapTag, number> = {
    hardware: 0,
    data: 0,
    training: 0,
    software: 0
  }

  answers.forEach(answer => {
    const tag = answer.roadmapTag as RoadmapTag
    if (tag in tagScores) {
      tagScores[tag] += answer.score
    }
  })

  return Object.entries(tagScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([tag]) => tag as RoadmapTag)
}

function personalizeStage(stage: RoadmapStage, weaknessTags: RoadmapTag[]): RoadmapStage {
  // Prioritize actions that match weakness areas
  const prioritizedActions = [...stage.actions].sort((a, b) => {
    const aMatches = weaknessTags.some(tag => 
      a.id.includes(tag) || a.title.toLowerCase().includes(tag)
    )
    const bMatches = weaknessTags.some(tag => 
      b.id.includes(tag) || b.title.toLowerCase().includes(tag)
    )
    
    if (aMatches && !bMatches) return -1
    if (!aMatches && bMatches) return 1
    return 0
  })

  return {
    ...stage,
    actions: prioritizedActions
  }
}

export function generateRoadmap(score: number, answers: Answer[]): RoadmapStage[] {
  const weaknessTags = getTopWeaknessTags(answers)
  
  let stagesToShow: RoadmapStage[]
  
  if (score > 70) {
    // Strong dependency - focus on awareness and quick wins
    stagesToShow = [allStages[0], allStages[1]]
  } else if (score >= 40) {
    // Mid-transition - focus on quick wins and migration
    stagesToShow = [allStages[1], allStages[2]]
  } else {
    // Already on Libre path - focus on migration and sustainability
    stagesToShow = [allStages[2], allStages[3]]
  }

  return stagesToShow.map(stage => personalizeStage(stage, weaknessTags))
}

