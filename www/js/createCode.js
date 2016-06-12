console.log('teste');
function createCode(divCanvas, text){
	console.log($(divCanvas));
	var code = text;    //ENTRAR COM O TOKEN

    PDF417.init(code);             

    var barcode = PDF417.getBarcodeArray();

    // block sizes (width and height) in pixels
    var bw = 2;
    var bh = 2;

    // create canvas element based on number of columns and rows in barcode
    var canvas = document.createElement('canvas');
    canvas.width = bw * barcode['num_cols'];
    canvas.height = bh * barcode['num_rows'];
    $(divCanvas).append(canvas);

    var ctx = canvas.getContext('2d');                    

    // graph barcode elements
    var y = 0;
    // for each row
    for (var r = 0; r < barcode['num_rows']; ++r) {
        var x = 0;
        // for each column
        for (var c = 0; c < barcode['num_cols']; ++c) {
            if (barcode['bcode'][r][c] == 1) {                        
                ctx.fillRect(x, y, bw, bh);
            }
            x += bw;
        }
        y += bh;
    }
    return ctx;            
}


