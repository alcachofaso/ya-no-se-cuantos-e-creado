<?php 

header('Access-Control-Allow-Origin: *'); 
date_default_timezone_set("Chile/Continental");


$operacion = $_GET['op'];
$email = $_GET['email'];
$pass = $_GET['pass'];
$type = $_GET['type'];
$tipo = "";

switch ($type) {

    case 0:$tipo = "Administrador";
        break;
    case 1:$tipo = "Docente";
        break;
    case 2:$tipo = "Psicologo";
        break;
    case 3:$tipo = "Psicopedagogo/Orientador";
        break;
}

switch ($operacion) {

    case 0:
        $subject = "Cuenta Creada";
        $message = "Se a creado una cuenta de tipo $tipo \n".
                "Para ingresar, dirigete a www.upnoticer.com\n".
                "una vez ahí, ve al apartado \"Login\" y autentificate con tu correo y contraseña\n\n".
                "Contraseña : $pass\n\n\n\n".
                "Este correo se ha generado de manera automática.";
        break;
    case 1:
        $subject = "Contraseña Actualizada";
        $message = "La contraseña para su cuenta de tipo $tipo a sido actualizada\n".
                "Su nueva contraseña es : $pass\n\n\n\n".
                "Este correo se ha generado de manera automática.";
        break;
}

    ini_set( 'display_errors', 1 );
    error_reporting( E_ALL );
    $from = "support@upnoticer.com";
    $to = $email;
    $headers = "From:" . $from;
    mail($to,$subject,$message, $headers);
    echo "The email message was sent.";

?>