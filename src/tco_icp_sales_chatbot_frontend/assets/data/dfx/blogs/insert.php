<?php 
$tpl_insert = <<<EOT

dfx canister call tco_icp_sales_chatbot_backend createBlog '(
    "_id_", 
    record {
        title = "_title_";
        image = "_image_";
        excerpt = "_excerpt_";
        date = "_date_";
    }
)'

EOT;

$db_json = file_get_contents(__DIR__.'/../../db.json');
$json = json_decode($db_json);
$blogs = $json->blogs;

foreach($blogs as $blog){
    $cmd = $tpl_insert;
    foreach($blog as $k=>$v){
        $cmd = str_ireplace("_${k}_", $v, $cmd);
    }
    // echo $cmd;
    $output = shell_exec($cmd);
    echo $output;
}