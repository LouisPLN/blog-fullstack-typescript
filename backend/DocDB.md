
# Documentation Prisma pour le Blog

## Étapes de Configuration et de Modélisation avec Prisma

### 1. Initialisation de Prisma

Dans le projet, nous avons initialisé Prisma en exécutant la commande suivante :

```bash
npx prisma init
```

Cette commande crée un dossier `prisma/` avec les fichiers nécessaires : `schema.prisma` pour la définition du modèle de données et `.env` pour les variables d'environnement.

### 2. Configuration de la Base de Données

Dans le fichier `.env`, la configuration de la base de données PostgreSQL est définie avec l'URL de la base de données :

```plaintext
DATABASE_URL="postgres://admin:admin@db:5432/blog"
```

Cette URL contient les informations nécessaires pour se connecter à la base de données qui sera utilisée pour stocker les données du blog.

### 3. Définition des Modèles de Données dans `schema.prisma`

Voici les modèles de données créés pour le projet :

#### Modèle `User`

Le modèle `User` représente les utilisateurs du blog et contient les informations suivantes :

- `id`: identifiant unique de l'utilisateur.
- `email`: l'email unique de l'utilisateur.
- `createdAt`: date de création du compte.
- `updatedAt`: date de la dernière mise à jour du compte.

```prisma
model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### Modèle `Post`

Le modèle `Post` représente les articles du blog. Il contient les champs suivants :

- `id`: identifiant unique du post.
- `title`: titre de l'article.
- `content`: contenu de l'article.
- `createdAt`: date de création de l'article.
- `updatedAt`: date de la dernière mise à jour de l'article.
- `authorId`: référence à l'utilisateur qui a écrit l'article (relation avec le modèle `User`).

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
}
```

### 4. Création et Application des Migrations

#### Générer une Migration

Après avoir modifié le modèle dans `schema.prisma`, une migration doit être générée avec la commande suivante :

```bash
npx prisma migrate dev --name init
```

Cela génère une migration qui sera appliquée à la base de données pour créer les tables correspondantes.

#### Appliquer les Migrations

Pour appliquer les migrations à la base de données, nous utilisons la commande suivante :

```bash
npx prisma migrate deploy
```

Cela met à jour la base de données pour qu'elle soit en accord avec les modifications du schéma.

### 5. Générer le Client Prisma

Le client Prisma permet d'interagir avec la base de données. Après avoir créé ou modifié le modèle, il faut générer le client avec la commande suivante :

```bash
npx prisma generate
```

Cela génère un fichier client que nous pouvons importer et utiliser dans notre code pour interagir avec la base de données.

---

## Utilisation du Client Prisma

Une fois le client Prisma généré, il peut être utilisé dans le code pour effectuer des opérations sur la base de données.

Exemple pour créer un utilisateur dans la base de données :

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createUser() {
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
    },
  })
  console.log(user)
}

createUser()
```

---

## Gestion des Migrations

- **Créer une migration** : Après toute modification du schéma, utilise `npx prisma migrate dev --name <nom_de_migration>` pour créer une migration.
- **Appliquer les migrations** : Utilise `npx prisma migrate deploy` pour appliquer les migrations sur la base de données.
- **Réinitialiser la base de données** : Si tu veux réinitialiser la base de données et appliquer toutes les migrations, utilise `npx prisma migrate reset`.
  
---

## Structure des Dossiers

La structure du projet avec Prisma se présente comme suit :

```plaintext
.
├── prisma
│   ├── schema.prisma      # Schéma de la base de données
│   ├── migrations/        # Dossier contenant les migrations générées
├── .env                   # Fichier contenant les variables d'environnement (DATABASE_URL)
└── node_modules           # Dépendances Node.js
```

### Contenu du fichier `schema.prisma`

Voici un aperçu du fichier `schema.prisma` pour les modèles `User` et `Post` :

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int     @id @default(autoincrement())
  email     String  @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
}
```

---

## Commandes Prisma Utiles

### 1. Initialiser Prisma :
```bash
npx prisma init
```

### 2. Créer une migration :
```bash
npx prisma migrate dev --name <nom_de_migration>
```

### 3. Appliquer les migrations :
```bash
npx prisma migrate deploy
```

### 4. Générer le client Prisma :
```bash
npx prisma generate
```

### 5. Voir l'état de la base de données :
```bash
npx prisma db pull
```

### 6. Réinitialiser la base de données :
```bash
npx prisma migrate reset
```

---
