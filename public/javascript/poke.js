var totalPrice = 0;
var sizesPicked = 0;
var basesPicked = 0;
var meatsPicked = 0;
var toppingsPicked = 0;
var saucesPicked = 0;



$(".card-body.size").on("click", ".clicked-item-size", function(){
   var name = $(this).find("#name").text();
   var idName = "cs-" + $(this).find("#name").text().replace(/\s+/g, '');
   if(sizesPicked === 0){
      $(".create-section-size").append( "<p class='card-text p-no-margin' id='" + idName + "'>- " + name + "</p>" );
      $(this).find("i").toggleClass("d-none");
      totalPrice += parseFloat($(this).find("#price").text());
      sizesPicked++;
   } else if(!$(this).find("i").hasClass("d-none")){
      $("p").remove("#" + idName);
      $(this).find("i").toggleClass("d-none");
      totalPrice -= parseFloat($(this).find("#price").text());
      sizesPicked--;
   } else {
      $(".clicked-item-size").each(function(){
         if(!$(this).find("i").hasClass("d-none")){
            $(this).find("i").toggleClass("d-none");
            totalPrice -= parseFloat($(this).find("#price").text());
         } else {
            $(this).find("i").toggleClass("d-none");
            totalPrice += parseFloat($(this).find("#price").text());
         }
      });
      $(".create-section-size").empty();
      $(".create-section-size").append( "<p class='card-text p-no-margin' id='" + idName + "'>- " + name + "</p>" );
   }
   setSizeForm();
   $("#total-price").text("$" + Math.round(100*totalPrice)/100);
   setPriceForm();
});

$(".card-body.base").on("click", ".clicked-item-base", function(){
   var name = $(this).find("#name").text();
   var idName = "cs-" + $(this).find("#name").text().replace(/\s+/g, '');
   if(basesPicked === 0){
      $(".create-section-base").append( "<p class='card-text p-no-margin' id='" + idName + "'>- " + name + "</p>" );
      $(this).find("i").toggleClass("d-none");
      totalPrice += parseFloat($(this).find("#price").text());
      basesPicked++;
   } else if(basesPicked == 1){
      if(!$(this).find("i").hasClass("d-none")){
         $("p").remove("#" + idName);
         $(this).find("i").toggleClass("d-none");
         totalPrice -= parseFloat($(this).find("#price").text());
         basesPicked--;
      } else {
         $(".create-section-base").append( "<p class='card-text p-no-margin' id='" + idName + "'>- " + name + "</p>" );
         $(this).find("i").toggleClass("d-none");
         totalPrice += parseFloat($(this).find("#price").text()) + 2;
         basesPicked++;
      }
   } else if(!$(this).find("i").hasClass("d-none")){
      $("p").remove("#" + idName);
      $(this).find("i").toggleClass("d-none");
      totalPrice -= parseFloat($(this).find("#price").text()) + 2;
      basesPicked--;
   } else {
      $(".create-section-base").append( "<p class='card-text p-no-margin' id='" + idName + "'>- " + name + "</p>" );
      $(this).find("i").toggleClass("d-none");
      totalPrice += parseFloat($(this).find("#price").text()) + 2;
      basesPicked++;
   }
   setBaseForm();
   $("#total-price").text("$" + Math.round(100*totalPrice)/100);
   setPriceForm();
});

$(".card-body.meat").on("click", ".clicked-item-meat", function(){
   var name = $(this).find("#name").text();
   var idName = "cs-" + $(this).find("#name").text().replace(/\s+/g, '');
   var size = whatSize();
   if(!!$(this).find("i").hasClass("d-none")){
      if(meatsPicked < size){
         $(".create-section-meat").append( "<p class='card-text p-no-margin' id='" + idName + "'>- " + name + "</p>" );
         $(this).find("i").toggleClass("d-none");
         totalPrice += parseFloat($(this).find("#price").text());
         meatsPicked++;
      }
   } else {
      $("p").remove("#" + idName);
      $(this).find("i").toggleClass("d-none");
      totalPrice -= parseFloat($(this).find("#price").text());
      meatsPicked--;
   }
   setMeatForm();
   $("#total-price").text("$" + Math.round(100*totalPrice)/100);
   setPriceForm();
});

$(".card-body.toppings").on("click", ".clicked-item-toppings", function(){
   var name = $(this).find("#name").text();
   var idName = "cs-" + $(this).find("#name").text().replace(/\s+/g, '');
   if(!!$(this).find("i").hasClass("d-none")){
      if(toppingsPicked >= 3){
         totalPrice += 2;
      }
      $(".create-section-toppings").append( "<p class='card-text p-no-margin' id='" + idName + "'>- " + name + "</p>" );
      $(this).find("i").toggleClass("d-none");
      totalPrice += parseFloat($(this).find("#price").text());
      toppingsPicked++;
   } else {
      if(toppingsPicked > 3){
         totalPrice -= 2;
      } 
      $("p").remove("#" + idName);
      $(this).find("i").toggleClass("d-none");
      totalPrice -= parseFloat($(this).find("#price").text());
      toppingsPicked--;
   }
   setToppingsForm();
   $("#total-price").text("$" + Math.round(100*totalPrice)/100);
   setPriceForm();
});

$(".card-body.sauce").on("click", ".clicked-item-sauce", function(){
   var name = $(this).find("#name").text();
   var idName = "cs-" + $(this).find("#name").text().replace(/\s+/g, '');
   if(!!$(this).find("i").hasClass("d-none")){
      if(saucesPicked >= 1){
         totalPrice += 0.5;
      } 
      $(".create-section-sauce").append( "<p class='card-text p-no-margin' id='" + idName + "'>- " + name + "</p>" );
      $(this).find("i").toggleClass("d-none");
      saucesPicked++;
   } else {
      if(saucesPicked > 1){
         totalPrice -= 0.5;
      } 
      $("p").remove("#" + idName);
      $(this).find("i").toggleClass("d-none");
      saucesPicked--;
   }
   setSauceForm();
   $("#total-price").text("$" + Math.round(100*totalPrice)/100);
   setPriceForm();
});


function getSize(){
   var size = [];
   $(".create-section-size").find("p").each(function(){
      size.push($(this).text());
   });
   return size;
}

function setSizeForm(){
   var size = getSize();
   $(".form-section-size").empty();
   size.forEach(function(size){
      $(".form-section-size").append( "<input class='form-control' type='text' name='menuItem[size]' value='" + size + "' style='display: none;'>");
   });
}

function getBase(){
   var base = [];
   $(".create-section-base").find("p").each(function(){
      base.push($(this).text());
   });
   return base;
}

function setBaseForm(){
   var base = getBase();
   $(".form-section-base").empty();
   base.forEach(function(base){
      $(".form-section-base").append( "<input class='form-control' type='text' name='menuItem[base]' value='" + base + "' style='display: none;'>");
   });
}

function getMeat(){
   var meat = [];
   $(".create-section-meat").find("p").each(function(){
      meat.push($(this).text());
   });
   return meat;
}

function setMeatForm(){
   var meat = getMeat();
   $(".form-section-meat").empty();
   meat.forEach(function(meat){
      $(".form-section-meat").append( "<input class='form-control' type='text' name='menuItem[meat]' value='" + meat + "' style='display: none;'>");
   });
}

function getToppings(){
   var toppings = [];
   $(".create-section-toppings").find("p").each(function(){
      toppings.push($(this).text());
   });
   return toppings;
}

function setToppingsForm(){
   var toppings = getToppings();
   $(".form-section-toppings").empty();
   toppings.forEach(function(toppings){
      $(".form-section-toppings").append( "<input class='form-control' type='text' name='menuItem[toppings]' value='" + toppings + "' style='display: none;'>");
   });
}

function getSauce(){
   var sauce = [];
   $(".create-section-sauce").find("p").each(function(){
      sauce.push($(this).text());
   });
   return sauce;
}

function setSauceForm(){
   var sauce = getSauce();
   $(".form-section-sauce").empty();
   sauce.forEach(function(sauce){
      $(".form-section-sauce").append( "<input class='form-control' type='text' name='menuItem[sauce]' value='" + sauce + "' style='display: none;'>");
   });
}

function setPriceForm(){
   $(".form-section-price").empty();
   $(".form-section-price").append( "<input class='form-control' type='text' name='menuItem[price]' value='" + totalPrice + "' style='display: none;'>");
}

//submit poke to favorites

function whatSize(){
   $(".clicked-item-size").each(function(){
      if(!$(this).find("i").hasClass("d-none")){
         if($(this).find("#name").text() === "Regular"){
            size = 2;
         } else {
            size = 3;
         }
      }
   });
   return size;
}

(function($) {
    var $window = $(window),
       $poke = $('.poke-card');

    function resize() {
       if ($window.width() < 577) {
            return $poke.removeClass('poke-card-fix');
       }

       $poke.addClass('poke-card-fix');
    }

    $window
       .resize(resize)
       .trigger('resize');
})(jQuery);

// var x = 0;

// $(".card").each(function(){
//    alert(x++);
// });

