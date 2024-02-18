<?php 

$conn = new mysqli('localhost', 'u337394393_leadchart', 'Z6mPwVO8QHL', "u337394393_leadchart");
$input = @file_get_contents("php://input");
$payload = json_decode($input);

if ($payload->type == "customer.created"){
    $object = $payload->data->object;
    $sql = "INSERT INTO `users` (`email`, `stripe_id`, `subscriber_id`, `plain_id`, `status`) VALUES ('".$object->email."', '".$object->id."', '".$object->subscriptions->data[0]->id."', '".$object->subscriptions->data[0]->plan->id."', 'pending')";
    if ($conn->query($sql) === TRUE) {
      header("Status: 200 OK");
      $response['status'] = "success";
    } else {
      header("Status: 400 Bad Request");
      $response['status'] = "error 0";
    }
} else {
    $object = $payload->data->object;
    if ($payload->type === "charge.succeeded" && $object->status === "succeeded") {
        $sql = "Select * From users WHERE stripe_id ='$object->customer' ORDER BY id DESC LIMIT 1";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            $result = $result->fetch_assoc();
            $to = $result['email']; 
            $from = 'skyrandtech@gmail.com'; 
            $fromName = 'LeadChart'; 
            $subject = 'LeadChart Files';  
            $file = "./file.zip"; 
            
            if ($object->amount == 19900) {
                $htmlContent = ' 
                    <b>Hello</b>
                    <br />
                    <p>Thank you for your purchase. Please find your file attached.</p>
                    <p>If you are interested in the list with leads, please check <a href="https://checkout.stripe.com/pay/ppage_1LSknzSDUn4YO1UaLv3iyjV1#fidkdWxOYHwnPyd1blppbHNgWjA0Tl1XSW5WQVBrMVxKNFBkPWtLRl9pYDBvfWE2a0NVfWdqQ31ubDNVbXdgbUB8cE1dVkBic0ByU3xBYkJyMDE9b3BIMVUzYmpycVVHakxMQD1%2FNUlDXUFWNTVkalF%2FZmhITCcpJ2hsYXYnP34nYnBsYSc%2FJ2dnPDQ8PDczKGBjNGAoMWdnZyhkMDQ8KDBhPD1gZ2NmMGZjZjE3M2BmNCcpJ2hwbGEnPyc1NDJkMjcxMig0NDdmKDEwZmQoPWA0MygzZDRgMzxnZmE9YWRkPWBkYT0nKSd2bGEnPycxMWM3NWE9YSgyZDI8KDE2NjIoZGQ8NShnZmc1PWdkPTMzMTM1PTUwNDUneCknZ2BxZHYnP15YKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSd3YGNgd3dgd0p3bGJsayc%2FJ21xcXV2PyoqaWBkYWZtZHdxK2ZqJyknaWpmZGlgJz9rcGlpeCUl">here</a>.</p>
                    <br />
                    <b>Best,</b>
                    <p>Team LeadChart.</p>
                ';    
            } else {
                $htmlContent = ' 
                    <b>Hello</b>
                    <br />
                    <p>Thank you for your purchase. Please find your file attached.</p>
                    <br />
                    <b>Best,</b>
                    <p>Team LeadChart.</p>
                ';
            }
            
            $headers = "From: $fromName"." <".$from.">"; 
            // Boundary  
            $semi_rand = md5(time());  
            $mime_boundary = "==Multipart_Boundary_x{$semi_rand}x";  
            // Headers for attachment  
            $headers .= "\nMIME-Version: 1.0\n" . "Content-Type: multipart/mixed;\n" . " boundary=\"{$mime_boundary}\""; 
             
            // Multipart boundary  
            $message = "--{$mime_boundary}\n" . "Content-Type: text/html; charset=\"UTF-8\"\n" . 
            "Content-Transfer-Encoding: 7bit\n\n" . $htmlContent . "\n\n";  
             
            // Preparing attachment 
            if(!empty($file) > 0){ 
                if(is_file($file)){ 
                    $message .= "--{$mime_boundary}\n"; 
                    $fp =    @fopen($file,"rb"); 
                    $data =  @fread($fp,filesize($file)); 
             
                    @fclose($fp); 
                    $data = chunk_split(base64_encode($data)); 
                    $message .= "Content-Type: application/octet-stream; name=\"".basename($file)."\"\n" .  
                    "Content-Description: ".basename($file)."\n" . 
                    "Content-Disposition: attachment;\n" . " filename=\"".basename($file)."\"; size=".filesize($file).";\n" .  
                    "Content-Transfer-Encoding: base64\n\n" . $data . "\n\n"; 
                } 
            } 
            $message .= "--{$mime_boundary}--"; 
            $returnpath = "-f" . $from; 
            $mail = @mail($to, $subject, $message, $headers, $returnpath);  
            //$response['stastus'] = $mail;
            if($mail) {
                $sql = "UPDATE users SET status='sent' WHERE stripe_id ='$object->customer'";
                if ($conn->query($sql) === TRUE) {
                  header("Status: 200 OK");
                  $response['status'] = "success";
                } else {
                  header("Status: 400 Bad Request");
                  $response['status'] = "error 1";
                } 
            } else {
                header("Status: 400 Bad Request");
                $response['status'] = "error 2";
            }
        } else {
            header("Status: 400 Bad Request");
            $response['status'] = "error 3";
        }
    } else {
        $sql = "INSERT INTO `users` (`email`, `stripe_id`, `subscriber_id`, `plain_id`, `status`) VALUES ('', '', '', '', ".$payload->type."')";
        $conn->query($sql);
        header("Status: 400 Bad Request");
        $response['status'] = "error 4";
    }
}
$json_response = json_encode($response);
echo $json_response;
$conn->close();
exit();
?>