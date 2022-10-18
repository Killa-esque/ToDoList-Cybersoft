var validation = {
    checkEmpty: function (value,errId) {
        if (value.trim() === ''){
            document.getElementById(errId).style.display = 'block'
            document.getElementById(errId).display = 'block'
            document.getElementById(errId).innerHTML = `You need to fill this blank`
            return false;
        }
        document.getElementById(errId).style.display = 'none'
        return true;
    },
    checkDuplicate: function (arr,value,errId){
        var flag = false;
        for (var i = 0; i<arr.length; i++){
            if (value.trim() === arr[i].taskName.trim()){
                alert('Already exist !!!');
                return false;
            }
        }
        return true;
    }
}