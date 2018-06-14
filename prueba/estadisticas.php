<?php
include('connecion.php');
header('Access-Control-Allow-Origin: *'); 

$operacion = $_GET['op'];
switch ($operacion) {

case 0 ://CANTIDAD DE ESTABLECIMIENTOS POR COMUNA INCLUYE LAS CON 0, HAY QUE FILTRAR
    $respuesta = array();
    $e = getSQLResultSet("SELECT comuna.nombre AS comuna, (SELECT COUNT(id) FROM institution WHERE institution.enabled = '1' AND institution.comuna = comuna.id)  as cantidad from comuna");
    while($n = mysqli_fetch_assoc($e)) {
    $respuesta[] = $n;
    }
    echo json_encode($respuesta);
    break;

case 1 ://CANTIDAD DE ESTABLECIMIENTOS ELIMINADOS POR COMUNA INCLUYE LAS CON 0, HAY QUE FILTRAR
    $respuesta = array();
    $e = getSQLResultSet("SELECT comuna.nombre AS comuna, (SELECT COUNT(id) FROM institution WHERE institution.enabled = '0' AND institution.comuna = comuna.id)  as cantidad from comuna");
    while($n = mysqli_fetch_assoc($e)) {
    $respuesta[] = $n;
    }
    echo json_encode($respuesta);
    break;

case 2 ://CANTIDAD DE ESTABLECIMIENTOS ELIMINADOS POR COMUNA INCLUYE LAS CON 0, HAY QUE FILTRAR
    $respuesta = array();
    $e = getSQLResultSet("SELECT COUNT(institution.id) from institution, licence WHERE licence.institution_id = institution.id AND (SELECT licence.duration FROM licence WHERE licence.id = (SELECT max(id) FROM licence WHERE licence.institution_id = institution.id)) = 1");
    while($n = mysqli_fetch_assoc($e)) {
    $respuesta[] = $n;
    }
    echo json_encode($respuesta);
    break;

case 3 ://CANTIDAD DE APODERADOS TOTALES QUE USAN LA APLICACION
    $respuesta = array();
    $e = getSQLResultSet("SELECT COUNT(relationship.relationship) AS cantidadApoderados from relationship, role, student WHERE role.enabled = '1' AND student.enabled = '1' AND relationship.role_id = role.id AND relationship.student_id = student.id;");
    while($n = mysqli_fetch_assoc($e)) {
    $respuesta[] = $n;
    }
    echo json_encode($respuesta);
    break;

case 4 ://CANTIDAD DE ESTUDIANTES TOTALES
    $respuesta = array();
    $e = getSQLResultSet("SELECT COUNT(student.id) FROM student WHERE student.enabled = '1';");
    while($n = mysqli_fetch_assoc($e)) {
    $respuesta[] = $n;
    }
    echo json_encode($respuesta);
    break;

case 4 ://CANTIDAD DE ESTUDIANTES TOTALES
    $respuesta = array();
    $e = getSQLResultSet("SELECT COUNT(student.id) FROM student WHERE student.enabled = '1';");
    while($n = mysqli_fetch_assoc($e)) {
    $respuesta[] = $n;
    }
    echo json_encode($respuesta);
    break;



}