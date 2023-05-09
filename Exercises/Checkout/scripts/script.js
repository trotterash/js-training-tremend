/**
 * Here you have access to:
 * employees,
 * items,
 * orders
 *
 * Return final_prices
 */

final_prices = [];

function calculateFinalPrices() {
  var final_prices = [];
  
  // iterate through each order
  for (var i = 0; i < orders.length; i++) {
    var order = orders[i];
    var total_cost = 0;
    
    // iterate through each item in the order
    for (var j = 0; j < order.items.length; j++) {
      var item = order.items[j];
      
      // find the cost of the item and add it to the total cost of the order
      for (var k = 0; k < items.length; k++) {
        if (items[k].code === item.item) {
          total_cost += items[k].cost * item.quantity;
          break;
        }
      }
    }
    
    // apply employee discount if employee is specified
    if (order.employee) {
      var employee = null;
      
      for (var l = 0; l < employees.length; l++) {
        if (employees[l].id === order.employee) {
          employee = employees[l];
          break;
        }
      }
      
      if (employee) {
        var discount = employee.discount;
        
        if (discount < 0 || discount > 70) {
          final_prices.push({ order_id: order.id, cost: false });
        } else {
          total_cost = total_cost - (total_cost * discount / 100);
          final_prices.push({ order_id: order.id, cost: total_cost });
        }
      } else {
        final_prices.push({ order_id: order.id, cost: false });
      }
    } else {
      final_prices.push({ order_id: order.id, cost: total_cost });
    }
  }
  
  return final_prices;
}

console.log(calculateFinalPrices());
final_prices = calculateFinalPrices();
