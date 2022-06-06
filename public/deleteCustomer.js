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
         if (table.rows[i].getAttribute("data-value") == customer_id) {
              table.deleteRow(i);
              break;
         }
      }
  }