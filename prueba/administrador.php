<?php
include('connecion.php');
header('Access-Control-Allow-Origin: *'); 

$operacion = $_GET['op'];


switch ($operacion) {

    case "0":
            $instiID=$_GET['institution'];
            
            $insti = getSQLResultSet("SELECT COUNT(`id`) as teachers 
            FROM role WHERE role.institution_id = '$instiID' AND role.type = 1 AND role.enabled = 1;");
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
            WHERE institution_id = '$instiID' AND type = '2' AND enabled = '1';");
            $rows = array();
            while($r = mysqli_fetch_assoc($insti)) {
                $respuesta['psicos'] = $r['psicos'];
            }

            $insti = getSQLResultSet("SELECT COUNT(id) as psicopes FROM `role` 
            WHERE institution_id = '$instiID' AND type = '3' AND enabled = '1';");
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
        where role.user_id = user.id AND user.email = '$email' AND role.enabled = '1'");
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
        $e = getSQLResultSet("INSERT INTO `upnoticer`.`phone`(`institution_id`, `phone`) VALUES ($institucion, '$telefono');");
        break;

    case 44://listar telefonos
        $institucion=$_GET['institucion'];
        $respuesta = array();
        $e = getSQLResultSet("SELECT `phone` FROM `phone` WHERE `institution_id` = $institucion;");
        while($m = mysqli_fetch_assoc($e)) {
            $respuesta[] = $m;
        }
        echo json_encode($respuesta);
        break;


    case 5://Listar Docentes

        $insitucion = $_GET['institucion'];
        $type = $_GET['type'];
        $respuesta = array();  
        $ex = getSQLResultSet("SELECT user.name AS nombre, user.lastname as apellido, role.id AS userId, user.enabled AS enable, 
        (SELECT COUNT(id) FROM subject WHERE subject.role_id = role.id AND subject.enabled = 1) AS asignaturas FROM user, role
        WHERE role.institution_id = $insitucion AND role.type = $type AND user.id = role.user_id AND role.enabled = 1;");
        while($m = mysqli_fetch_assoc($ex)) {
            $respuesta[] = $m;
        }
        echo json_encode($respuesta);

        break;


    case 6:
        //quitar Telefonos
        $institucion=$_GET['institucion'];
        $telefono=$_GET['telefono'];
        $telefonos = array();
        $e = getSQLResultSet("DELETE FROM `upnoticer`.`phone` WHERE `institution_id`= '$institucion' AND `phone` ='$telefono';");
        echo json_encode("Eliminado $telefono");
        break;

    case 7://Listar Docentes Sin Cursos Asignados

        $insitucion = $_GET['institucion'];
        $respuesta = array();
        $ex = getSQLResultSet("SELECT user.name AS nombre, user.lastname as apellido, role.id AS userId FROM user, role 
        WHERE role.institution_id = '$insitucion' AND role.type = 1 AND user.id = role.user_id AND role.id 
        not in (select grade.teacher from grade where grade.institution_id = $insitucion AND grade.enabled = 1) 
        AND user.enabled = 1 AND role.enabled = 1;");
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
        $e = getSQLResultSet("SELECT COUNT(id) AS ID FROM grade WHERE `name`= '$nivel' AND `identifier` = '$identificador' 
        AND `institution_id` = $insitucion AND grade.enabled = 1 ;");
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
        $rut=$_GET['rut'];
        $apellido=$_GET['apellido'];
        $e = getSQLResultSet("INSERT INTO `student`(`rut`, `name`, `lastName`, `grade_id`) 
        VALUES ('$rut','$nombre','$apellido',$curso);");
        $respuesta['resultado']="Inserto, eso creo";
        echo json_encode($respuesta);
        break;

    case 9://Listar Cursos
        $insitucion = $_GET['institucion'];
        $respuesta = array();

        $ex = getSQLResultSet("SELECT grade.id AS gradeID, grade.name AS curso, grade.identifier AS identificador, user.name AS nombreProfesor, 
        user.lastname AS apellidoProfesor FROM grade, user, role
        WHERE grade.institution_id = $insitucion AND grade.enabled = '1' AND role.id = grade.teacher AND user.id = role.user_id AND grade.enabled = 1
        ORDER BY grade.name, grade.identifier;");

        while($m = mysqli_fetch_assoc($ex)) {
            $idGade = $m['gradeID'];
            $e = getSQLResultSet("SELECT COUNT(id) AS estudiantes FROM student WHERE student.grade_id = $idGade;");
                while($mm = mysqli_fetch_assoc($e)) {
                    $respuesta[] = $m + $mm;
                }
                
        }
        echo json_encode($respuesta);
        break;

    case 10://listar Alumnos de curso
        $curso = $_GET['curso'];
        $respuesta = array();
        $ex = getSQLResultSet("SELECT id, name, lastName FROM `student` WHERE student.grade_id = $curso AND student.enabled= 1;");

        while($m = mysqli_fetch_assoc($ex)) {
            $respuesta[]=$m;
        }
        echo json_encode($respuesta);
        break;

    case 11://eliminar Alumnos de curso
        $id = $_GET['id'];
        $ex = getSQLResultSet("DELETE FROM `student` WHERE student.grade_id = $id;");
        break;

    case 12://eliminar curso
        $id = $_GET['id'];
        $respuesta = array();
        $e = getSQLResultSet("SELECT COUNT(id) AS cantidad FROM student WHERE student.grade_id = $id");
        while($m = mysqli_fetch_assoc($e)) {
           if($m['cantidad']==0){
                $ex = getSQLResultSet("DELETE FROM `grade` WHERE grade.id = $id;");
                $respuesta['respuesta']= "200";
            }else{
                $respuesta['respuesta']= "100";
            }
        }        
        echo json_encode($respuesta);
        break;

    case 13://Listar Mensajes
        $id = $_GET['id'];
        $respuesta = array();
        $ex = getSQLResultSet("SELECT message.name AS titulo, DATE(message.date) AS fecha, 
        (SELECT message_content.content FROM message_content WHERE message_content.id = message.id 
        AND message_content.id = (SELECT MIN(id) from message_content WHERE message_content.id = message.id)) 
        AS contenido, message.include AS destino FROM message WHERE message.sender = $id AND message.enabled = 1;");

        while($m = mysqli_fetch_assoc($ex)) {
            $respuesta[] = $m;
        }
        echo json_encode($respuesta);
        break;

    case 14://Listar Mensajes Comunidad
        $id = $_GET['id'];
        $institucion = $_GET['institucion'];
        $respuesta = array();
        $ex = getSQLResultSet("SELECT institutional_message.name AS titulo, institutional_message.description AS contenido, 
        DATE(institutional_message.date) AS fecha FROM institutional_message WHERE institutional_message.institution_id = $institucion 
        AND institutional_message.role_id = $id AND institutional_message.enabled= 1;");
        while($m = mysqli_fetch_assoc($ex)) {
            $respuesta[] = $m;
        }
        echo json_encode($respuesta);
        break;



    case 15://ingresar mensaje comunidad
        $titulo = $_GET['titulo'];
        $contenido = $_GET['contenido'];
        $sender = $_GET['sender'];
        $institucion = $_GET['institucion'];
        $respuesta = array();
        $ex = getSQLResultSet("INSERT INTO `institutional_message`(`name`, `description`, `institution_id`, `role_id`)
         VALUES ('$titulo','$contenido',$institucion,$sender);");
        echo json_encode($respuesta);
        break;

    case 16://LISTAR CURSOS DISTINTOS
        $institucion = $_GET['institucion'];
        $respuesta = array();
        $ex = getSQLResultSet("SELECT DISTINCT name FROM grade WHERE grade.institution_id = $institucion AND grade.enabled = 1;");
         while($m = mysqli_fetch_assoc($ex)) {
            $respuesta[] = $m;
        }

        echo json_encode($respuesta);
        break;

    case 17://ingresar mensaje nivel
        $titulo = $_GET['titulo'];
        $contenido = $_GET['contenido'];
        $sender = $_GET['sender'];
        $institucion = $_GET['institucion'];
        $curso = $_GET['curso'];
        $respuesta = array();
        $ex = getSQLResultSet("INSERT INTO `message`(`name`, `sender`, `type`, `include`) 
        VALUES ('$titulo',$sender,'0','0');");
        $ex = getSQLResultSet("SELECT MAX(id) AS mensajeID FROM message WHERE sender = $sender;");
        while($m = mysqli_fetch_assoc($ex)) {
            $mensajeID = $m['mensajeID'];
            $exx = getSQLResultSet("INSERT INTO `message_content`(`content`,`message_id`, `sender`) 
            VALUES ('$contenido',$mensajeID,$sender);");

            $e = getSQLResultSet("SELECT role.id AS rolId, student.id AS studenID FROM role, relationship, student, institution, grade
            WHERE student.id = relationship.student_id AND role.id = relationship.role_id AND role.institution_id = institution.id 
            AND institution.id = grade.institution_id AND grade.id = student.grade_id AND institution.id = $institucion AND grade.name = '$curso' 
            AND student.enabled= 1 AND grade.enabled = 1;");
            while($n = mysqli_fetch_assoc($e)) {
                $roleID=$n['rolId'];
                $studentID = $n['studenID'];
                $exx = getSQLResultSet("INSERT INTO addressee_message ('message_id', 'role_id'. 'student_id') VALUES ( $mensajeID, $roleID, $studentID);");
            }
        }
         while($m = mysqli_fetch_assoc($ex)) {
            $respuesta[] = $m;
        }
        echo json_encode($respuesta);
        break;

    case 18://obtener Identificadores
        $institucion = $_GET['institucion'];
        $curso = $_GET['curso'];
        $respuesta = array();
        $ex = getSQLResultSet("SELECT `identifier` FROM `grade` WHERE `name` = '$curso' AND `institution_id` = $institucion AND grade.enabled = 1  ORDER BY identifier;");
         while($m = mysqli_fetch_assoc($ex)) {
            $respuesta[] = $m;
        }
        echo json_encode($respuesta);
        break;

    case 19://ingresar mensaje curso
        $titulo = $_GET['titulo'];
        $contenido = $_GET['contenido'];
        $sender = $_GET['sender'];
        $institucion = $_GET['institucion'];
        $curso = $_GET['curso'];
        $identificador = $_GET['identificador'];
        $respuesta = array();
        $ex = getSQLResultSet("INSERT INTO `message`(`name`, `sender`, `type`, `include`) 
        VALUES ('$titulo',$sender,'0','1');");
        $ex = getSQLResultSet("SELECT MAX(id) AS mensajeID FROM message WHERE sender = $sender;");
        while($m = mysqli_fetch_assoc($ex)) {
            $mensajeID = $m['mensajeID'];
            $exx = getSQLResultSet("INSERT INTO `message_content`(`content`,`message_id`, `sender`) 
            VALUES ('$contenido',$mensajeID,$sender);");

            $e = getSQLResultSet("SELECT role.id AS rolId, student.id AS studenID FROM role, relationship, student, institution, grade
            WHERE student.id = relationship.student_id AND role.id = relationship.role_id AND role.institution_id = institution.id 
            AND institution.id = grade.institution_id AND grade.id = student.grade_id AND institution.id = $institucion AND 
            grade.name = '$curso' AND grade.identifier = '$identificador' AND student.enabled= 1;");
            while($n = mysqli_fetch_assoc($e)) {
                $roleID=$n['rolId'];
                $studentID = $n['studenID'];
                $exx = getSQLResultSet("INSERT INTO addressee_message ('message_id', 'role_id'. 'student_id') VALUES ( $mensajeID, $roleID, $studentID);");
            }
        }
         while($m = mysqli_fetch_assoc($ex)) {
            $respuesta[] = $m;
        }
        echo json_encode($respuesta);
        break;

    case 20://obtener alumnos por curso
        $institucion = $_GET['institucion'];
        $curso = $_GET['curso'];
        $identificador = $_GET['identificador'];
        $respuesta = array();
        $ex = getSQLResultSet("SELECT grade.id AS gradeId from grade WHERE grade.name = '$curso' 
        AND grade.identifier = '$identificador' AND grade.institution_id = $institucion AND grade.enabled = 1;");
        while($m = mysqli_fetch_assoc($ex)) {
           $rgradeID = $m['gradeId'];
           $a = getSQLResultSet("SELECT COUNT(student.id) AS canstidad FROM student, role, 
           relationship WHERE student.grade_id = $rgradeID AND student.id = relationship.student_id 
           AND relationship.role_id = role.id AND student.enabled = 1 AND role.enabled = 1;");
            while($x = mysqli_fetch_assoc($a)) {
           if($x['canstidad'] > 0)
           {
                $e = getSQLResultSet("SELECT student.id AS studentID, student.name AS studentName, student.lastName AS studentLastname, 
                role.id AS roleId FROM student, role, relationship WHERE student.grade_id = $rgradeID AND student.id = relationship.student_id 
                AND relationship.role_id = role.id AND student.enabled= 1; ");
                while($n = mysqli_fetch_assoc($e)) {
                $respuesta[] = $n;
                }
           }else{
                $respuesta['respuesta']= "200";
           }
        }
       }
        echo json_encode($respuesta);
        break;

    case 21://ingresar mensaje especifico
        $titulo = $_GET['titulo'];
        $contenido = $_GET['contenido'];
        $sender = $_GET['sender'];
        $respuesta = array();
        $ex = getSQLResultSet("INSERT INTO `message`(`name`, `sender`, `type`, `include`) 
        VALUES ('$titulo',$sender,'0','2');");
        $ex = getSQLResultSet("SELECT MAX(id) AS mensajeID FROM message WHERE sender = $sender;");
        while($m = mysqli_fetch_assoc($ex)) {
            $mensajeID = $m['mensajeID'];
            $respuesta = $m;
            $exx = getSQLResultSet("INSERT INTO `message_content`(`content`,`message_id`, `sender`) 
            VALUES ('$contenido',$mensajeID,$sender);");
        }
        echo json_encode($respuesta);
        break;

    case 22://ingresar destinatarios mensaje especifico

        $studentID = $_GET['studentID'];
        $mensajeID = $_GET['mensajeID'];
        $roleId = $_GET['roleId'];
        $respuesta = array();
            $exx = getSQLResultSet("INSERT INTO addressee_message (`message_id`, `role_id`, `student_id`) 
            VALUES ( $mensajeID, $roleId, $studentID);");
            $respuesta = $exx;
        echo json_encode($respuesta);
        break;

    case 222://ingresar destinatarios mensaje especifico

        $studentID = $_GET['studentID'];
        $respuesta = array();
        $ex = getSQLResultSet("SELECT role.id AS roleId FROM role, relationship WHERE role.id = relationship.role_id 
        AND relationship.student_id = $studentID AND role.enabled = 1;");
        while($m = mysqli_fetch_assoc($ex)) {
            $respuesta= $m;
        }
        echo json_encode($respuesta);
        break;


    case 23://Eliminar Psicos
        $psicosId = $_GET['psicosId'];
            //$e = ejecutarSQLCommand("UPDATE `user` SET `enabled`= 0 WHERE `id` = $psicosId;");
            $e = ejecutarSQLCommand("UPDATE `role` SET `enabled` = '0' WHERE `id` = $psicosId;");
        $respuesta['resultado']="Inserto, eso creo";
        echo json_encode($respuesta);
        break;
        
    case 233://Eliminar Docentes
        $docenteId = $_GET['docenteId'];
        $ex = getSQLResultSet("SELECT subject.id as ID FROM subject WHERE subject.role_id = $docenteId;");
        while($m = mysqli_fetch_assoc($ex)) {
            $e = ejecutarSQLCommand("UPDATE `subject` SET `enabled`=0 WHERE `id` = $docenteId;");
        }
        //$e = ejecutarSQLCommand("UPDATE `role` SET `enabled`= 0 WHERE `id` = $docenteId;");

        $respuesta['resultado']="Inserto, eso creo";
        echo json_encode($respuesta);
        break;


    case 24://si puede editar a un docente 
        $institucion = $_GET['institucion'];
        $roleId = $_GET['roleId'];
        $ex = getSQLResultSet("SELECT COUNT(role.id) AS id FROM role WHERE role.institution_id = $institucion AND role.id = $roleId;");
        while($m = mysqli_fetch_assoc($ex)) {
            if($m['id'] == '1'){
                $respuesta['resultado']="300";
            }
            else{
                $respuesta['resultado']="200";
            }
        }
        echo json_encode($respuesta);
        break;

    case 25://obtener cursos dados
        $institucion = $_GET['institucion'];
        $roleId = $_GET['roleId'];
        $respuesta = array();
        $ex = getSQLResultSet(" SELECT COUNT(subject.id) AS cantidad FROM grade, subject 
        WHERE subject.role_id = $roleId AND grade.institution_id = $institucion AND grade.id = subject.grade_id 
        AND grade.enabled = '1' AND subject.enabled = '1';");
        while($m = mysqli_fetch_assoc($ex)) {
            if($m['cantidad'] != '0'){
                $e = getSQLResultSet("SELECT grade.name AS curso, grade.identifier AS identificador, 
                subject.name AS ramo, subject.id AS gradeId FROM grade, subject WHERE subject.role_id = $roleId 
                AND grade.institution_id = $institucion AND grade.id = subject.grade_id AND grade.enabled = '1' AND subject.enabled = '1'
                 ORDER BY grade.name, grade.identifier;");
                while($x = mysqli_fetch_assoc($e)) {
                    $respuesta[]=$x;
                    }
            }
            else{
                $respuesta['resultado']="200";
            }
        }
        echo json_encode($respuesta);
        break;

    case 26://Agregar asignatura
        $institucion = $_GET['institucion'];
        $identifier = $_GET['identifier'];
        $curso = $_GET['curso'];
        $name = $_GET['name'];
        $roleId = $_GET['roleId'];
        $r['r']="Antes del select";
        $ex = getSQLResultSet("SELECT `id` FROM `grade` WHERE `name` = '$curso' AND `identifier` = '$identifier' AND `institution_id` = $institucion AND `enabled` = '1';");
        $r['r']="Despues del select";
        while($m = mysqli_fetch_assoc($ex)) {
            $r['r']="Dentro del while";
            $gradeId = $m['id'];
            $e = getSQLResultSet("INSERT INTO `subject`(`name`, `grade_id`, `role_id`) VALUES ('$name', $gradeId, $roleId);");
            $r['r']="Despues del insert ===== $e";
        }
        echo json_encode($r);
        break;

    case 27://Agregar asignatura
        $asignatura = $_GET['asignatura'];
        $ex = getSQLResultSet("UPDATE `subject` SET `enabled`= '0' WHERE `id` = $asignatura;");
        echo json_encode($ex);
        break;

    case 28://Info basica de docente
        $roleId = $_GET['roleId'];
        $respuesta = array();
        $ex = getSQLResultSet("SELECT user.name As nombre, user.lastname AS apellido, user.email AS email, user.id AS userID,
        (SELECT COUNT(id) FROM subject WHERE subject.role_id = role.id AND subject.enabled = 1) AS asignaturas, 
        role.date_contract AS contrato, role.type AS type from user, role 
        WHERE user.id = role.user_id AND role.enabled = 1 AND role.id = $roleId;");
        while($m = mysqli_fetch_assoc($ex)) {
           $respuesta = $m;
        }
        echo json_encode($respuesta);
        break;

    case 29://Actualizar datos sin pass
        $roleId = $_GET['roleId'];
        $nombre = $_GET['nombre'];
        $apellido = $_GET['apellido'];
        $contrato = $_GET['contrato'];
        $userId = $_GET['userId'];
        $ex = getSQLResultSet("UPDATE `user` SET `name`='$nombre',`lastname`='$apellido' WHERE `id` = $userId;");
        $ex = getSQLResultSet("UPDATE `role` SET `date_contract`='$contrato', WHERE `id`= $roleId;");
        echo json_encode($ex);
        break;

    case 299://Actualizar pass
        $userId = $_GET['userId'];
        $pass = $_GET['pass'];
        $ex = getSQLResultSet("UPDATE `user` SET `password`= '$pass' WHERE `id` = $userId;");
        echo json_encode($ex);
        break;

    case 30://obtener cantidad de titulos
        $userId = $_GET['userId'];
        $respuesta = array();
        $ex = getSQLResultSet("SELECT COUNT(id) AS cantidad FROM `degree` WHERE `role_id`= $userId;");
        while($m = mysqli_fetch_assoc($ex)) {
            $respuesta = $m;
         }
        echo json_encode($respuesta);
        break;

    case 300://obtener titulos
        $userId = $_GET['userId'];
        $respuesta = array();
        $ex = getSQLResultSet("SELECT `id`, `profession`, `institucion` FROM `degree` WHERE `role_id`= $userId;");
        while($m = mysqli_fetch_assoc($ex)) {
            $respuesta[] = $m;
         }
        echo json_encode($respuesta);
        break;

    case 31://obtener titulos
        $tituloId = $_GET['tituloId'];
        $result = array();
        $ex = getSQLResultSet("DELETE FROM `degree` WHERE `id`= $tituloId;");
        echo json_encode($ex);
        break;

    case 32://obtener titulos
        $userId = $_GET['userId'];
        $titulo = $_GET['titulo'];
        $institucion = $_GET['institucion'];
        $result = array();
        $ex = getSQLResultSet("INSERT INTO `degree`(`profession`, `institucion`, `role_id`) 
        VALUES ('$titulo','$institucion',$userId);");
        echo json_encode($ex);
        break;
    
}

