<?php
include('connecion.php');
header('Access-Control-Allow-Origin: *'); 

$operacion = $_GET['op'];


switch ($operacion) {

    case "0":
            $instiID=$_GET['institution'];
            
            $insti = getSQLResultSet("SELECT COUNT(`id`) as teachers 
            FROM role WHERE role.institution_id = '$instiID' AND role.type = 1;");
            $rows = array();
            while($r = mysqli_fetch_assoc($insti)) {
                $respuesta['teachers'] = $r['teachers'];
            }

            $insti = getSQLResultSet("SELECT COUNT(student.id) as students FROM student, grade 
            WHERE student.grade_id = grade.id AND grade.institution_id = '$instiID' AND student.enabled = '1'");
            $rows = array();
            while($r = mysqli_fetch_assoc($insti)) {
                $respuesta['students'] = $r['students'];
            }
            $insti = getSQLResultSet("SELECT COUNT(student.id) as students FROM student, grade, role, relationship 
            WHERE student.grade_id = grade.id AND grade.institution_id = '$instiID' AND student.enabled = '1'
             AND student.id = relationship.student_id AND relationship.role_id = role.id");
            $rows = array();
            while($r = mysqli_fetch_assoc($insti)) {
                $respuesta['apoderado'] = $r['students'];
            }

            $insti = getSQLResultSet("SELECT COUNT(id) as psicos FROM `role` 
            WHERE institution_id = '$instiID' AND type = '2' AND enable = '1';");
            $rows = array();
            while($r = mysqli_fetch_assoc($insti)) {
                $respuesta['psicos'] = $r['psicos'];
            }

            $insti = getSQLResultSet("SELECT COUNT(id) as psicopes FROM `role` 
            WHERE institution_id = '$instiID' AND type = '3' AND enable = '1';");
            $rows = array();
            while($r = mysqli_fetch_assoc($insti)) {
                $respuesta['psicopes'] = $r['psicopes'];
            }
        
        echo json_encode($respuesta);
        $respuesta = null;
        //return  json_encode($respuesta);
        break;




    case 1: //
            $instiID=$_GET['institution'];
            $insti = getSQLResultSet("SELECT institution.name, institution.address 
            FROM institution WHERE institution.id = '$instiID'");
            $rows = array();
            while($r = mysqli_fetch_assoc($insti)) {
                $respuesta['instiName'] = $r['name'];
                $respuesta['instiAddress'] = $r['address'];
            }
        echo json_encode($respuesta);
        $respuesta = null;

        break;


    case 2:
        $e = getSQLResultSet("SELECT role.id AS rolID, role.institution_id as instId FROM role, user 
        where role.user_id = user.id AND user.email = '$email' AND role.enable = '1'");
        $rows = array();
        $respuesta = array();
        while($r = mysqli_fetch_assoc($e)) {
            $InId = $r['instId'];
            $insti = getSQLResultSet("SELECT phone.phone AS phono FROM phone 
            WHERE phone.institution_id = '$InId';");
            $rows = array();
            while($r = mysqli_fetch_assoc($insti)) {
                $respuesta[] = $r;
            }
        }
        echo json_encode($respuesta);
        $respuesta = null;

        break;

    case 3:
        $instiID=$_GET['institution'];
        $nombre = $_GET['nombre'];
        $direccion = $_GET['direccion'];
            $ex = getSQLResultSet("UPDATE `upnoticer`.`institution` SET name='$nombre',address='$direccion' WHERE `id` = $instiID;");
        break;
        
        
    case 4://insertar telefonos
        $institucion=$_GET['institucion'];
        $telefono=$_GET['telefono'];
        $e = getSQLResultSet("INSERT INTO `upnoticer`.`phone`(`institution_id`, `phone`) VALUES ($institucion,'$telefono');");
        break;


    case 5://Listar Docentes

        $insitucion = $_GET['institucion'];
        $respuesta = array();
        $ex = getSQLResultSet("SELECT user.name AS nombre, user.lastname as apellido, user.id AS userId FROM user, role 
        WHERE role.institution_id = '$insitucion' AND role.type = 1 AND user.id = role.user_id;");
        while($m = mysqli_fetch_assoc($ex)) {
            $respuesta[] = $m;
        }
        echo json_encode($respuesta);
        $respuesta = null;

        break;


    case 6:
        //quitar Telefonos
        $institucion=$_GET['institucion'];
        $telefono=$_GET['telefono'];
        $telefonos = array();
        $e = ejecutarSQLCommand("DELETE FROM `upnoticer`.`phone` WHERE `institution_id`= '$institucion' AND `phone` ='$telefono';");
        echo json_encode("Eliminado $telefono");
        break;

    case 7://Listar Docentes Sin Cursos Asignados

        $insitucion = $_GET['institucion'];
        $respuesta = array();
        $ex = getSQLResultSet("SELECT user.name AS nombre, user.lastname as apellido, role.id AS userId FROM user, role 
        WHERE role.institution_id = '$insitucion' AND role.type = 1 AND user.id = role.user_id AND role.id 
        not in (select grade.teacher from grade where grade.institution_id = $insitucion AND grade.enabled = 1);");
        while($m = mysqli_fetch_assoc($ex)) {
            $respuesta[] = $m;
        }
        echo json_encode($respuesta);
        $respuesta = null;

        break;

    case 8://Agregar Cursos
        $insitucion = $_GET['insitution'];
        $nivel=$_GET['nivel'];
        $identificador=$_GET['identificador'];
        $profesor=$_GET['profesor'];
        $respuesta = array();
        $e = getSQLResultSet("SELECT COUNT(id) AS ID FROM grade WHERE `name`= '$nivel' AND `identifier` = '$identificador' AND `institution_id` = $insitucion ;");
        while($m = mysqli_fetch_assoc($e)) {
            if($m['ID'] == 0)
            {
                $e = getSQLResultSet("INSERT INTO `upnoticer`.`grade` (`name`, `identifier`, `institution_id`, `teacher`) 
                VALUES ('$nivel','$identificador',$insitucion,$profesor);");
                $e = getSQLResultSet("SELECT MAX(id) AS id FROM grade WHERE grade.institution_id = $insitucion;");
                while($m = mysqli_fetch_assoc($e)) {
                    $respuesta['id'] = $m['id'];
                }
                
            }else{
                $respuesta['id']="Error 200";
            }
        }
        echo json_encode($respuesta);
        break;

    case 88://Agregar Alumno a curso 
        $curso = $_GET['curso'];
        $nombre=$_GET['nombre'];
        $apellido=$_GET['apellido'];
        $e = getSQLResultSet("INSERT INTO `upnoticer`.`student` (`name`, `lastName`, `grade_id`) 
        VALUES ('$nombre', '$apellido', $curso);");
        $respuesta['resultado']="Inserto, eso creo";
        echo json_encode($respuesta);
        break;
    
}

