function addElement(value) {
  // tworzenie elementu listy
  var li = document.createElement('li');
  // uzupełnienie nowo utworzonego elementu zdjeciem
  li.innerHTML= `<img src=${value}/>`;
  // wybieram liste z drzewa DOM
  var ul = document.querySelector('ul');
  // dodaj nowo utworzony element do listy
  ul.appendChild(li);
}
// wybieram przycisk z drzewa DOM
var button = document.querySelector('button');
// nasluchiwanie na klikniecie w button
// button.onclick 
button.onclick = function() {
    var API_KEY = '12665188-88beea4d88eecfe9aeae920b6';
    fetch('https://pixabay.com/api/?key='+API_KEY+'&q='+encodeURIComponent('fashion + jewellery + necklace'))
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonData) {
      // sprawdzam czy istnieja dane do wyswietlenia
      if (jsonData.totalHits > 0) {
        jsonData.hits.forEach(function(item) {
         addElement(item.largeImageURL);
         
        });
      } else {
        // dane nie istnieja
        alert('Upppssss...');
      }
    })
    .catch(function(error) {
      // tutaj osblugujemy bledy popelnione w wywolaniu zwrotnym powyzej
      // czyli w funkcji .then(...)
      console.warn('Nasz error:', error);
    });
}
