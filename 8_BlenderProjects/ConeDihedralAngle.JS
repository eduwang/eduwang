//to check received value is float
function isFloat(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

//계산 함수
function calculateAngle() {
    // Get input values from the html
    var receivedR = document.getElementById('radius').value;
    var receivedH = document.getElementById('height').value;
    var receivedE = document.getElementById('edges').value;

    //float 형태로 변환
    var coneR = parseFloat(receivedR);
    var coneH = parseFloat(receivedH);
    var coneE = parseFloat(receivedE);

    //모선의 길이
    var generatrix = Math.sqrt(coneR**2+coneH**2);
    //console.log(generatrix);

    //밑면의 변 길이
    var bottomEdge = Math.sqrt(coneR**2+coneR**2-2*coneR*coneR*Math.cos(2*Math.PI/coneE));
    //console.log(bottomEdge);

    //이면각을 이루는 삼각형의 변의 길이 구하기
    var targetA = 2*bottomEdge*Math.sin(Math.PI*(1-(coneE**(-1))));
    //console.log(targetA);
    var targetB = generatrix**(-1)*bottomEdge*Math.sqrt(generatrix**2-0.25*bottomEdge**2);
    //console.log(targetB);

    //이면각 구하기
    var targetAngleR = Math.acos((2*targetB**2-targetA**2)/(2*targetB**2));  //Radians
    //radian to degree
    var targetAngleD = (targetAngleR*180) / Math.PI;


    // Display input values on the web page
    var displayDataElement = document.getElementById('calculateResult');
    if (!isFloat(coneR) || !isFloat(coneH) || !isFloat(coneE)){
        displayDataElement.innerHTML = '세 칸 모두 숫자(정수 또는 유리수)만 입력해주세요!'
    } else{
        displayDataElement.innerHTML = Math.floor(targetAngleD*10**4)/10**4;
    }

    // You can also perform other operations with the received data, such as sending it to a server using AJAX, manipulating it, etc.
}