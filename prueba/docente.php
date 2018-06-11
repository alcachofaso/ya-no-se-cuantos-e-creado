<?php
include('connecion.php');
header('Access-Control-Allow-Origin: *'); 
date_default_timezone_set("Chile/Continental");

$operacion = $_GET['op'];


switch ($operacion) {

    case 0: //
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
        $insti = getSQLResultSet("SELECT grade.id AS id, grade.name AS name, grade.identifier AS identifier FROM `grade`, subject 
        WHERE  grade.enabled = '1' AND  subject.enabled ='1' AND grade.id = subject.grade_id AND subject.role_id= 8 AND 
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
        $insti = getSQLResultSet("SELECT `id`, `name` FROM `subject` WHERE `enabled` = '1' AND `role_id` = $docenteId AND `grade_id` = $cursoId;");
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
        $subject_id=$_GET['subject_id'];
        $student_id=$_GET['student_id'];
        $insti = getSQLResultSet("INSERT INTO `homework`(`name`, `description`, `deadline`,`subject_id`, `grade_id`) 
        VALUES ('$name','$description',$fecha,$subject_id,$student_id)");

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
        while($r = mysqli_fetch_assoc($insti)) {
            $respuesta[] = $r;
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

}