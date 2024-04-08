<?php 
//php code for registration page
error_reporting(0);

$servername="localhost"; //local host default
$username="root"; //root is default
$password="";
$dbname="hunting_gamers_db"; //created database in php admin

$cheack= mysqli_connect($servername, $username, $password, $dbname );

if ($cheack) {
    //echo "Connection OK <br> <br> Congtratulations !" ;
}
else {
    echo "Connection Faild";
}

//getting html values
$username_2= $_POST['username'];
$email= $_POST['email'];
$pass= $_POST['Password'];

//html values add to databse
$data= "INSERT INTO registration_tb VALUES('$username_2', '$email','$pass')";

//cheak database values add
$execute = mysqli_query($cheack,$data);

if ($execute) {
    header("location:reg.html");
}
else{
    $linkUrl = "http://localhost/MIT22043WebApplicationDevelopment%20WebSiteGroupAssignment(Gamers%20Group)/Registraion%20page/HuntingGamersRegistraion.html";
    $linkText = "Return to Registration page";
    echo " <script>alert('Data not send somthing wrong please cheak!')</script> <br><a href=\"$targetUrl\">$linkText</a>";
}
?>