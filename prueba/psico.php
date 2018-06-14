<?php
include('connecion.php');
header('Access-Control-Allow-Origin: *'); 

$operacion = $_GET['op'];

switch ($operacion) {

case 0: // listado mensajes recividos <<<<solo cambiando el rol id se puede obtener los contenidos especificos del mensaje>>>>
    $roleId=$_GET['roleId'];
    $respuesta = array();
    $insti = getSQLResultSet("SELECT message.name AS titulo, message.id AS id, message.date AS fecha, user.name AS apoderadoNombre, user.lastname AS apoderadoApellido, 
    student.name AS esutianteNombre, student.lastName AS estudianteApellido, grade.name AS curso, grade.identifier AS identCurso FROM message,
     message_content, role, user, student, addressee_message, grade, relationship WHERE message.enabled = '1' AND role.enabled = '1' 
     AND user.enabled = '1' AND student.enabled = '1' AND grade.enabled = '1' AND message.id = message_content.message_id AND message.sender = role.id 
     AND role.user_id = user.id AND role.id = relationship.role_id AND relationship.student_id = student.id AND student.grade_id = grade.id 
     AND message.id = addressee_message.message_id AND addressee_message.student_id = student.id AND addressee_message.role_id = $roleId;");
     if($insti != null){
        while($r = mysqli_fetch_assoc($insti)) {
            $respuesta[] = $r;
        }
    }
    echo json_encode($respuesta);
    break;

case 1: // listado mensajes enviados 
    $roleId=$_GET['roleId'];
    $respuesta = array();
    $insti = getSQLResultSet("SELECT message.name AS titulo, message.date AS fecha, (SELECT message_content.content FROM message_content 
    WHERE message_content.id = (SELECT MIN(id) from message_content WHERE message_content.message_id = message.id)) AS contenido, 
    user.name AS apoderadoNombre, user.lastname AS apoderadoApellido, student.name AS estudianteNombre, student.lastName AS estudianteApellido, 
    grade.name AS curso, grade.identifier AS identCurso FROM message, role, user, addressee_message, student, grade 
    WHERE message.id = addressee_message.message_id AND addressee_message.role_id = role.id AND role.user_id = user.id AND 
    addressee_message.student_id = student.id AND student.enabled = '1' AND student.grade_id = grade.id AND grade.enabled = '1' 
    AND message.enabled = '1' AND message.sender = $roleId;");
     if($insti != null){
        while($r = mysqli_fetch_assoc($insti)) {
            $respuesta[] = $r;
        }
    }
    echo json_encode($respuesta);
    break;

case 2: // Listado de cursos con alumnos asignados
    $institutionId=$_GET['institutionId'];
    $respuesta = array();
    $insti = getSQLResultSet("SELECT grade.name AS curso, grade.identifier AS identificador FROM grade WHERE 
    (SELECT COUNT(student.id) FROM student, relationship, role WHERE student.id = relationship.student_id AND relationship.role_id = role.id) > 0 
    AND grade.enabled= '1' AND grade.institution_id = $institutionId;");
     if($insti != null){
        while($r = mysqli_fetch_assoc($insti)) {
            $respuesta[] = $r;
        }
    }
    echo json_encode($respuesta);
    break;

case 2: // Listado de cursos con alumnos asignados
    $institutionId=$_GET['institutionId'];
    $respuesta = array();
    $insti = getSQLResultSet("SELECT grade.name AS curso, grade.identifier AS identificador, grade.id AS id FROM grade WHERE 
    (SELECT COUNT(student.id) FROM student, relationship, role WHERE student.id = relationship.student_id AND relationship.role_id = role.id) > 0 
    AND grade.enabled= '1' AND grade.institution_id = $institutionId;");
     if($insti != null){
        while($r = mysqli_fetch_assoc($insti)) {
            $respuesta[] = $r;
        }
    }
    echo json_encode($respuesta);
    break;

}