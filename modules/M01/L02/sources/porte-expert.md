# FME001-M01-L02 · Porte de l'expert

Dix questions pour Ilyas, les plus lourdes pour la leçon d'abord. Chacune renvoie à `affirmations.yaml` et à `source-pack.md`. L'option recommandée vient en premier. Une réponse écrite ici devient une source de niveau `expert` pour les affirmations citées ; sans réponse, la leçon fait ce qu'indique la ligne « Sans réponse », et la production continue.

## Q1 · Quelle définition de l'interopérabilité la leçon donne-t-elle ?

**Ce que disent les sources.** La directive INSPIRE : la possibilité de combiner des jeux de données spatiales et de faire interagir des services sans intervention manuelle répétée, avec un résultat cohérent (texte de la directive, repris par une publication académique ; confiance forte) [A-interop-01]. Un rapport de l'OGC donne une autre définition, qu'il attribue à ISO 19119, alors qu'un wiki attribue la même phrase à ISO 19118 (contradiction, aucun texte ISO lu) [A-interop-02]. Un wiki cite une définition de l'OGC (2004) dont le texte d'origine n'est pas retrouvé [A-interop-03].

**Options.**
1. (recommandée) La définition d'INSPIRE, dite comme celle de la directive européenne, en mots simples : « combiner des données et faire travailler des services ensemble sans retouches manuelles répétées ».
2. La définition du rapport de l'OGC, sans citer de numéro de norme.
3. Une définition donnée par Ilyas, qui deviendra la source.

**Sans réponse.** Option 1 : elle est déjà en narration ; A-interop-02 et A-interop-03 restent hors narration.

Réponse d'Ilyas :

## Q2 · Combien de niveaux d'interopérabilité la leçon nomme-t-elle, et lesquels ?

**Ce que disent les sources.** ISO 19101-1 (extrait public), confirmé par une publication de 2020, nomme quatre niveaux : système, syntaxique, structurel, sémantique [A-interop-04]. Un article des annales ISPRS classe l'hétérogénéité en trois : syntaxique, structurelle, sémantique [A-interop-05, A-interop-06]. La publication de 2020 parle aussi de six couches, et d'un modèle à sept niveaux (§ 5 du pack). Seuls les niveaux syntaxique et sémantique ont une définition en confiance forte [A-interop-13, A-interop-14] ; le niveau structurel n'a qu'une source [A-interop-06], le niveau système aucune définition lue.

**Options.**
1. (recommandée) Ne pas annoncer de nombre de niveaux ; nommer l'interopérabilité syntaxique (les données passent) et l'interopérabilité sémantique (le sens est compris de la même façon), et rattacher les quatre obstacles de la leçon à ces deux idées, sans citer de norme.
2. Trois niveaux, syntaxique, structurel, sémantique, avec la confirmation d'Ilyas pour le niveau structurel (A-interop-06 passe alors en narration).
3. Les quatre niveaux d'ISO 19101-1, en citant la norme à l'écran.

**Sans réponse.** Option 1 ; A-interop-04, A-interop-05 et A-interop-06 restent hors narration.

Réponse d'Ilyas :

## Q3 · Quel cas réel la voix dit-elle pour chaque obstacle ?

**Ce que disent les sources** (§ 7 du pack). Format : le shapefile limite un nom de champ à 10 caractères (forte) [A-formats-10] ; les arcs deviennent des lignes à sommets rapprochés [A-formats-13] ; GeoJSON impose WGS 84 (forte) [A-formats-06]. Modèle : les exemples de Safe Software (coordonnées en colonnes contre géométrie de point ; attributs portés par un point intérieur) [A-modeles-17, A-modeles-18] ; le cas COS (Q4). Coordonnées : NAD 27 contre NAD 83, 10 à 100 m aux États-Unis (forte) [A-coordonnees-31]. Sémantique : la forêt, définie différemment selon les pays (forte) [A-semantique-23] ; « pond » (étang) chez Safe Software [A-semantique-01].

**Options.**
1. (recommandée) Un cas par obstacle, le plus sûr : 10 caractères du shapefile ; coordonnées en colonnes contre géométrie de point (Safe Software, attribué) ; NAD 27 contre NAD 83 ; la forêt.
2. Les mêmes, avec les arcs de cercle à la place des 10 caractères pour le format, et « pond » à la place de la forêt pour la sémantique.
3. Des cas choisis par Ilyas dans sa pratique, qui deviendront la source (il les écrit ici, avec ce qu'il peut en dire).

**Sans réponse.** Option 1 : tous ces cas sont déjà en narration.

Réponse d'Ilyas :

## Q4 · Le cas de la carte d'occupation du sol portugaise (COS vers INSPIRE) peut-il servir d'exemple de différence de modèle ?

**Ce que disent les sources.** Seuls des documents de la DGT portugaise décrivent le cas : la décision d'harmoniser la COS selon INSPIRE, une table de correspondance entre classes, attributs, énumérations, listes de codes et associations, une structure de cinq niveaux et 225 classes, l'outil HALE [A-modeles-27, A-modeles-28, A-modeles-29, A-modeles-30]. Aucune source indépendante trouvée (confiance moyenne, chiffres et noms propres : à la porte).

**Options.**
1. (recommandée) Oui, sans chiffre : « l'organisme cartographique portugais a décidé d'harmoniser sa carte d'occupation du sol selon INSPIRE, et a établi une table de correspondance entre les classes, attributs et listes de codes des deux modèles », avec le déroulé de la DGT redessiné comme référence (VIS-modeles-02 est en REFERENCE_ONLY : il se redessine, il ne se reprend pas).
2. Oui, avec la structure de 225 classes.
3. Non : la leçon garde seulement les exemples de Safe Software pour les modèles.

**Sans réponse.** Option 3 : le cas COS reste hors narration.

Réponse d'Ilyas :

## Q5 · Quel chiffre la voix donne-t-elle pour l'écart entre deux systèmes de coordonnées ?

**Ce que disent les sources.** Aux États-Unis contigus, NAD 27 vers NAD 83 déplace les points de 10 à 100 m (NGS et USGS, forte) [A-coordonnees-31] ; les valeurs UTM changent d'environ 200 m (USGS seul) [A-coordonnees-27]. En Alberta, moyennes de 6 à 7 m et 20 m en géographiques, 225 m et 70 m en Mercator transverse (une source provinciale) [A-coordonnees-25, A-coordonnees-26]. Aucun cas trouvé en France (NTF vers RGF93) ni pour deux couches non reprojetées. Ces chiffres mesurent un écart de référentiel, pas un décalage à l'écran (§ 4 du pack).

**Options.**
1. (recommandée) « De 10 à 100 mètres entre NAD 27 et NAD 83 aux États-Unis », dit comme un écart entre deux référentiels.
2. Le cas de l'Alberta, plus proche du public canadien, si Ilyas confirme les chiffres.
3. Aucun chiffre : la leçon dit seulement que, d'un référentiel à l'autre, la position des points change [A-coordonnees-31].

**Sans réponse.** Option 1 (déjà en narration) ; A-coordonnees-25, A-coordonnees-26 et A-coordonnees-27 restent hors narration.

Réponse d'Ilyas :

## Q6 · Quels systèmes de coordonnées et codes EPSG la leçon nomme-t-elle ?

**Ce que disent les sources.** Le registre EPSG (une seule source primaire par code) : 4326 WGS 84, 4617 NAD83(CSRS), 26917 NAD83 / UTM zone 17N, 32183 NAD83 / MTM zone 3, 2154 RGF93 v1 / Lambert-93 [A-coordonnees-12, A-coordonnees-13, A-coordonnees-15, A-coordonnees-16, A-coordonnees-17]. En France, RGF93, Lambert 93 et CC 9 zones (forte) [A-coordonnees-19]. Ce qu'est un code EPSG : forte [A-coordonnees-32].

**Options.**
1. (recommandée) À l'écran, trois codes : EPSG:4326 (WGS 84), EPSG:2154 (Lambert-93) et EPSG:32183 (NAD83 / MTM zone 3), pour montrer qu'une même donnée change de chiffres selon le système ; la voix nomme les systèmes sans lire les codes.
2. Deux codes seulement, WGS 84 et un système du pays de l'apprenant.
3. Aucun code : la leçon dit ce qu'est un code EPSG, et les codes viennent en L04.

**Sans réponse.** Option 3 : les codes restent hors narration (L04 manipule les systèmes).

Réponse d'Ilyas :

## Q7 · La leçon cite-t-elle le coût de 15,8 milliards de dollars du NIST ?

**Ce que disent les sources.** Une étude commandée par le NIST a estimé à 15,8 milliards de dollars par an le coût d'une interopérabilité insuffisante dans l'industrie américaine des installations (bâtiments), pour 2002 (forte) [A-interop-10] ; le rapport juge ce chiffre prudent [A-interop-11]. Ce n'est pas une étude des données géographiques ; aucun chiffre propre au SIG n'a été trouvé.

**Options.**
1. (recommandée) Oui, en une phrase et en disant son champ : « dans le bâtiment américain, une étude du NIST a chiffré ce coût à 15,8 milliards de dollars pour la seule année 2002 », ce qui parle au public BIM.
2. Non : la leçon porte sur le SIG et ne cite pas de chiffre de coût.

**Sans réponse.** Option 1 : l'affirmation est en narration, avec la précision du champ (§ 4 du pack).

Réponse d'Ilyas :

## Q8 · La leçon donne-t-elle un nombre de formats pour FME ?

**Ce que disent les sources.** La page de démarrage de FME affiche « 800+ supported formats » ; une fiche de Safe Software chez Esri, non datée, affiche « 300+ » [A-formats-18]. La documentation de FME dit seulement « un grand nombre de formats », parce que tant de domaines utilisent des données spatiales [A-formats-19]. Aucune source indépendante.

**Options.**
1. (recommandée) Pas de nombre : « FME lit et écrit un grand nombre de formats, parce que de nombreux métiers produisent des données spatiales » [A-formats-19].
2. « Safe Software annonce plus de 800 formats », attribué à l'éditeur, avec la page de démarrage comme source.

**Sans réponse.** Option 1.

Réponse d'Ilyas :

## Q9 · Quels numéros de norme ISO la leçon montre-t-elle ?

**Ce que disent les sources.** GML est aussi ISO 19136 (forte) [A-formats-04]. Les autres numéros n'ont qu'une source : Simple Features, ISO 19125 [A-semantique-11] ; schéma d'application, ISO 19109 [A-modeles-01, A-modeles-20, A-modeles-21] ; ISO 19107 [A-modeles-06] ; ISO 19101-1 [A-interop-04] ; ISO/TS 19150-1 [A-semantique-05] ; GML conforme à ISO 19118 [A-semantique-12]. L'ISO/TC 211 et son lien avec l'OGC sont en confiance forte [A-semantique-10, A-semantique-28].

**Options.**
1. (recommandée) La voix nomme l'OGC et l'ISO/TC 211 ; l'écran montre seulement ISO 19136 à côté de GML ; aucun autre numéro.
2. L'écran montre aussi ISO 19125 (Simple Features) et ISO 19109 (schéma d'application), sur la confirmation d'Ilyas.

**Sans réponse.** Option 1.

Réponse d'Ilyas :

## Q10 · Comment la leçon présente-t-elle le rôle de FME face à ces obstacles ?

**Ce que disent les sources.** Safe Software décrit des données dispersées entre applications, formats, modèles et systèmes de coordonnées [A-semantique-17] ; sa documentation présente FME comme le premier outil conçu comme ETL spatial, revendication de l'éditeur [A-semantique-19]. Un guide de 2010 rédigé pour le JRC qualifie FME de solution ETL spatiale très utilisée (une source, B) [A-semantique-21] ; la documentation d'Esri, partenaire de Safe Software, décrit les outils d'ETL spatial [A-semantique-22]. Le guide du service de transformation INSPIRE classe les transformations en formats, systèmes de coordonnées et schémas (contexte) [A-modeles-26].

**Options.**
1. (recommandée) Une phrase de transition vers L03, attribuée à l'éditeur : Safe Software décrit le problème (données dispersées entre formats, modèles et systèmes de coordonnées) [A-semantique-17] et présente FME comme un outil d'ETL spatial centré sur la traduction de données géographiques [A-semantique-19], sans « le premier » ni « très utilisée ».
2. Citer aussi le guide pour le JRC, en le datant de 2010 et en l'attribuant à ses auteurs.

**Sans réponse.** Option 1, avec A-semantique-17 ; A-semantique-19 se dit attribuée à Safe Software, sans « le premier ».

Réponse d'Ilyas :
