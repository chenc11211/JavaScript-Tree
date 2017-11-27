
;
window.onload=function () {
    function Node(data) {
        this.data=data;
        this.children=data.children;
        this.parent=data.parentNode;
    }

    function Tree(data) {
        this.root=new Node(data);
    }
    // 后序遍历
    Tree.prototype.lrd=function (callback) {
        (function search(currentNode) {
            for (let i=0;i<currentNode.children.length;i++){
               let childNode=new Node(currentNode.children[i]);
                search(childNode);
            }
            callback(currentNode);

        })(this.root);
    };

    // 前序序遍历
    Tree.prototype.dlr=function (callback) {
        var queueList=[];
        queueList.push(this.root);
        var currentTree=queueList.shift();
        while (currentTree){
            for (let i=currentTree.children.length-1;i>=0;i--){
                queueList.unshift(new Node(currentTree.children[i]));
            }
            callback(currentTree);
            currentTree=queueList.shift();
        }
    };

    //添加节点
    Tree.prototype.add=function (str) {
        var targetNode=document.querySelector('.selected');
        if (!targetNode){
            alert('请选择一个节点！');
            return false;
        }
        var addNode=document.createElement('div');
        var addText=document.createTextNode(str);
        addNode.appendChild(addText);
        targetNode.appendChild(addNode);
    };

    //删除节点
    Tree.prototype.remove=function () {
        var targetNode=document.querySelector('.selected');
        if (!targetNode){
            alert('请选择一个节点！');
            return false;
        }
        targetNode.parentNode.removeChild(targetNode);
    };



    var btn_dlr=document.getElementById('dlr');
    var btn_lrd=document.getElementById('lrd');
    var ORoot=document.getElementById('root');
    var OContainer=document.getElementById('container');
    var DivList=OContainer.getElementsByTagName('div');
    var timeList=[];   //数组用于存放计时器队列

    // 触发后序遍历
    btn_lrd.onclick=function () {
        // 清除并重置队列
        for (var timer in timeList){
            clearTimeout(timeList[timer]);
        }
        timeList=[];
        var DOMTree=new Tree(ORoot);
        var n=1;
        ORoot.style.backgroundColor='white';
        DOMTree.lrd(function (currentNode) {
            timeList.push(setTimeout(function () {
                var Odom=currentNode.data;
                for (let i=0;i<DivList.length;i++){
                    DivList[i].style.backgroundColor='white';
                }
                /*
                try {
                    Odom.lastElementChild.style.backgroundColor='white';
                }
                catch (err){

                }
                try {
                    Odom.previousElementSibling.style.backgroundColor='white';
                }
                catch (err){

                }*/

                Odom.style.backgroundColor='green';
            },500*(n++))
            );
        });
    };

    // 触发前序遍历
    btn_dlr.onclick=function () {
        // 清除并重置队列
        for (var timer in timeList){
            clearTimeout(timeList[timer]);
        }
        timeList=[];
        var n=1;
        ORoot.style.backgroundColor='white';
        var DOMTree=new Tree(ORoot);
        DOMTree.dlr(function (startNode) {
            timeList.push(setTimeout(function () {
                for (let i=0;i<DivList.length;i++){
                    DivList[i].style.backgroundColor='white';
                }
                startNode.data.style.backgroundColor="green";
            },500*(n++)));

        });

    };

    //点击选中
    OContainer.onclick=function (ev) {
        var event=ev||window.event;
        var OSelected=document.querySelector('.selected');
        if(OSelected){
            var classList=OSelected.getAttribute('class').split(/\s+/);
            for (let i=0;i<classList.length;i++){
                if(classList[i]=='selected'){
                    classList.splice(i,1);
                    break;
                }
            }
            OSelected.setAttribute('class',classList.join(' '));
        }
        event.target.setAttribute('class',event.target.getAttribute('class')+' selected');
    };

    //触发添加节点
    var addBtn=document.getElementById('add');
    var addInput=document.getElementById('add_content');
    addBtn.onclick=function () {
        var text=addInput.value;
        var DOMTree=new Tree(ORoot);
        DOMTree.add(text);
    };

    //绑定删除节点
    var removeBtn=document.getElementById('remove');
    removeBtn.onclick=function () {
        var DOMTree=new Tree(ORoot);
        DOMTree.remove();
    }

};