<?php
include('connecion.php');
header('Access-Control-Allow-Origin: *'); 

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
        $respuesta = null;

        break;

    case 1: //
        //$studentId=$_GET['studentId'];
        $respuesta = array();
        //$insti = getSQLResultSet("INSERT INTO `delay`(`student_id`) VALUES ($studentId)");
        $date = date("Y-m-d");
        echo "date $date";

        break;


}