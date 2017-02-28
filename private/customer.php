<?php
error_reporting(0);
define(site, __DIR__ . '/../');
require site . 'vendor/autoload.php'; 
require site . 'private/config.php'; 

$db = new Mysqlidb(__MYSQL_HOST__, __MYSQL_USER__, __MYSQL_PASSWORD__, __MYSQL_DATABASE__);

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$id = array_shift($request)+0;

if ($method == 'GET' && $id == 0)
	$method = 'QUERY';

switch ($method) {
	case 'QUERY':
	customerQuery();break;
	case 'GET':
	customerGet($id);break;
	case 'POST':
	customerPost(); break;
	case 'PUT':
	customerPut($id); break;
	case 'DELETE':
	customerDelete($id); break;
}

function customerQuery(){
	global $db;
	$db->where("delet",'');
	$db->orderBy("name", "ASC");
	$response['customers'] = $db->get("customer");
	echo json_encode($response);
}

function customerGet($id){
	global $db;
	$db->where("id",$id);
	$db->where("delet",'');
	$response = $db->getOne("customer");
	echo json_encode($response);
}

function customerPost(){
	global $db;
	$customer = json_decode(file_get_contents("php://input"));
	foreach ($customer as $key => $value) {
			$data[$key] = $value;
	}
	$db->insert('customer', $data);
	$id = $db->getInsertId();
	$db->where("id", $id );
	$response['customer'] = $db->getOne("customer");
	echo json_encode($response);
}

function customerPut($id){
	global $db;
	$customer = json_decode(file_get_contents("php://input"));
	foreach ($customer as $key => $value) {
		if($key != 'id')
			$data[$key] = $value;
	}
	$db->where('id', $id);
	$db->update('customer', $data);
	$db->where("id", $id );
	$response['customer'] = $db->getOne("customer");
	echo json_encode($response);
}
function customerDelete($id){
	global $db;
	$db->where('id', $id);
	$data = array ( 'delet' => '*' );	
	$db->update('customer', $data);
	echo json_encode('ok');
}

?>