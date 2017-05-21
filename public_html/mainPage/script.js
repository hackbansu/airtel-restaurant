/**
 * Created by hackbansu on 20/5/17.
 */

var conn = io();

$(function () {
    let addBtn = $('#addBtn');
    let p_name = $('#p_name');
    let category = $('#category');
    let available_quantity = $('#available_quantity');
    let vat = $('#vat');
    let price = $('#price');
    let time_per_order = $('#time_per_order');
    let queuedOrders = $('#queuedOrders');

    let remBtn = $('#remBtn');
    let p_name_remove = $('#p_name_remove');


    conn.on("new_conn", function (data) {
        console.log(data);
        data.forEach(function (item) {
            $('#chat').append("<li>" + item.name + ": " + item.msg + "</li>")
        })
    })
    conn.emit("myevent", name);
    conn.on("newOrder", function (data) {
        $('#ordersList').append("<li>" + data.p_name + ": " + data.quantity + "</li>");
    })

    addBtn.click(function (ev) {
        let p_nameVal = p_name.val();
        let categoryVal = category.val();
        let available_quantityVal = available_quantity.val();
        let vatVal = vat.val();
        let priceVal = price.val();
        let time_per_orderVal = time_per_order.val();
        let queuedOrdersVal = queuedOrders.val();

        $.post('/adminTasks/addNewItem', {
            item: {
                p_name: p_nameVal,
                category: categoryVal,
                available_quantity: available_quantityVal,
                vat: vatVal,
                price: priceVal,
                time_per_order: time_per_orderVal,
                queuedOrders: queuedOrdersVal,
            }
        }, function (data) {
            console.log(data)
        })
    })

    remBtn.click(function (ev) {
        let p_name_removeVal = p_name_remove.val();
        $.post('/adminTasks/removeItem', {
            item: {
                p_name: p_name_removeVal,
            },
        }, function (data) {
            console.log(data)
        })
    })

})
