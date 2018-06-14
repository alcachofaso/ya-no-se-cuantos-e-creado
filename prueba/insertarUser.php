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

        $e = getSQLResultSet("SELECT COUNT(id) as ID FROM `upnoticer`.`user` WHERE email = '$email';");
        while($er = mysqli_fetch_assoc($e)) {
                if($er['ID'] == 0)
                {
                    $e = getSQLResultSet("INSERT INTO `upnoticer`.`user` (`email`, `password`, `name`, `lastname`) 
                    VALUES ('$email',' $pass', '$name', '$lastname');");
                    
                    $e = getSQLResultSet("SELECT MAX(id) as id from `upnoticer`.`user` ");
                    $rows = array();
                    while($r = mysqli_fetch_assoc($e)) {
                        $iduser = $r['id'];
                    }
                    
                    $e = getSQLResultSet("INSERT INTO `upnoticer`.`institution` (`name`, `address`, `comuna`) 
                    VALUES ('$institucion', '$direccion', $comuna);");
                    
                    $e = getSQLResultSet("SELECT MAX(id) as id from `upnoticer`.`institution` ");
                    $rows = array();
                    while($r = mysqli_fetch_assoc($e)) {
                        $idInstitucion = $r['id'];
                    }
                    
                    getSQLResultSet("INSERT INTO `upnoticer`.`role`(`user_id`, `type`, `institution_id`) 
                    VALUES ($iduser,'0',$idInstitucion);");
                    
                    getSQLResultSet("INSERT INTO `upnoticer`.`licence` (`duration`, `institution_id`) VALUES ('1', '$idInstitucion');");

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
        $e = getSQLResultSet("INSERT INTO `upnoticer`.`user` (`email`, `name`, `lastname`) 
        VALUES ('$dEmail', '$name', '$lastname');");
        $e = getSQLResultSet("SELECT MAX(id) as id from `upnoticer`.`user` ");
        $rows = array();
        while($r = mysqli_fetch_assoc($e)) {
            $iduser = $r['id'];
        }
        $e = getSQLResultSet("SELECT role.id AS rolID, role.institution_id as instId FROM role, user 
        where role.user_id = user.id AND user.email = '$email' AND role.enable = '1'");
        while($r = mysqli_fetch_assoc($e)) {
            $InId = $r['instId'];
        }
        getSQLResultSet("INSERT INTO `upnoticer`.`role`(`user_id`, `type`, `date_contract`, `institution_id`) 
        VALUES ($iduser,'1',$contrato,$idInstitucion);");


          break;
    case "2": //login
        $email=$_GET['email'];
        $pass = $_GET['pass'];
        $respuesta = array();
        $e = getSQLResultSet("SELECT user.id AS userId, user.email AS userEmail, user.name AS userName,
         user.lastname AS userLast, user.enabled AS userEnable, role.id AS rolId, role.type AS roleType, 
         role.enabled AS roleEnable, institution.id AS institucionId, institution.name AS intitutionName, 
         institution.address AS institutionAddress, institution.enabled AS intitutionEnable, 
         DATE(licence.origin) AS inicioLicencia, licence.duration AS duracionLicence 
         FROM `upnoticer`.`user`, `upnoticer`.`role`, `upnoticer`.`institution`, `upnoticer`.`licence` 
         WHERE user.email = '$email' AND user.password = ' $pass' AND user.enabled = '1' AND user.id = role.user_id AND 
         institution.id = role.institution_id AND licence.institution_id = institution.id;");
         while($r = mysqli_fetch_assoc($e)) {
            $respuesta['userId'] = $r['userId'];
            $respuesta['userEmail'] = $r['userEmail'];
            $respuesta['userName'] = $r['userName'];
            $respuesta['userLast'] = $r['userLast'];
            $respuesta['userEnable'] = $r['userEnable'];
            $respuesta['rolId'] = $r['rolId'];
            $respuesta['roleType'] = $r['roleType'];
            $respuesta['roleEnable'] = $r['roleEnable'];
            $respuesta['institucionId'] = $r['institucionId'];
            $respuesta['intitutionName'] = $r['intitutionName'];
            $respuesta['institutionAddress'] = $r['institutionAddress'];
            $respuesta['intitutionEnable'] = $r['intitutionEnable'];
            $respuesta['inicioLicencia'] = $r['inicioLicencia'];
            $respuesta['duracionLicence'] = $r['duracionLicence'];
        }
        echo json_encode($respuesta);
        $respuesta = null;
        break;

    case "3": //Agregar Trabasjadores
        $dEmail = $_GET['dEmail'];
        $e = getSQLResultSet("SELECT COUNT(id) as ID FROM `upnoticer`.`user` WHERE email = '$dEmail';");
        while($er = mysqli_fetch_assoc($e)) {
            if($er['ID'] == 0)
            {
                $insitution=$_GET['insitution'];
                $nombre = $_GET['nombre'];
                $apellido = $_GET['apellido'];
                $pass = $_GET['pass'];
                $type = $_GET['type'];
                $contrato = $_GET['contrato'];
                $e = getSQLResultSet("INSERT INTO `upnoticer`.`user` (`email`, `password`, `name`, `lastname`) 
                VALUES ('$dEmail',' $pass', '$nombre', '$apellido');");
                $e = getSQLResultSet("SELECT MAX(id) as id from `upnoticer`.`user` ");
                $rows = array();
                while($r = mysqli_fetch_assoc($e)) {
                    $iduser = $r['id'];
                }
                getSQLResultSet("INSERT INTO `upnoticer`.`role`(`user_id`, `type`, `date_contract`, `institution_id`) 
                VALUES ($iduser,$type,'$contrato',$insitution);");
                $resp['respuesta']= "200";
            }else{
                $resp['respuesta']= "300";
            }
        }
        echo json_encode($resp);
          break;
}
?>
