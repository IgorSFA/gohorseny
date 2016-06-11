

    <?php
     
    require_once("./lib/Simplify.php");
     
    Simplify::$publicKey = 'sbpb_M2I1N2MwNmEtNThhNi00MzQ2LTg4ZDctNWUxNWM5ZmYwZTE2';
    Simplify::$privateKey = 'zdES900KNLeDsNWtBjt0Eyrm+3NCaYBaeSP7pZQUMsx5YFFQL0ODSXAOkNtXTToq';
     
    $payment = Simplify_Payment::createPayment(array(
            'amount' => '1000',
            'token' => '[TOKEN ID]',
            'description' => 'payment description',
            'reference' => '7a6ef6be31',
            'currency' => 'USD'
    ));
     
    if ($payment->paymentStatus == 'APPROVED') {
        echo "Payment approved\n";
    }
     
    ?>

