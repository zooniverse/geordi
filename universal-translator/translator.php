<?
include("config.php");
include("include.classloader.php");
$classLoader->addToClasspath(ROOT);
$mysql = new MySQLConn(DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASS);
$db = new JSONtoMYSQL($mysql);
$json = file_get_contents('http://analytics.zooniverse.org/events');
$db->save($json, "events");
?>