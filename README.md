# Woordle Front New

**Un clone du jeu Wordle en front-end, développé en HTML, CSS et JavaScript.**

[Démo en ligne](https://woordle-front-new.vercel.app/)

---

## Description
Ce projet est une réimplémentation front-end du célèbre jeu **Wordle**, où le joueur doit deviner un mot en un nombre limité d’essais. Chaque tentative donne des indices sur les lettres correctes et mal placées.

---

## Technologies utilisées
- **HTML5** : Structure de la page.
- **CSS3** : Styles et animations.
- **JavaScript** : Logique du jeu, gestion des entrées utilisateur et validation des mots.

---

## Structure du projet
woordle_front_new/
├── img/               # Images utilisées dans le jeu
├── index.html         # Page principale du jeu
├── script.js          # Logique du jeu et interactions
├── style.css          # Styles et animations
├── package.json       # Dépendances et scripts (Yarn)
├── yarn.lock          # Verrouillage des versions des dépendances
└── README.md          # Ce fichier


## Installation et exécution

### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Edge, etc.).
- [Node.js](https://nodejs.org/) et [Yarn](https://yarnpkg.com/) (optionnel, pour gérer les dépendances).

### Étapes
1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/LLafforgue/woordle_front_new.git
   cd woordle_front_new

2. **Ouvrir le jeu** :

Double-cliquez sur le fichier index.html pour l’ouvrir dans votre navigateur.
Ou utilisez un serveur local simple (ex : extension Live Server pour VS Code).


## Comment jouer ?

### Sur desktop :
- Entrez un mot en utilisant votre clavier physique.
- Validez avec la touche **Entrée**.
- Les cases changent de couleur pour indiquer :
  - **Vert** : Lettre correcte et bien placée.
  - **Jaune** : Lettre correcte mais mal placée.
  - **Gris** : Lettre absente du mot à deviner.

### Sur mobile (iOS/Android) :
1. Cliquez sur la **barre d’input** en haut de la grille.
2. Utilisez le **clavier virtuel** qui s’affiche pour entrer votre mot.
3. Validez avec **Entrée** (ou un bouton de validation si présent).

---
*Auteur : [Ludovic Lafforgue](https://github.com/LLafforgue)*


