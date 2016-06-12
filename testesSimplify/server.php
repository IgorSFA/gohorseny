

    <?php

        require_once("./lib/Simplify.php");

        Simplify::$publicKey = 'sbpb_ZmQ0OGM2MTUtNWE5OC00MGVhLTg3NzYtNzcxNDlmYmUwMTg3';

        Simplify::$privateKey = 'JwCKHI0twcpfwV3uDlv15QEZWxHgA6dmfQBYVBum+IJ5YFFQL0ODSXAOkNtXTToq';

        // $token = $_POST['simplifyToken'];
        // echo $token;
            $payment = Simplify_Payment::createPayment(array(
            "card" => array(
                "number" => "5555555555554444",
                "expMonth" => 11,
                "expYear" => 19,
                "cvc" => "123"
            ),
            'amount' => '1000',
            'description' => 'prod description',
            'currency' => 'USD'
    ));

    if ($payment->paymentStatus == 'APPROVED') {

        echo "Payment approved\n";

    }

    ?>




    <?php
     
    // require_once("lib/Simplify.php");
    // $varToken =  $_POST['simplifyToken'];
    // echo $varToken;     
    // Simplify::$publicKey = 'sbpb_ZmQ0OGM2MTUtNWE5OC00MGVhLTg3NzYtNzcxNDlmYmUwMTg3';
    // Simplify::$privateKey = 'JwCKHI0twcpfwV3uDlv15QEZWxHgA6dmfQBYVBum+IJ5YFFQL0ODSXAOkNtXTToq';
     
    // $payment = Simplify_Payment::createPayment();

    // $payment = Simplify_Payment::createPayment(array(
    //     'amount' => '1000',
    //     'description' => 'music cd',
    //     'invoice' => '[INVOICE ID]'
    //      'card' => array(
    //         'expMonth' => '8',
    //         'expYear' => '20',
    //         'cvc' => '123',
    //         'number' => '5555555555554444'
    //      )
    // ));
     
    // if ($payment->paymentStatus == 'APPROVED') {
    //     echo "Payment approved\n";
    // }else{
    //     echo "Deu merda";
    // }
     
    
    

