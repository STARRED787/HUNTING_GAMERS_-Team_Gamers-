<?php
//php code for Login page
error_reporting(0);

$servername="localhost"; //local host default
$username="root"; //root is default
$password="";
$dbname="hunting_gamers_db"; //created database in php admin

$check= mysqli_connect($servername, $username, $password, $dbname );

if ($check) {
    //echo "Connection OK <br> <br>" ;
}
else {
    echo "Connection Faild";
}

$email=$_POST['email_login'];
$pass =$_POST['pass_login'];
$data="SELECT * FROM registration_tb WHERE Email='$email' AND Password='$pass'";
$execute=mysqli_query($check,$data);
$count=mysqli_num_rows($execute);
if ($count>=1) {
   header("location:log.html");
}
else {
    $linkUrl = "http://localhost/MIT22043WebApplicationDevelopment%20WebSiteGroupAssignment(Gamers%20Group)/Loging%20page/HuntingGamersLoging.html";
    $destination = "Return to Login page";
    echo " <script>alert('Your Enter Password or Email is Wrong please cheack it and Try Again !')</script> <br> ";
    echo "<a href='$destination'>$linkText</a>";
}
?>

