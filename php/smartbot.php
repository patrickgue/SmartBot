<?php

http_response_code(200); echo "{}";

//webhook set @ besterkolleg.ch/telegram/smartbot.php
$botToken = "276257794:AAGRF0UUU_zgrA4hyffRYT-NPqnBKJYB0SQ";
$website = "https://api.telegram.org/bot".$botToken;
$admin = "11405325";

$rawContent = file_get_contents("php://input");
$contentArray = json_decode($rawContent, true);

$keller = "http://k-keller.com:4084/message";
$message = "";

foreach ($contentArray as $key => $value) {
	if($key === "message"){
		foreach ($value as $messagekey => $messagevalue) {
			if($messagekey === "text"){
				$message = $messagevalue;
			}
		}
	}
}

$data = array("message" => $message);


$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);

$context  = stream_context_create($options);
$result = file_get_contents($keller, false, $context);
if ($result === FALSE) {
  file_get_contents($website."/sendmessage?chat_id=".$admin."&text=test");
} else{
  file_get_contents($website."/sendmessage?chat_id=".$admin."&text=".$result);
}




?>
