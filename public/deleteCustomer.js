function deleteCustomer(customer_id) {
    let link = '/delete-customer-ajax';
    let data = {
      id: customer_id
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(customer_id);
      }
    });
  }
  
  function deleteRow(customer_id){
      let table = document.getElementById("table-div");
      for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
         if (table.rows[i].getAttribute("data-value") == customer_id) {
              table.deleteRow(i);
              deleteDropDownMen(customer_id);
              break;
         }
      }
  }

  function deleteDropDownMenu(customer_id){
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(customer_id)){
        selectMenu[i].remove();
        break;
      } 
    }
  }
