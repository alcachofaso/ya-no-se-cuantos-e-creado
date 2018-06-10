<?php 
header ('Content-type: text/html; charset=utf-8');


function ejecutarSQLCommand($commando){
 
  $mysqli = new mysqli("localhost", "root", "", "upnoticer");
  
$mysqli->query("SET NAMES 'utf8'"); 
$mysqli->query("SET CHARACTER SET utf8");  
$mysqli->query("SET SESSION collation_connection = 'utf8_unicode_ci'"); 
/* check connection */
if ($mysqli->connect_error) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
echo li;
    exit();
}

if ( $mysqli->multi_query($commando)) {
     if ($resultset = $mysqli->store_result()) {
    	while ($row = $resultset->fetch_array(MYSQLI_BOTH)) {
        echo listo;
    	}
    	$resultset->free();
     }
}



$mysqli->close();
}

function getSQLResultSet($commando){
 
 
  $mysqli = new mysqli("localhost", "root", "", "upnoticer");
  
  $mysqli->query("SET NAMES 'utf8'"); 
$mysqli->query("SET CHARACTER SET utf8");  
$mysqli->query("SET SESSION collation_connection = 'utf8_unicode_ci'"); 

/* check connection */
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}

if ( $mysqli->multi_query($commando)) {
	return $mysqli->store_result();
}
$mysqli->close();
}

function execute($commando){
 
 
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "upnoticer";

    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 

    $sql = $commando;

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>