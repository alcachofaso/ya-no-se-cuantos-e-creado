<?php
include('connecion.php');
header('Access-Control-Allow-Origin: *'); 
date_default_timezone_set("Chile/Continental");

$operacion = $_GET['op'];


switch ($operacion) {

    case 0: // listado alumnos curso a cargo
        $docenteId=$_GET['docenteId'];
        $respuesta = array();
        $insti = getSQLResultSet("SELECT student.id AS studentId, student.name AS studentName, student.lastName AS studentLast, 
        (select COUNT(id) FROM role, relationship WHERE student.id = relationship.student_id AND relationship.role_id = role.id) 
        AS apoderado FROM student, grade WHERE student.grade_id = grade.id AND grade.teacher = $docenteId;");
        while($r = mysqli_fetch_assoc($insti)) {
            $respuesta[] = $r;
        }
        echo json_encode($respuesta);

        break;

    case 1: //Ingresar Atraso
        $studentId=$_GET['studentId'];
        $insti = getSQLResultSet("SELECT MAX(DATE(date)) AS date FROM `delay` WHERE `student_id` = $studentId");
        while($r = mysqli_fetch_assoc($insti)) {
            if($r['date'] == null){
                $e = getSQLResultSet("INSERT INTO `delay`(`student_id`) VALUES ($studentId);");
                $resp['respuesta']="300";
            }
            else
            if($r['date'] == date("Y-m-d")){
                $resp['respuesta']="200";
            }else{
                $e = getSQLResultSet("INSERT INTO `delay`(`student_id`) VALUES ($studentId);");
                $resp['respuesta']="300";
            }
        }
        
        echo json_encode($resp);
        break;

    case 2: //Ingresar Inasistencia
        $studentId=$_GET['studentId'];
        $insti = getSQLResultSet("SELECT MAX(DATE(date)) AS date FROM `absence` WHERE `student_id` = $studentId");
        while($r = mysqli_fetch_assoc($insti)) {
            if($r['date'] == null){
                $e = getSQLResultSet("INSERT INTO `absence`(`student_id`) VALUES ($studentId);");
                $resp['respuesta']="300";
            }
            else
            if($r['date'] == date("Y-m-d")){
                $resp['respuesta']="200";
            }else{
                $e = getSQLResultSet("INSERT INTO `delay`(`absence`) VALUES ($studentId);");
                $resp['respuesta']="300";
            }
        }
        
        echo json_encode($resp);
        break;

    case 3: //Listar Cursos Dados
        $docenteId=$_GET['docenteId'];
        $respuesta = array();
        $insti = getSQLResultSet("SELECT DISTINCT(grade.id) AS id, grade.name AS name, grade.identifier AS identifier FROM `grade`, subject 
        WHERE  grade.enabled = '1' AND  subject.enabled ='1' AND grade.id = subject.grade_id AND subject.role_id= $docenteId AND 
        (SELECT COUNT(id) from student WHERE student.enabled = '1' AND student.grade_id = grade.id) > 0");

        while($r = mysqli_fetch_assoc($insti)) {
            $respuesta[] = $r;
        }
        echo json_encode($respuesta);

        break;

    case 4: //Listar Asignaturas Dadas
        $docenteId=$_GET['docenteId'];
        $cursoId=$_GET['cursoId'];
        $respuesta = array();
        $insti = getSQLResultSet("SELECT subject.id AS id, subjectname.nombre AS name FROM `subject`, subjectname 
        WHERE subject.enabled = '1' AND subject.subjectName=subjectname.id AND `role_id` = $docenteId AND `grade_id` = $cursoId;");
        while($r = mysqli_fetch_assoc($insti)) {
            $respuesta[] = $r;
        }
        echo json_encode($respuesta);

        break;

   /* case 5: //cantidad de asignaturas
        $docenteId=$_GET['docenteId'];
        $insti = getSQLResultSet("SELECT COUNT(id) AS cantidad FROM `subject` WHERE `enabled` = '1' AND `role_id` = $docenteId;");
        while($r = mysqli_fetch_assoc($insti)) {
            echo  $r['cantidad'];
        }
        echo json_encode($respuesta);

        break;*/

    case 6: //Publicar Notas
        $name=$_GET['name'];
        $description=$_GET['description'];
        $value=$_GET['value'];
        $value = floatval($value);
        $subject_id=$_GET['subject_id'];
        $student_id=$_GET['student_id'];
        $insti = getSQLResultSet("INSERT INTO `evaluation`(`name`, `description`, `value`, `subject_id`, `student_id`) 
        VALUES ('$name','$description', $value,$subject_id,$student_id)");

        break;

    case 7: //Publicar Trabajo
        $name=$_GET['name'];
        $description=$_GET['description'];
        $fecha = $_GET['fecha'];
        $_fecha = strtotime($fecha);
        $subject_id=$_GET['subject_id'];
        $student_id=$_GET['student_id'];

        if($_fecha > strtotime(date('y-m-d'))){
            $insti = getSQLResultSet("INSERT INTO `homework`(`name`, `description`, `deadline`,`subject_id`, `grade_id`) 
            VALUES ('$name','$description','$fecha',$subject_id,$student_id)");
            $resp['r'] = "300";
        }else{
            $resp['r'] = "200";
        }
        echo json_encode($resp);;

        break;

    case 8: //Listar Trabajos
        $subject_id=$_GET['subject_id'];
        $grade_id=$_GET['grade_id'];
        $respuesta = array();
        $insti = getSQLResultSet("SELECT `id`, `name`, `description`, DATE(date) AS date, `deadline` 
        FROM `homework` WHERE  `enabled` = '1' AND `subject_id` = $subject_id AND `grade_id` = $grade_id;");
        while($r = mysqli_fetch_assoc($insti)) {
            $respuesta[] = $r;
        }
        echo json_encode($respuesta);

        break;

    case 9: //Eliminar Trabajos
        $trabajoId=$_GET['trabajoId'];
        $insti = getSQLResultSet("UPDATE `homework` SET `enabled`= '0' WHERE `id` = $trabajoId;");

        break;

    case 10: //Obtener Mensajes
        $roleId=$_GET['roleId'];
        $respuesta = array();
        $insti = getSQLResultSet("SELECT `id`, `name`, `date`, `include`, type FROM `message` WHERE `enabled`= '1' AND `sender` =  $roleId;");
        if($insti != null){
            while($r = mysqli_fetch_assoc($insti)) {
                $respuesta[] = $r;
            }
        }
        echo json_encode($respuesta);

        break;

    case 11: //Obtener datos curso
        $roleId=$_GET['roleId'];
        $respuesta = array();
        $insti = getSQLResultSet("SELECT `id`, `name`, `identifier` FROM `grade` WHERE `enabled`='1' AND `teacher` = $roleId;");
        while($r = mysqli_fetch_assoc($insti)) {
            $respuesta = $r;
        }
        echo json_encode($respuesta);
        break;

    case 12: //Obtener cantidad de alumnos con apoderado
        $gradeID=$_GET['gradeID'];
        $respuesta = array();

            $a = getSQLResultSet("SELECT COUNT(student.id) AS canstidad FROM student, role, 
           relationship WHERE student.grade_id = $gradeID AND student.id = relationship.student_id 
           AND relationship.role_id = role.id AND student.enabled = 1 AND role.enabled = 1;");
            while($x = mysqli_fetch_assoc($a)) {
           if($x['canstidad'] > 0)
           {
            $respuesta['respuesta']= "300";
           }else{
                $respuesta['respuesta']= "200";
           }
        }
        echo json_encode($respuesta);
        break;

    case 13: //Obtener listado de alumnos con apoderado
        $gradeID=$_GET['gradeID'];
        $respuesta = array();

        $e = getSQLResultSet("SELECT student.id AS studentID, student.name AS studentName, student.lastName AS studentLastname, 
        role.id AS roleId FROM student, role, relationship WHERE student.grade_id = $gradeID AND student.id = relationship.student_id 
        AND relationship.role_id = role.id AND student.enabled= 1; ");
        while($n = mysqli_fetch_assoc($e)) {
        $respuesta[] = $n;
        }

        echo json_encode($respuesta);
        break;

    case 14: //Obtener informacion mensaje especifico
        $mensajeId=$_GET['mensajeId'];
        $respuesta = array();

        $e = getSQLResultSet("SELECT message.name AS titulo, DATE(message.date) AS fecha, message.sender AS envia, 
        message.type AS tipo, message.include AS incluye, user.name AS nombre, user.lastname AS apellido 
        from message, role, user WHERE message.enabled = '1' AND message.sender = role.id AND role.user_id = user.id AND message.id = $mensajeId;");
        while($n = mysqli_fetch_assoc($e)) {
        $respuesta = $n;
        }

        echo json_encode($respuesta);
        break;

    case 15: //Obtener contenidos de mensaje
        $mensajeId=$_GET['mensajeId'];
        $respuesta = array();

        $e = getSQLResultSet(" SELECT message_content.content AS contenido, DATE(message_content.date) AS fecha, message_content.sender AS envia, 
        user.name AS nombre, user.lastname AS apellido FROM message_content, role, user WHERE message_content.sender = role.id 
        AND role.user_id = user.id AND message_content.message_id = $mensajeId ORDER BY message_content.date DESC;");
        while($n = mysqli_fetch_assoc($e)) {
            $respuesta[] = $n;
        }

        echo json_encode($respuesta);
        break;

    case 16: //detalle quien envia mensajes especificos Mensajes Especifico
        $mensajeId=$_GET['mensajeId'];
        $roleId=$_GET['roleId'];
        $respuesta = array();

        $e = getSQLResultSet("SELECT user.name AS nombreApoderado, user.lastname AS apellidoApoderado, student.name AS estudianteNombre, 
        student.lastName AS estudianteApelldio FROM user, role, student, addressee_message 
        WHERE user.enabled = '1' AND role.enabled = '1' AND student.enabled = '1' AND user.id = role.user_id AND role.id = addressee_message.role_id 
        AND addressee_message.student_id = student.id AND addressee_message.role_id = $roleId AND addressee_message.message_id = $mensajeId;");
        while($n = mysqli_fetch_assoc($e)) {
            $respuesta = $n;
        }

        echo json_encode($respuesta);
        break;

    case 17: //enviar contenido de mensaje
        $mensajeId=$_GET['mensajeId'];
        $roleId=$_GET['roleId'];
        $contenido=$_GET['contenido'];
        $e = getSQLResultSet("INSERT INTO `message_content`(`content`,`message_id`, `sender`) 
        VALUES ('$contenido',$mensajeId,$roleId);");
        break;

    case 18: //Obtener informacion de curso a cargo
        $roleId=$_GET['roleId'];
        $institutionId=$_GET['institutionId'];
        $respuesta = array();
        $e = getSQLResultSet("SELECT `id`, `name`, `identifier` FROM `grade` WHERE `enabled`='1' 
        AND `institution_id` = $institutionId AND `teacher` = $roleId ;");
        if($e != null){
            while($n = mysqli_fetch_assoc($e)) {
                $respuesta = $n;
            }
        }
        echo json_encode($respuesta);
        break;

    
}