console.info('Using Reuse Form extension content script');

var savedFormKey = $(".ss-form-title").text();
if (!savedFormKey) {
  console.error("No title found for this form. Unable to save and load data.");
}

var saveButton = $('<input type="button" name="save" value="Save Selections">')
  .on('click', function () {
    var data = $('form').serializeArray();

    // save to localStorage
    localStorage[savedFormKey] = JSON.stringify(data);

    console.info('Saved form data:', JSON.stringify(data, null, 4));
  });

var fillButton = $('<input type="button" name="fill" value="Fill with Saved Selections">')
  .on('click', function () {    
    var data = JSON.parse(localStorage[savedFormKey]);

    var l = data.length;
      while (l--) {
        datum = data[l];
        $('*[name="'+datum.name+'"]').val(datum.value);
      }

    console.info('Filled form with data', data);
  });

// Add save button at 
$('input[type="submit"]').after(saveButton, fillButton);

// Add fill button at top
$('form').before(fillButton);
