<?php

http_response_code(200); echo "{}";

//webhook set @ besterkolleg.ch/telegram/smartbot.php
$botToken = "276257794:AAGRF0UUU_zgrA4hyffRYT-NPqnBKJYB0SQ";
$website = "https://api.telegram.org/bot".$botToken;
$admin = "-163044095";

$rawContent = @file_get_contents("php://input");
$contentArray = json_decode($rawContent, true);

$keller = "http://k-keller.com:4084/message";
$message = "";
$chatId = "";

foreach ($contentArray as $key => $value) {
	if($key === "message"){
		foreach ($value as $messagekey => $messagevalue) {
			if($messagekey === "text"){
				$message = $messagevalue;
			}
			if($messagekey === "chat"){
				foreach ($messagevalue as $chatkey => $chatvalue) {
					if($chatkey === "id"){
						$chatId = $chatvalue;
					}
				}
			}
		}
	}
}

if($chatId != $admin) {
	$data = array("message" => $message);


	$options = array(
	    'http' => array(
	        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
	        'method'  => 'POST',
	        'content' => http_build_query($data)
	    )
	);


	$ch = curl_init($keller);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$json = '';

	if( ($json = curl_exec($ch) ) === false)
	{
		//Connection failed. Contacting admin group
		@file_get_contents($website."/sendmessage?chat_id=".$admin."&text=Accessing ".$keller." failed.%0AThe given word/sentence was '".$message."'.%0AStatus: ".curl_error($ch));
	}
	else
	{
		$context  = stream_context_create($options);
		$result = @file_get_contents($keller, false, $context);
		@file_get_contents($website."/sendmessage?chat_id=".$chatId."&text=".$result);
	}
}

?>
