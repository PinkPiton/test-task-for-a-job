let paths = [
  "https://qoldau.kz",
  "https://finsec.kz",
  "https://kezekte.kz",
  "https://gosreestr.kz",
  "https://e-qazyna.kz",
  "https://n7.kz",
];

function checkOnline(url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      dataType: "jsonp",
      statusCode: {
        200: function () {
          console.log(url + " is online");
          resolve(true);
        },
        404: function () {
          console.log(url + " is offline");
          resolve(false);
        },
      },
    });
  });
}

async function createCardsForOnlineUrls() {
  for (const url of paths) {
    console.log("Checking status for: " + url);
    if (await checkOnline(url)) {
      const title = url.replace(/^https:\/\//, "");
      const description = "Some description of the card";
      createCard(title, description, "card");
    } else {
      const title = url.replace(/^https:\/\//, "");
      const description = "Some description of the card";
      createCard(title, description, "card-disabled");
    }
  }
}

function createCard(title, description, className) {
  const $card = $("<div>").addClass(className);
  const $title = $("<h1>").text(title);
  const $description = $("<p>").text(description);

  $card.append($title, $description);
  console.log("creating a card..");
  $(".cards").append($card);
}

createCardsForOnlineUrls();
