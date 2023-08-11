<?php 
$tpl_insert = <<<EOT

dfx canister call tco_icp_sales_chatbot_backend createProduct '(
    "_id_", 
    record {
        title = "_title_";
        image = "_image_";
        price = _price_;
    }
)'

EOT;

$db_json = file_get_contents(__DIR__.'/../../db.json');
$json = json_decode($db_json);
$products = $json->products;

foreach($products as $product){
    $cmd = $tpl_insert;
    foreach($product as $k=>$v){
        $cmd = str_ireplace("_${k}_", $v, $cmd);
    }
    // echo $cmd;
    $output = shell_exec($cmd);
    echo $output;
}