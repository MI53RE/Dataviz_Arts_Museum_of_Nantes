$(document).ready(function() {
   var ongletActuel = null;
   ongletActuel = $('.tabs-onglets a:first').attr('href');

   // Ajout de classe au premier onglet
   $('.tabs-onglets').find('a[href="'+ ongletActuel +'"]').addClass('selected');

   // Afficher l'élément par défaut correspondant à celui de l'onglet par défaut
   $(ongletActuel).show().siblings().hide();

   // Gestion de l'événement clic
   $('.tabs-onglets a').click(function(e) {
      idOnglet = $(this).attr('href');

      // Si l'élément est déjà sélectionné, ne rien faire
      if (idOnglet == ongletActuel)
         e.preventDefault();
      else {
         // Afficher le contenu demandé et masquer le contenu restant
         $(idOnglet).fadeIn().siblings().hide();

         // Retirer la classe des autres onglets et l'ajouter sur l'élément sélectionné
         $(this).addClass('selected').siblings().removeClass('selected');
         ongletActuel = idOnglet;
      }

      // Empêche le déclenchement du lien
      e.preventDefault();
   });
});