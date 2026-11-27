# FME001-M01-L02 · Porte de l'expert

Dix questions pour Ilyas, les plus lourdes pour la leçon d'abord. Chacune renvoie à `affirmations.yaml` et à `source-pack.md`. L'option recommandée vient en premier. Une réponse écrite ici devient une source de niveau `expert` pour les affirmations citées ; sans réponse, la leçon fait ce qu'indique la ligne « Sans réponse », et la production continue.

État vérifié (2026-11-27) : une affirmation refusée par le vérificateur ne fonde aucune option ; quand une affirmation plus étroite en a été découpée, c'est elle qui est citée (« découpée »). Sans réponse d'Ilyas, une option ne s'appuie que sur des affirmations en narration vérifiées ou découpées ; une option recommandée qui demande plus le dit (« sur la réponse d'Ilyas »).

## Q1 · Quelle définition de l'interopérabilité la leçon donne-t-elle ?

**Ce que disent les sources.** La directive INSPIRE : la possibilité de combiner des jeux de données spatiales et de faire interagir des services sans intervention manuelle répétée, de façon que le résultat soit cohérent et que la valeur des données et services soit accrue. Toute la définition est dans les extraits (vérifiée en seconde passe) ; legislation.gov.uk et EUR-Lex publient le même texte, une seule source, et la confiance forte vient de la publication académique qui la reprend [A-interop-01]. Un rapport de l'OGC donne une autre définition, qu'il attribue à ISO 19119, alors qu'un wiki attribue la même phrase à ISO 19118 (contradiction, aucun texte ISO lu) [A-interop-02]. Un wiki cite une définition de l'OGC (2004) dont le texte d'origine n'est pas retrouvé (confiance faible) [A-interop-03].

**Options.**
1. (recommandée) La définition d'INSPIRE, dite comme celle de la directive européenne, avec les mots de la source : « combiner des jeux de données spatiales et faire interagir des services sans intervention manuelle répétée » [A-interop-01].
2. La définition du rapport de l'OGC, sans citer de numéro de norme.
3. Une définition donnée par Ilyas, qui deviendra la source.

**Sans réponse.** Option 1 : A-interop-01 est en narration, vérifiée ; A-interop-02 et A-interop-03 restent hors narration.

Réponse d'Ilyas :

## Q2 · Combien de niveaux d'interopérabilité la leçon nomme-t-elle, et lesquels ?

**Ce que disent les sources.** ISO 19101-1 (extrait public), confirmé par une publication de 2020, nomme quatre niveaux : système, syntaxique, structurel, sémantique ; définir ces niveaux est « un des buts principaux » du modèle de référence, et le numéro de norme le garde à la porte [A-interop-04]. L'article des annales ISPRS écrit, au conditionnel et d'après Brodeur et al., que l'hétérogénéité « may be classified » en trois catégories ; cette phrase n'est dans aucun extrait et l'affirmation est refusée [A-interop-05] ; le même article définit le niveau structurel, une seule source [A-interop-06]. La publication de 2020 parle aussi de six couches, et d'un modèle à sept niveaux (§ 5 du pack). Seuls les niveaux syntaxique et sémantique ont une définition en narration, confiance forte [A-interop-13, A-interop-14] ; le niveau système n'a aucune définition lue. Sur ce que coûte un écart de sens, une seule source, le cadre IGIF de l'ONU : une terminologie différente dans les modèles de données « peut » être source de confusion et rendre difficile la mise en correspondance (découpée, confiance faible) [A-semantique-34].

**Options.**
1. (recommandée) Ne pas annoncer de nombre de niveaux ; nommer l'interopérabilité syntaxique (les données passent) et l'interopérabilité sémantique (le sens est compris de la même façon), et rattacher les quatre obstacles de la leçon à ces deux idées, sans citer de norme [A-interop-13, A-interop-14].
2. Trois niveaux, syntaxique, structurel, sémantique, sur la confirmation d'Ilyas : le nombre trois reposerait alors sur sa réponse (A-interop-05 est refusée), et A-interop-06 passerait en narration.
3. Les quatre niveaux d'ISO 19101-1, en citant la norme à l'écran, sur la confirmation d'Ilyas.

**Sans réponse.** Option 1 ; A-interop-04, A-interop-05, A-interop-06 et A-semantique-34 restent hors narration. Si Ilyas confirme que la leçon peut dire qu'une terminologie différente « peut » rendre difficile la mise en correspondance, il l'écrit ici, et A-semantique-34 passe en narration.

Réponse d'Ilyas :

## Q3 · Quel cas réel la voix dit-elle pour chaque obstacle ?

**Ce que disent les sources** (§ 7 du pack). Format : le shapefile limite un nom de champ à 10 caractères (forte) [A-formats-10] ; les arcs deviennent des lignes à sommets rapprochés (moyenne) [A-formats-13] ; GeoJSON impose WGS 84 (forte) [A-formats-06] ; la limite de 2 Go d'un shapefile n'a qu'Esri, et GDAL donne d'autres limites (découpée, à la porte, contradiction au § 5) [A-formats-21]. Modèle : les exemples de Safe Software entre représentations (coordonnées en colonnes et géométrie de point ; attributs portés par un point intérieur) sont refusés, leur cadre n'étant dans aucun extrait, et aucune affirmation n'en a été découpée [A-modeles-17, A-modeles-18] ; restent en narration : des formats fortement normalisés en centaines de tables ou de couches, d'autres non (Safe Software) [A-modeles-19], les domaines et sous-types des géodatabases que le shapefile ne porte pas (Esri) [A-modeles-10], les attributs imbriqués d'Ordnance Survey MasterMap [A-modeles-13] ; le cas COS (Q4). Coordonnées : NAD 27 contre NAD 83, 10 à 100 m aux États-Unis (forte) [A-coordonnees-31]. Sémantique : la forêt, définie différemment selon les États membres et la littérature (forte, découpée, sans « ce qui met à l'épreuve l'interopérabilité ») [A-semantique-31] ; « pond » (étang) chez Safe Software (moyenne) [A-semantique-01].

**Options.**
1. (recommandée) Un cas par obstacle, le plus sûr : 10 caractères du shapefile [A-formats-10] ; des formats découpés en centaines de tables ou de couches et d'autres non, attribué à Safe Software [A-modeles-19] ; NAD 27 contre NAD 83 [A-coordonnees-31] ; la forêt [A-semantique-31].
2. Les arcs de cercle à la place des 10 caractères [A-formats-13], les domaines et sous-types des géodatabases à la place des formats normalisés [A-modeles-10], « pond » à la place de la forêt [A-semantique-01].
3. Des cas choisis par Ilyas dans sa pratique, qui deviendront la source (il les écrit ici, avec ce qu'il peut en dire) ; par exemple les coordonnées (x,y) en colonnes et la géométrie de point, s'il les confirme.

**Sans réponse.** Option 1 : ces cas sont en narration, vérifiés, ou découpé pour la forêt (A-semantique-31) ; A-modeles-17, A-modeles-18 et A-formats-21 restent hors narration.

Réponse d'Ilyas :

## Q4 · Le cas de la carte d'occupation du sol portugaise (COS vers INSPIRE) peut-il servir d'exemple de différence de modèle ?

**Ce que disent les sources.** Seuls des documents de la DGT portugaise décrivent le cas : la décision d'harmoniser la COS selon INSPIRE, une table de correspondance entre classes, attributs, énumérations, listes de codes et associations, une structure de cinq niveaux et 225 classes, l'outil HALE [A-modeles-27, A-modeles-28, A-modeles-29, A-modeles-30]. Aucune source indépendante trouvée (confiance moyenne, chiffres et noms propres : à la porte ; A-modeles-30 en contexte).

**Options.**
1. (recommandée, sur la réponse d'Ilyas) Oui, sans chiffre : « l'organisme cartographique portugais a décidé d'harmoniser sa carte d'occupation du sol selon INSPIRE, et a établi une table de correspondance entre les classes, attributs et listes de codes des deux modèles », avec le déroulé de la DGT redessiné comme référence (VIS-modeles-02 est en REFERENCE_ONLY : il se redessine, il ne se reprend pas).
2. Oui, avec la structure de 225 classes.
3. Non : la leçon garde seulement les cas de modèle déjà en narration (Q3) [A-modeles-19, A-modeles-10, A-modeles-13].

**Sans réponse.** Option 3 : le cas COS reste hors narration.

Réponse d'Ilyas :

## Q5 · Quel chiffre la voix donne-t-elle pour l'écart entre deux systèmes de coordonnées ?

**Ce que disent les sources.** Aux États-Unis contigus, NAD 27 vers NAD 83 déplace les points de 10 à 100 m (NGS et USGS, forte, en narration) [A-coordonnees-31] ; les valeurs UTM changent d'environ 200 m (USGS seul) [A-coordonnees-27]. En Alberta, moyennes de 6 à 7 m et 20 m en géographiques, 225 m et 70 m en Mercator transverse (une source provinciale) [A-coordonnees-25, A-coordonnees-26]. Aucun cas trouvé en France (NTF vers RGF93) ni pour deux couches non reprojetées. Ces chiffres mesurent un écart de référentiel, pas un décalage à l'écran (§ 4 du pack).

**Options.**
1. (recommandée) « De 10 à 100 mètres entre NAD 27 et NAD 83 aux États-Unis », dit comme un écart entre deux référentiels [A-coordonnees-31].
2. Le cas de l'Alberta, plus proche du public canadien, si Ilyas confirme les chiffres.
3. Aucun chiffre : la leçon dit seulement que, d'un référentiel à l'autre, la position des points change [A-coordonnees-31].

**Sans réponse.** Option 1 (en narration, vérifiée) ; A-coordonnees-25, A-coordonnees-26 et A-coordonnees-27 restent hors narration.

Réponse d'Ilyas :

## Q6 · Quels systèmes de coordonnées et codes EPSG la leçon nomme-t-elle ?

**Ce que disent les sources.** Le registre EPSG (une seule source primaire par code, à la porte) : 4326 WGS 84, 4617 NAD83(CSRS), 26917 NAD83 / UTM zone 17N, 32183 NAD83 / MTM zone 3, 2154 RGF93 v1 / Lambert-93 [A-coordonnees-12, A-coordonnees-13, A-coordonnees-15, A-coordonnees-16, A-coordonnees-17]. En France, RGF93, Lambert 93 et CC 9 zones : le BKG ne confirme que RGF93 et Lambert-93, « CC 9 zones » repose sur la DGFiP seule, et l'affirmation est passée à la porte [A-coordonnees-19]. Ce qu'est un code EPSG : forte, en narration [A-coordonnees-32].

**Options.**
1. (recommandée, sur la réponse d'Ilyas) À l'écran, trois codes : EPSG:4326 (WGS 84), EPSG:2154 (Lambert-93) et EPSG:32183 (NAD83 / MTM zone 3), pour montrer qu'une même donnée change de chiffres selon le système ; la voix nomme les systèmes sans lire les codes.
2. Deux codes seulement, WGS 84 et un système du pays de l'apprenant.
3. Aucun code : la leçon dit ce qu'est un code EPSG [A-coordonnees-32], et les codes viennent en L04.

**Sans réponse.** Option 3 : les codes et A-coordonnees-19 restent hors narration (L04 manipule les systèmes).

Réponse d'Ilyas :

## Q7 · La leçon cite-t-elle le coût de 15,8 milliards de dollars du NIST ?

**Ce que disent les sources.** Une étude commandée par le NIST a estimé à 15,8 milliards de dollars par an le coût d'une interopérabilité insuffisante dans l'industrie des installations (« capital facilities ») aux États-Unis, que la page découpe en bâtiments commerciaux et institutionnels et installations industrielles, pour l'année 2002 (forte, découpée) [A-interop-15]. La formulation d'avant est refusée : « bâtiments [...] industriels » reclassait les catégories de la page, et « américaine » n'était dans aucun extrait [A-interop-10]. Le rapport juge ce chiffre probablement prudent (contexte) [A-interop-11]. Ce n'est pas une étude des données géographiques ; aucun chiffre propre au SIG n'a été trouvé.

**Options.**
1. (recommandée) Oui, en une phrase et en disant son champ : « aux États-Unis, une étude commandée par le NIST a chiffré à 15,8 milliards de dollars par an le coût d'une interopérabilité insuffisante dans les bâtiments commerciaux et institutionnels et les installations industrielles, pour l'année 2002 », ce qui parle au public BIM [A-interop-15].
2. Non : la leçon porte sur le SIG et ne cite pas de chiffre de coût.

**Sans réponse.** Option 1 : A-interop-15 est en narration, avec la précision du champ (§ 4 du pack) ; A-interop-10 reste hors narration.

Réponse d'Ilyas :

## Q8 · La leçon donne-t-elle un nombre de formats pour FME ?

**Ce que disent les sources.** La page de démarrage de FME affiche « 800+ supported formats » ; une fiche de Safe Software chez Esri, non datée, affiche « 300+ » [A-formats-18]. La documentation de FME dit seulement qu'il contient un grand nombre de formats, parce que tant de domaines différents utilisent des données spatiales (en narration, vérifiée) [A-formats-19]. Aucune source indépendante.

**Options.**
1. (recommandée) Pas de nombre : « FME lit et écrit un grand nombre de formats, parce que tant de domaines différents utilisent des données spatiales » [A-formats-19].
2. « Safe Software annonce plus de 800 formats », attribué à l'éditeur, avec la page de démarrage comme source.

**Sans réponse.** Option 1.

Réponse d'Ilyas :

## Q9 · Quels numéros de norme ISO la leçon montre-t-elle ?

**Ce que disent les sources.** GML est aussi ISO 19136 (forte, en narration) [A-formats-04]. Les autres numéros n'ont qu'une source, à la porte : Simple Features, ISO 19125 [A-semantique-11] ; schéma d'application, ISO 19109 [A-modeles-01, A-modeles-20, A-modeles-21] ; ISO 19107 [A-modeles-06] ; ISO 19101-1 [A-interop-04] ; GML conforme à ISO 19118 [A-semantique-12]. ISO/TS 19150-1 et son année ne se lisent que dans le titre de la fiche de BSI : l'affirmation est refusée [A-semantique-05]. L'OGC, organisation internationale qui élabore des normes géospatiales, est en narration (forte) [A-semantique-26], comme ses normes ouvertes destinées à l'interopérabilité (moyenne) [A-semantique-27]. L'ISO/TC 211 et le lien entre ses normes abstraites et celles de l'OGC sont à la porte : le cadre IGIF reprend la présentation des organismes eux-mêmes, ce n'est pas une source indépendante (confiance moyenne) [A-semantique-10, A-semantique-28].

**Options.**
1. (recommandée) La voix nomme l'OGC [A-semantique-26] ; l'écran montre seulement ISO 19136 à côté de GML [A-formats-04] ; aucun autre numéro, et l'ISO/TC 211 n'est pas nommé.
2. La voix nomme aussi l'ISO/TC 211 et dit que les normes de l'OGC s'appuient sur ses normes abstraites, sur la confirmation d'Ilyas (A-semantique-10 et A-semantique-28 passent alors en narration).
3. L'écran montre aussi ISO 19125 (Simple Features) et ISO 19109 (schéma d'application), sur la confirmation d'Ilyas.

**Sans réponse.** Option 1 ; A-semantique-05, A-semantique-10 et A-semantique-28 restent hors narration.

Réponse d'Ilyas :

## Q10 · Comment la leçon présente-t-elle le rôle de FME face à ces obstacles ?

**Ce que disent les sources.** Safe Software écrit que les données sont stockées un peu partout : dans des applications, des bases de données et des formats différents, avec des modèles de données et des systèmes de coordonnées différents (découpée) [A-semantique-32] ; qu'il y a de nombreuses raisons de transformer des données entre formats, parmi lesquelles l'intégration de données de systèmes différents (découpée) [A-formats-20]. Sa documentation présente FME comme un outil conçu pour être une application d'ETL spatial, centrée sur la traduction de données géographiques (découpée, sans « le premier ») [A-semantique-33]. Refusées : « le problème de départ » pour « A common challenge » [A-semantique-17] ; « les outils antérieurs » pour « Traditionally », et « le premier outil » [A-semantique-19]. Un guide de 2010 rédigé pour le JRC qualifie FME de solution ETL spatiale très utilisée (une source, B) [A-semantique-21] ; la documentation d'Esri, partenaire de Safe Software, décrit les outils d'ETL spatial (contexte) [A-semantique-22]. Le guide du service de transformation INSPIRE classe les transformations en formats, systèmes de coordonnées et schémas (contexte) [A-modeles-26].

**Options.**
1. (recommandée) Une phrase de transition vers L03, attribuée à l'éditeur : Safe Software écrit que les données sont stockées un peu partout, entre formats, modèles de données et systèmes de coordonnées différents [A-semantique-32], et présente FME comme conçu pour être une application d'ETL spatial, centrée sur la traduction de données géographiques [A-semantique-33], sans « le premier » ni « très utilisée ».
2. Citer aussi le guide pour le JRC, en le datant de 2010 et en l'attribuant à ses auteurs.

**Sans réponse.** Option 1, avec A-semantique-32 et A-semantique-33 ; A-semantique-17, A-semantique-19 et A-semantique-21 restent hors narration.

Réponse d'Ilyas :
