export function passwordCheck(password) {
    // 正则判断数字,大小写字母以及特殊字符
    var flag = '';
    var isDigit = /^.*[0-9]+.*/; //number
    var isLowerCase = /^.*[a-z]+.*/; //lower letters
    var isUpperCase = /^.*[A-Z]+.*/; //uppercase letters
    var regEx = /^.*[^a-zA-Z0-9]+.*/; //special symbols
    var i = 0;
    if (password === '' || password.length < 8 || password.length > 20) {
        //flag = '密码长多不正确,应为8-20个字符';
        // alert(flag);
        return 1;
    } else {
        // 每满足一个条件i+1
        if (isDigit.test(password)) {
            i = i + 1;
        }
        if (isLowerCase.test(password)) {
            i = i + 1;
        }
        if (isUpperCase.test(password)) {
            i = i + 1;
        }
        if (regEx.test(password)) {
            i = i + 1;
        }
        if (i <= 2) {
            //flag = '密码强度不够,应为大写字母,小写字母,数字和特殊字符';
            // alert("The complexity of password is not enough to protect your account");
            // alert("Please make sure that your password have lowercase, uppercase, number or special symbol");
            return 2;
        } else {
            // alert("The password is ok!");
            return 3;
        }
    }
}