<?php
include('connecion.php');
header('Access-Control-Allow-Origin: *'); 

$operacion = $_GET['op'];
switch ($operacion) {

    case "0":
        $email=$_GET['email'];
        $pass = $_GET['pass'];
        $institucion=$_GET['institucion'];
        $direccion=$_GET['direccion'];
        $name=$_GET['name'];
        $lastname=$_GET['lastname'];
        $comuna=$_GET['comuna'];

        $e = getSQLResultSet("SELECT COUNT(id) as ID FROM `upnotice_upnoticer`.`user` WHERE email = '$email';");
        while($er = mysqli_fetch_assoc($e)) {
                if($er['ID'] == 0)
                {
                    $e = getSQLResultSet("INSERT INTO `upnotice_upnoticer`.`user` (`email`, `password`, `name`, `lastname`) 
                    VALUES ('$email','$pass', '$name', '$lastname');");
                    
                    $e = getSQLResultSet("SELECT MAX(id) as id from `upnotice_upnoticer`.`user` ");
                    $rows = array();
                    while($r = mysqli_fetch_assoc($e)) {
                        $iduser = $r['id'];
                    }
                    
                    $e = getSQLResultSet("INSERT INTO `upnotice_upnoticer`.`institution` (`name`, `address`, `comuna`) 
                    VALUES ('$institucion', '$direccion', $comuna);");
                    
                    $e = getSQLResultSet("SELECT MAX(id) as id from `upnotice_upnoticer`.`institution` ");
                    $rows = array();
                    while($r = mysqli_fetch_assoc($e)) {
                        $idInstitucion = $r['id'];
                    }
                    
                    getSQLResultSet("INSERT INTO `upnotice_upnoticer`.`role`(`user_id`, `type`, `institution_id`) 
                    VALUES ($iduser,'0',$idInstitucion);");
                    
                    getSQLResultSet("INSERT INTO `upnotice_upnoticer`.`licence` (`duration`, `institution_id`) VALUES ('1', '$idInstitucion');");

                    $resp['respuesta']="300";
                }
                else{
                    $resp['respuesta']="200";
                }
            }
            echo json_encode($resp);
        break;

    case "99": // Listar Comunas
            $insti = getSQLResultSet("SELECT `id`, `nombre` FROM `comuna`");
            $respuesta = array();
            while($r = mysqli_fetch_assoc($insti)) {
                $respuesta[] = $r;
            }
        echo json_encode($respuesta);

        break;


    case "1":
        $email=$_GET['email'];
        $nombre = $_GET['nombre'];
        $apellido = $_GET['apellido'];
        $dEmail = $_GET['dEmail'];
        $pass = $_GET['pass'];
        $contrato = $_GET['contrato'];
        $e = getSQLResultSet("INSERT INTO `upnotice_upnoticer`.`user` (`email`, `name`, `lastname`) 
        VALUES ('$dEmail', '$name', '$lastname');");
        $e = getSQLResultSet("SELECT MAX(id) as id from `upnotice_upnoticer`.`user` ");
        $rows = array();
        while($r = mysqli_fetch_assoc($e)) {
            $iduser = $r['id'];
        }
        $e = getSQLResultSet("SELECT role.id AS rolID, role.institution_id as instId FROM role, user 
        where role.user_id = user.id AND user.email = '$email' AND role.enable = '1'");
        while($r = mysqli_fetch_assoc($e)) {
            $InId = $r['instId'];
        }
        getSQLResultSet("INSERT INTO `upnotice_upnoticer`.`role`(`user_id`, `type`, `date_contract`, `institution_id`) 
        VALUES ($iduser,'1',$contrato,$idInstitucion);");


          break;
    case "2": //login informacion usuario
        $email=$_GET['email'];
        $pass = $_GET['pass'];
        $respuesta = array();
        $e = getSQLResultSet("SELECT user.id AS userId, user.email AS userEmail, user.name AS userName, user.lastname AS userLast, 
        user.enabled AS userEnable FROM user WHERE user.email = '$email' AND user.password = '$pass' AND user.enabled = '1';");
         while($r = mysqli_fetch_assoc($e)) {
            $respuesta['userId'] = $r['userId'];
            $respuesta['userEmail'] = $r['userEmail'];
            $respuesta['userName'] = $r['userName'];
            $respuesta['userLast'] = $r['userLast'];
            $respuesta['userEnable'] = $r['userEnable'];
        }
        echo json_encode($respuesta);
        $respuesta = null;
        break;

    case "22": //login informacion institucion
        $userId=$_GET['id'];
        $respuesta = array();
        $e = getSQLResultSet("SELECT DISTINCT(institution.id) AS id, institution.name AS name, institution.address AS address 
        FROM institution, role, licence WHERE institution.enabled = '1' AND institution.id = licence.institution_id AND 
        institution.id = role.institution_id AND role.user_id = $userId;");
         while($r = mysqli_fetch_assoc($e)) {
             $respuesta[] = $r;
        }
        echo json_encode($respuesta);
        $respuesta = null;
        break;

    case "222": //login informacion institucion
        $userId=$_GET['userId'];
        $instiId=$_GET['instiId'];
        $respuesta = array();
        $e = getSQLResultSet("SELECT role.id AS id, role.type AS type FROM role WHERE role.enabled = '1' AND 
        role.user_id = $userId AND role.institution_id = $instiId;");
         while($r = mysqli_fetch_assoc($e)) {
             $respuesta[] = $r;
        }
        echo json_encode($respuesta);
        $respuesta = null;
        break;

    case "3": //Agregar Trabasjadores
        $dEmail = $_GET['dEmail'];
        $insitution=$_GET['insitution'];
        $nombre = $_GET['nombre'];
        $apellido = $_GET['apellido'];
        $pass = $_GET['pass'];
        $type = $_GET['type'];
        $contrato = $_GET['contrato'];

        $e = getSQLResultSet("SELECT id FROM `upnotice_upnoticer`.`user` WHERE email = '$dEmail';");
        while($er = mysqli_fetch_assoc($e)) {
            if($er['id'] == null)
            {
                $e = getSQLResultSet("INSERT INTO `upnotice_upnoticer`.`user` (`email`, `password`, `name`, `lastname`) 
                VALUES ('$dEmail',' $pass', '$nombre', '$apellido');");
                $e = getSQLResultSet("SELECT MAX(id) as id from `upnotice_upnoticer`.`user` ");
                $rows = array();
                while($r = mysqli_fetch_assoc($e)) {
                    $iduser = $r['id'];
                }
                getSQLResultSet("INSERT INTO `upnotice_upnoticer`.`role`(`user_id`, `type`, `date_contract`, `institution_id`) 
                VALUES ($iduser,$type,'$contrato',$insitution);");
                $resp['respuesta']= "200";
            }else{
                $i = $er['id'];
                $r = getSQLResultSet("SELECT COUNT(id) AS ID FROM role WHERE role.user_id = $i AND role.type = $type AND role.enabled = '1';");
                while($re = mysqli_fetch_assoc($r)) {
                    if($re['ID'] == 0)
                    {
                        getSQLResultSet("INSERT INTO `upnotice_upnoticer`.`role`(`user_id`, `type`, `date_contract`, `institution_id`) 
                        VALUES ($i,$type,'$contrato',$insitution);");
                        $resp['respuesta']= "3";
                    }else{
                        $resp['respuesta']= "400";
                    }
                }
            }
        }
        echo json_encode($resp);
          break;
}
?>
