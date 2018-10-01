//  data array for filling in info box
var addressData = [];
var keycloak = new Keycloak();

// DOM Ready =============================================================
$(document).ready(function() {

  

    var url = "http://localhost:8080/addressbook/addressbook";

    keycloakInit();

       // Add User button click
    $('#nav-user-info-btn').on('click', showUserProfile);


    // Populate the user table on initial page load
    //populateTable(url);

    // Username link click
    // $('#userList table tbody').on('click', 'td a.linkshowuser',
    // showUserInfo);

    // Add User button click
    // $('#btnAddUser').on('click', addUser);

    // Delete User link click
    // $('#userList table tbody').on('click', 'td a.linkdeleteuser',
    // deleteUser);

});

function keycloakInit(){
  keycloak.init({ onLoad: 'check-sso', checkLoginIframeInterval: 1 }).success(function () {
      if (keycloak.authenticated) {
        $('#nav-login-btn').hide();
        $('#nav-logout-btn').show();
        $('#nav-user-info-btn').show();
      } else {
        $('#nav-login-btn').show();
        $('#nav-logout-btn').hide();
        $('#nav-user-info-btn').hide();
      }

      document.body.style.display = 'block';
  });
}

function isAuthenticated(){
    return keycloak.authenticated;
}



function showUserProfile(){
    if (isAuthenticated){
        //
        //keycloak.tokenParsed['preferred_username'];
        keycloak.loadUserProfile().success(function(profile) {
            //alert(JSON.stringify(test, null, "  "));
           var profileInfo = '<div class="card" style="margin-top:60px">' + 
             '<div class="card-body">' +
             '<p>profile.username: ' + profile.username + '</p>' +
             '<p>profile.emailVerified: ' + profile.emailVerified +
             '</p> <br/> <p> attributes (JSON):  '+ JSON.stringify(profile.attributes) + 
             '</p><p> has super-user role: ' + keycloak.hasRealmRole("super-user") +
             '</p>'+
             '<p> has simple-user role: ' + keycloak.hasRealmRole("simple-user") +
             '</p>' + 
             '</div></div>'
            $('#addressList').html(profileInfo);
        })
        // 
    }
}


// Fill table with data
function populateTableAddresses(url) {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON(url, function(json) {
        // if ( json.length == 0 ) {
        // console.log("NO DATA!");
        // }

        // Stick our user data array into a userlist variable in the global
        // object
        addressData = json;

      //  console.log("addressData: " + addressData);

        // For each item in our JSON, add a table row and cells to the content
        // string
        $.each(addressData, function(i, address) {

            tableContent += '<tr>';
            tableContent += '<th scope="row">' + address.id + '</th>';
            tableContent += '<td>' + address.name + '</td>';
            tableContent += '<td>' + address.phone + '</td>';

            tableContent += '</tr>';
        });
        var thead = "<tr>" +

        '<th scope="col">#</th>' +
        '<th scope="col">NAME</th>' +
        '<th scope="col">PHONE</th>' +
       '</tr>';

        $('#addressList table thead').html(thead);
        var tbody = $('#addressList table tbody');
        //console.log("tbody class: " + tbody.attr("id") + " val: " + tbody.html());
        //console.log("tableContent: " + tableContent);
        // Inject the whole content string into our existing HTML table
        tbody.html(tableContent);

    });
};
