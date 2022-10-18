function TaskList() {
    this.arr = [],
        this.findIndex = function (id) {
            var index = -1;
            for (var i = 0; i < this.arr.length; i++) {
                if (this.arr[i].id === id) {
                    index = i;
                    break;
                }
            }
            return index;
        },
        this.addTask = function (task) {
            this.arr.push(task);
        },
        this.deleteTask = function (index) {
            this.arr.splice(this.findIndex(index), 1);
        },
        this.getTaskById = function (id) {
            var tmp;
            for (var i = 0; i<this.arr.length; i++){
                tmp = this.arr[i]
                if (tmp.id === id){
                    break;
                }
            }
            return tmp;
        }
        // this.updateTask = function (object) {
        //     return object.status === 'todo' ? 'completed' : 'todo'
        // }
}