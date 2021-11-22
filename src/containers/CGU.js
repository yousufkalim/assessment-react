import React, { useEffect } from "react";

const CGU = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 11,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div
        style={{ minHeight: "100vh", marginTop: "-2%", background: "white" }}
      >
        <div style={{ width: "60%", margin: "auto" }}>
          <h1 className="cguHeading">
            Conditions générales d'utilisation
            <br />
            <div>- Données personnelles</div>
          </h1>
        </div>
        <div style={{ width: "60%", margin: "auto" }}>
          <h2 style={{ textDecoration: "underline" }}>Définitions :</h2>
          <p>
            <span className="boldText"> Orientator : </span> La personne,
            physique ou morale, qui édite les services de communication au
            public en ligne.
            <br /> <span className="boldText"> Le Site :</span> L'ensemble des
            sites, pages Internet et services en ligne proposés par Orientator.
            <br />
            <span className="boldText"> L'Utilisateur :</span> La personne
            utilisant le Site et les services.
          </p>
          <h2>Nature des données collectées</h2>
          <p className="boldText">
            Dans le cadre de l'utilisation des Sites, Orientator est susceptible
            de collecter les catégories de données suivantes concernant ses
            Utilisateurs :
          </p>
          <p>Données d'état-civil, d'identité, d'identification...</p>
          <p>
            Données relatives à la vie personnelle{" "}
            <span className="purplecolor">
              {" "}
              (habitudes de vie, situation familiale, hors données sensibles ou
              dangereuses)
            </span>
          </p>
          <p>
            Données relatives à la vie professionnelle{" "}
            <span className="purplecolor">
              (CV, scolarité, formation professionnelle, distinctions...)
            </span>
          </p>
          <p>
            Informations d'ordre économique et financier{" "}
            <span className="purplecolor">
              (revenus, situation financière, situation fiscale...)
            </span>
          </p>
          <p>
            Données de connexion
            <span className="purplecolor">
              {" "}
              (adresses IP, journaux d'événements...)
            </span>
          </p>
          <p>
            Données de localisation{" "}
            <span className="purplecolor">
              (déplacements, données GPS, GSM...)
            </span>
          </p>
          <h1>Communication des données personnelles à des tiers</h1>
          <p className="boldText">
            Communication aux autorités sur la base des obligations légales 
          </p>
          <p className="pmargin">
            Sur la base des obligations légales, vos données personnelles
            pourront être divulguées en application d'une loi, d'un règlement ou
            en vertu d'une décision d'une autorité réglementaire ou judiciaire
            compétente. De manière générale, nous nous engageons à nous
            conformer à toutes les règles légales qui pourraient empêcher,
            limiter ou réglementer la diffusion d’informations ou de données et
            notamment à se conformer à la Loi n° 78-17 du 6 janvier 1978
            relative à l'informatique, aux fichiers et aux libertés.
          </p>
          <h4 className="boldText">
            Communication à des tiers en fonction des paramètres du compte 
          </h4>
          <p className="pmargin">
            Vos données personnelles sont strictement confidentielles et ne
            peuvent être divulguées à des tiers, sauf en cas d’accord exprès
            obtenu via les paramètres de votre compte
            <span className="colorgreen">
              {" "}
              ou suite à une information publiée sur cette page
            </span>
            .
          </p>
          <p className="boldText">
            Communication à des tiers pour sollicitation commerciale pour des
            produits et services équivalents 
          </p>
          <p className="pmargin">
            Si vous avez effectué un achat sur notre Site, nous pouvons, avec
            nos partenaires commerciaux et de manière occasionnelle, vous tenir
            informé de nos nouveaux produits, actualités et offres spéciales,
            par courriel, par courrier postal et par téléphone quant à des
            produits ou services similaires aux produits ou services qui ont
            fait l'objet de votre commande.
          </p>
          <p className="boldText">
            Communication à des tiers sous forme agrégée et anonymisée{" "}
          </p>
          <p className="pmargin">
            Vos données personnelles pourront être utilisées pour enrichir nos
            bases de données. Elles pourront être transmises à des tiers après
            avoir été anonymisées et exclusivement à des fins statistiques
          </p>
          <p className="boldText">Communication à des tiers partenaires </p>
          <p className="pmargin">
            Nous pouvons mettre certaines données personnelles à la disposition
            de partenaires stratégiques travaillant avec nous, pour la
            fourniture de produits et services ou nous aidant à commercialiser
            nos produits auprès des clients
          </p>
          <p className="boldText">
            Communication à des tiers avec restrictions liées aux destinataires
          </p>
          <p className="pmargin">
            Les données personnelles que vous nous communiquez lors de votre
            commande sont transmises à nos fournisseurs et filiales pour le
            traitement de celle-ci. Ces informations sont considérées par nos
            fournisseurs et filiales comme étant strictement confidentielles.
          </p>
          <p className="boldText">
            Communication à des tiers pour marketing direct
          </p>
          <p className="pmargin">
            Nous pouvons partager des informations avec des partenaires
            publicitaires afin de vous envoyer des communications
            promotionnelles, ou pour vous montrer plus de contenu sur mesure, y
            compris de la publicité pertinente pour les produits et services
            susceptibles de vous intéresser, et pour comprendre comment les
            utilisateurs interagissent avec les publicités.
          </p>
          <h1>
            Viralité des conditions de réutilisation des données personnelles
          </h1>
          <p className="boldText">
            Pas d'engagement sur la viralité des conditions de réutilisation{" "}
          </p>
          <p className="pmargin">
            En cas de communication de vos données personnelles à un tiers, les
            conditions de confidentialité du tiers s'appliquent.
          </p>
          <h1>
            Information préalable pour la communication des données personnelles
            à des tiers en cas de fusion / absorption
          </h1>
          <p className="boldText">
            Information préalable et possibilité d’opt-out avant et après la
            fusion / acquisition{" "}
          </p>
          <p className="pmargin">
            Dans le cas où nous prendrions part à une opération de fusion,
            d’acquisition ou à toute autre forme de cession d’actifs, nous nous
            engageons à garantir la confidentialité de vos données personnelles
            et à vous informer avant que celles-ci ne soient transférées ou
            soumises à de nouvelles règles de confidentialité.
          </p>
          <h2>Agrégation des données</h2>
          <p className="boldText">
            Agrégation avec des données non personnelles
          </p>
          <p className="pmargin">
            Nous pouvons publier, divulguer et utiliser les informations
            agrégées (informations relatives à tous nos Utilisateurs ou à des
            groupes ou catégories spécifiques d'Utilisateurs que nous combinons
            de manière à ce qu'un Utilisateur individuel ne puisse plus être
            identifié ou mentionné) et les informations non personnelles à des
            fins d'analyse du secteur et du marché, de profilage démographique,
            à des fins promotionnelles et publicitaires et à d'autres fins
            commerciales.
          </p>
          <p className="boldText">
            Agrégation avec des données personnelles disponibles sur les comptes
            sociaux de l'Utilisateur
          </p>
          <p className="pmargin">
            Si vous connectez votre compte à un compte d’un autre service afin
            de faire des envois croisés, ledit service pourra nous communiquer
            vos informations de profil, de connexion, ainsi que toute autre
            information dont vous avez autorisé la divulgation. Nous pouvons
            agréger les informations relatives à tous nos autres Utilisateurs,
            groupes, comptes, aux données personnelles disponibles sur
            l’Utilisateur.
          </p>
          <h2>Collecte des données d'identité</h2>
          <p className="boldText">
            Inscription et identification préalable pour la fourniture du
            service{" "}
          </p>
          <p className="pmargin">
            L’utilisation du Site nécessite une inscription et une
            identification préalable. Vos données nominatives
            <span className="purplecolor">
              {" "}
              (nom, prénom, adresse postale, e-mail, numéro de téléphone,...){" "}
            </span>
            sont utilisées pour exécuter nos obligations légales résultant de la
            livraison{" "}
            <span className="purplecolor"> des produits et / ou </span>des
            services, en vertu du Contrat de licence utilisateur final, de la
            limite de garantie, le cas échéant, ou de toute autre condition
            applicable. Vous ne fournirez pas de fausses informations
            nominatives et ne créerez pas de compte pour une autre personne sans
            son autorisation. Vos coordonnées devront toujours être exactes et à
            jour.
          </p>
          <h2>Collecte des données d'identification</h2>
          <p className="boldText">
            Utilisation de l'identifiant de l'utilisateur pour proposition de
            mise en relation et offres commerciales{" "}
          </p>
          <p className="pmargin">
            Nous utilisons vos identifiants électroniques pour rechercher des
            relations présentes par connexion, par adresse mail ou par services.
            Nous pouvons utiliser vos informations de contact pour permettre à
            d'autres personnes de trouver votre compte, notamment via des
            services tiers et des applications clientes. Vous pouvez télécharger
            votre carnet d'adresses afin que nous soyons en mesure de vous aider
            à trouver des connaissances sur notre réseau ou pour permettre à
            d'autres Utilisateurs de notre réseau de vous trouver. Nous pouvons
            vous proposer des suggestions, à vous et à d'autres Utilisateurs du
            réseau, à partir des contacts importés de votre carnet d’adresses.
            Nous sommes susceptibles de travailler en partenariat avec des
            sociétés qui proposent des offres incita- tives. Pour prendre en
            charge ce type de promotion et d'offre incitative, nous sommes
            susceptibles de partager votre identifiant électronique.
          </p>
          <h2>Géolocalisation</h2>
          <p className="boldText">
            Géolocalisation à des fins de fourniture du service{" "}
          </p>
          <p className="pmargin">
            Nous collectons et traitons vos données de géolocalisation afin de
            vous fournir nos services. Nous pouvons être amenés à faire usage
            des données personnelles dans le but de déterminer votre position
            géographique en temps réel. Conformément à votre droit d'opposition
            prévu par la loi n°78-17 du 6 janvier 1978 relative à
            l'informatique, aux fichiers et aux libertés, vous avez la
            possibilité, à tout moment, de désactiver les fonctions relatives à
            la géolocalisation
          </p>
          <p className="boldText purplecolor">
            Géolocalisation à des fins de croisement
          </p>
          <p className="purplecolor pmargin">
            Nous collectons et traitons vos données de géolocalisation afin de
            permettre à nos services d'identifier les points de croisement dans
            le temps et dans l'espace avec d'autres Utilisateurs du service afin
            de vous présenter le profil des Utilisateurs croisés. Conformé- ment
            à votre droit d'opposition prévu par la loi n°78-17 du 6 janvier
            1978 relative à l'informatique, aux fichiers et aux libertés, vous
            avez la possibilité, à tout moment, de désactiver les fonctions
            relatives à la géolocalisation. Vous reconnaissez alors que le
            service ne sera plus en mesure de vous présenter de profil des
            autres Utilisateurs.
          </p>
          <p className="boldText">
            Géolocalisation avec mise à disposition des partenaires pour
            référencement et agrégation (avec opt-in)
          </p>
          <p className="pmargin">
            Nous pouvons collecter et traiter vos données de géolocalisation
            avec nos partenaires. Nous nous engageons à anonymiser les données
            utilisées. Conformément à votre droit d'opposition prévu par la loi
            n°78-17 du 6 janvier 1978 relative à l'informatique, aux fi- chiers
            et aux libertés, vous avez la possibilité, à tout moment, de
            désactiver les fonctions relatives à la géolocalisation.
          </p>
          <h2>Collecte des données du terminal</h2>
          <p className="boldText">
            Collecte des données de profilage et des données techniques à des
            fins de fourniture du service
          </p>
          <p className="pmargin">
            Certaines des données techniques de votre appareil sont collectées
            automatiquement par le Site.
            <span className="purplecolor">
              {" "}
              Ces informations incluent notamment votre adresse IP, fournisseur
              d'accès à Internet, configuration matérielle, configuration
              logicielle, type et langue du navigateur...{" "}
            </span>
            La collecte de ces données est nécessaire à la fourniture des
            services.
          </p>
          <p className="boldText">
            Collecte des données techniques à des fins publicitaires,
            commerciales et statistiques
          </p>
          <p className="pmargin">
            Les données techniques de votre appareil sont automatiquement
            collectées et enregistrées par le Site, à des fins publicitaires,
            commerciales et statistiques. Ces informations nous aident à
            personnaliser et à améliorer continuellement votre expérience sur
            notre Site. Nous ne collectons ni ne conservons aucune donnée
            nominative (nom, prénom, adresse...) éventuellement attachée à une
            donnée technique. Les données collectées sont susceptibles d’être
            revendues à des tiers.
          </p>
          <h2>Cookies</h2>
          <p className="boldText">Durée de conservation des cookies</p>
          <p className="pmargin">
            Conformément aux recommandations de la CNIL, la durée maximale de
            conservation des cookies est de 13 mois au maximum après leur
            premier dépôt dans le terminal de l'Utilisateur, tout comme la durée
            de la validité du consentement de l’Utilisateur à l’utilisation de
            ces cookies. La durée de vie des cookies n’est pas prolongée à
            chaque visite. Le consentement de l’Utilisateur devra donc être
            renouvelé à l'issue de ce délai.
          </p>
          <p className="boldText">Finalité cookies</p>
          <p className="pmargin">
            Les cookies peuvent être utilisés pour des fins statistiques
            notamment pour optimiser les services rendus à l'Utilisateur, à
            partir du traitement des informations concernant la fréquence
            d'accès, la personnalisation des pages ainsi que les opérations
            réalisées et les informations consultées.
          </p>
          <p>
            Vous êtes informé que Orientator est susceptible de déposer des
            cookies sur votre terminal. Le cookie enregistre des informations
            relatives à la navigation sur le service (les pages que vous avez
            consultées, la date et l'heure de la consultation...) que nous pour-
            rons lire lors de vos visites ultérieures.
          </p>
          <p className="boldText">
            Droit de l'Utilisateur de refuser les cookies, la désactivation
            entraînant un fonctionnement dégradé du service
          </p>
          <p className="pmargin">
            Vous reconnaissez avoir été informé que Orientator peut avoir
            recours à des cookies, et l'y autorisez. Si vous ne souhaitez pas
            que des cookies soient utilisés sur votre terminal, la plupart des
            navigateurs vous permettent de désactiver les cookies en passant par
            les options de réglage. Toutefois, vous êtes informé que certains
            services sont susceptibles de ne plus fonctionner correctement.
          </p>
          <p className="boldText">
            Association possible des cookies avec des données personnelles pour
            permettre le fonctionnement du service
          </p>
          <p className="pmargin">
            Orientator peut être amenée à recueillir des informations de
            navigation via l'utilisation de cookies.
          </p>
          <h2>Conservation des données techniques</h2>
          <p className="boldText">
            Durée de conservation des données techniques
          </p>
          <p className="pmargin">
            Les données techniques sont conservées pour la durée strictement
            nécessaire à la réalisation des finalités visées ci-avant.
          </p>
          <h2>
            Délai de conservation des données personnelles et d'anonymisation
          </h2>
          <p className="boldText">
            Conservation des données pendant la durée de la relation
            contractuelle
          </p>
          <p className="pmargin">
            Conformément à l'article 6-5° de la loi n°78-17 du 6 janvier 1978
            relative à l'informatique, aux fichiers et aux libertés, les données
            à caractère personnel faisant l'objet d'un traitement ne sont pas
            conservées au-delà du temps nécessaire à l'exécution des obligations
            définies lors de la conclusion du contrat ou de la durée prédéfinie
            de la relation contractuelle.
          </p>
          <p className="boldText">
            Conservation des données anonymisées au delà de la relation
            contractuelle / après la suppression du compte
          </p>
          <p className="pmargin">
            Nous conservons les données personnelles pour la durée strictement
            nécessaire à la réalisation des finalités décrites dans les
            présentes CGU. Au-delà de cette durée, elles seront anonymisées et
            conservées à des fins exclusivement statistiques et ne donneront
            lieu à aucune exploitation, de quelque nature que ce soit.
          </p>
          <p className="boldText">
            Suppression des données après suppression du compte{" "}
          </p>
          <p className="pmargin">
            Des moyens de purge de données sont mis en place afin d'en prévoir
            la suppression effective dès lors que la durée de conservation ou
            d'archivage nécessaire à l'accomplissement des finalités déterminées
            ou imposées est atteinte. Conformément à la loi n°78-17 du 6 janvier
            1978 relative à l'informatique, aux fichiers et aux libertés, vous
            disposezpar ailleurs d'un droit de suppression sur vos données que
            vous pouvez exercer à tout moment en prenant contact avec
            Orientator.
          </p>
          <p className="boldText">
            Suppression des données après 3 ans d'inactivité
          </p>
          <p className="pmargin">
            Pour des raisons de sécurité, si vous ne vous êtes pas authentifié
            sur le Site pendant une période de trois ans, vous recevrez un
            e-mail vous invitant à vous connecter dans les plus brefs délais,
            sans quoi vos données seront supprimées de nos bases de données
          </p>
          <h2>Suppression du compte</h2>
          <p className="boldText">Suppression du compte à la demande</p>
          <p className="pmargin">
            L'Utilisateur a la possibilité de supprimer son Compte à tout
            moment, par simple demande à Orientator OU par le menu de
            suppression de Compte présent dans les paramètres du Compte le cas
            échéant.
          </p>
          <p className="boldText">
            Suppression du compte en cas de violation des CGU{" "}
          </p>
          <p className="pmargin">
            En cas de violation d'une ou de plusieurs dispositions des CGU ou de
            tout autre document incorporé aux présentes par référence,
            Orientator se réserve le droit de mettre finou restreindre sans
            aucun avertissement préalable et à sa seule discrétion, votre
            usageet accès aux services, à votre compte et à tous les Sites.
          </p>
          <h2>
            Indications en cas de faille de sécurité décelée par Orientator.
          </h2>
          <p className="boldText">
            Information de l'Utilisateur en cas de faille de sécurité
          </p>
          <p className="pmargin">
            Nous nous engageons à mettre en oeuvre toutes les mesures techniques
            et organisationnelles appropriées afin de garantir un niveau de
            sécurité adapté au regard des risques d'accès accidentels, non
            autorisés ou illégaux, de divulgation, d'altération, de perte ou
            encore de destruction des données personnelles vous concernant. Dans
            l'éventualité où nous prendrions connaissance d'un accès illégal aux
            données personnelles vous concernant stockées sur nos serveurs ou
            ceux de nos prestataires, ou d'un accès non autorisé ayant pour
            conséquence la réalisation des risques identifiés ci-dessus, nous
            nous engageons à :
          </p>
          <div style={{ width: "85%", margin: "auto" }}>
            <p style={{ margin: "0px" }}>
              · Vous notifier l'incident dans les plus brefs délais ;
            </p>
            <p style={{ margin: "0px" }}>
              . Examiner les causes de l'incident et vous en informer ;
            </p>
            <p style={{ margin: "0px" }}>
              . Prendre les mesures nécessaires dans la limite du raisonnable
              afin d'amoindrir les effets négatifs et préjudices pouvant
              résulter dudit incident
            </p>
          </div>
          <p className="boldText">Limitation de la responsabilité</p>
          <p className="pmargin">
            En aucun cas les engagements définis au point ci-dessus relatifs à
            la notification en cas de faille de sécurité ne peuvent être
            assimilés à une quelconque reconnaissance de faute ou de
            responsabilité quant à la survenance de l'incident en question.
          </p>
          <h2>Transfert des données personnelles à l'étranger</h2>
          <p className="boldText">
            Transfert des données dans des pays avec un niveau de protection
            équivalent
          </p>
          <p className="pmargin">
            Orientator s'engage à respecter la réglementation applicable
            relative aux transferts des données vers des pays étrangers et
            notamment selon les modalités suivantes :
          </p>
          <div style={{ width: "85%", margin: "auto" }}>
            <p style={{ margin: "0px" }}>
              · Orientator transfère les données personnelles de ses
              Utilisateurs vers des pays reconnus comme offrant un niveau de
              protection équivalent.
            </p>
            <p style={{ margin: "0px" }}>
              . Examiner les causes de l'incident et vous en informer ;
            </p>
            <p style={{ margin: "0px" }}>
              . Orientator transfère les données personnelles de ses
              Utilisateurs en dehors des pays reconnus par la CNIL comme ayant
              un niveau de protection suffisant : Orientatorr a obtenu une
              autorisation de la CNIL pour procéder à ce transfert.
            </p>
          </div>
          <p className="pmargin purplecolor">
            Pour connaître la liste de ces pays :
            <a
              href="https://www.cnil.fr/fr/la-protection-des-donnees-dans-le-monde"
              target="_blank"
              style={{ textDecoration: "none", color: "rgb(226, 44, 226)" }}
            >
              CNIL - La protection des données dans le monde
            </a>{" "}
          </p>
          <h2>Modification des CGU et de la politique de confidentialité</h2>
          <p className="boldText">
            En cas de modification des présentes CGU, Orientator s’engage à ne
            pas baisser le niveau de confidentialité de manière substantielle
            sans l'information préalable des personnes concernées{" "}
          </p>
          <p className="pmargin">
            Nous nous engageons à vous informer en cas de modification
            substantielle des présentes CGU, et à ne pas baisser le niveau de
            confidentialité de vos données de manière substantielle sans vous en
            informer et obtenir votre consentement
          </p>
          <h2>Droit applicable et modalités de recours</h2>
          <p className="boldText">Clause d'arbitrage </p>
          <p className="pmargin">
            Vous acceptez expressément que tout litige susceptible de naître du
            fait des présentes CGU, notamment de son interprétation ou de son
            exécution, relèvera d'une procédure d'arbitrage soumise au règlement
            de la plateforme d'arbitrage choisie d'un commun accord, auquel vous
            adhérerez sans réserve.
          </p>
          <h2>Portabilité des données</h2>
          <p className="boldText">Portabilité des données</p>
          <p
            className="pmargin"
            style={{ margin: "0px", paddingBottom: "25%" }}
          >
            Orientator s'engage à vous offrir la possibilité de vous faire
            restituer l'ensemble des données vous concernant sur simple demande.
            L'Utilisateur se voit ainsi garantir une meilleure maîtrise de ses
            données, et garde la possibilité de les réutiliser. Ces données
            devront être fournies dans un format ouvert et aisément réutilisable
          </p>
        </div>
      </div>
    </>
  );
};

export default CGU;
