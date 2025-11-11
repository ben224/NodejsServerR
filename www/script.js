
var buttons = document.querySelectorAll('[id^="btnN"]');
var ttt = ["", "", "", "", "", "", "", "", ""];
var winLines = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]
];
var current = 'X';
var endOrNot = new Boolean(false);
var total = 0;

buttons.forEach(function(abtn){
    abtn.style.backgroundColor = '#606060';
    abtn.addEventListener('click', function(){ markSpace(abtn.id) });

})

function markSpace(btnID){
    // alert('btnID='+btnID);
    if(endOrNot==true){
        return 0;
    }
    // alert('current='+current);
    if( current = "X" ){
        var abtn = document.getElementById(btnID);
        var pos = parseInt(btnID.substring(4)) - 1;
        // alert('ttt[pos]=' + ttt[pos]);
        // alert('pos=' + pos);
        if( ttt[pos] == "" ){
            ttt[pos] = "X";
            abtn.style.backgroundColor='#cc4444';
            abtn.innerText="X";
            current = "O"
            total ++;

        }
    }

    check();
    if( endOrNot==true ){
        return 0;
    }
    if( current == "O" ){
        while( true ){
            pos = randInt(0,8);
            if( ttt[pos] == "" ){
                btnID = 'btnN' + (pos+1);
                abtn = document.getElementById(btnID);
                ttt[pos] = "O";
                abtn.style.backgroundColor='#57f287';
                abtn.innerText="O";
                current = "X"
                total ++;
                break;
            }
        }
    }

    check();
}

function randInt(start, end){
    return Math.floor( Math.random() * (end - start + 1) ) + start;
}

reset.addEventListener('click', function(){
    let i = 1;
    endOrNot = false;  
    current = "X";
    for( i=0; i<9; i++ ){
        ttt[i] = "";
    }
    buttons.forEach(function(abtn){
        abtn.style.backgroundColor = '#606060';
        abtn.innerText="";
        // abtn.addEventListener('click', function(){ markSpace(abtn.id) });
    })
    total = 0;
    document.getElementById('result').innerHTML = "結果";
})

function check(){
    var ri, ci;
    var winOrNot = new Boolean(true);
    for(ri=0; ri<8; ri++){
        winOrNot = true;
        for(ci=1; ci<3; ci++){
            if( ttt[winLines[ri][ci]] == "" ){
                winOrNot = false;
                break;
            }
            if( ttt[winLines[ri][ci]] != ttt[winLines[ri][ci-1]] ){
                winOrNot = false;
                break;
            }
         
        }
        if( winOrNot == true ){
            if( ttt[winLines[ri][0]] == "X" ){
                document.getElementById('result').innerHTML = "玩家獲勝！";          
            }
            else {
                document.getElementById('result').innerHTML = "電腦獲勝！";
            }
            endOrNot = true;
        }   

        if( total==9 && winOrNot==false ){
            document.getElementById('result').innerHTML = "平手！";
            endOrNot = true;
        }
    }
}













