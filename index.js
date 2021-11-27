const form = document.getElementById("form");
const input = document.getElementById("input");
//ulタグの子供としてliタグを追加したいのでulをhtmlから取得
const ul = document.getElementById("ul");

//ローカルストレージからデータを取得。localStorage.getItem('キー');
//文字列だと扱いにくいのでJSONに変換
const todos = JSON.parse(localStorage.getItem("todos"));

//もしtodosが空でなければliタグを追加
if (todos){
  todos.forEach(todo => {
    add(todo);
  })
}


form.addEventListener("submit",function(event){
  //preventDefaultで画面のリロードを無効に
  event.preventDefault();
  console.log(input.value);
  //formをsubmitした時に値をhtmlにリストとして追加していく関数名add
  //先に関数を使う呼び出し元をを記述してからだとコードがわかりやすい、どのように使うかがわかるため
  add();
})

function add(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }
  //空でsubmitしてもリストが作成されないように条件分岐を使う
  //文字数を数える時はlengthを使う0より多い、つまり一文字でも入力されていればtrue　todoText.length > 0
  //todoTextにはユーザが何も入力しなければ空文字が入るため型変換によってfalseが返される
  if (todoText){
    //document.createElementでタグの追加
  const li = document.createElement("li");
  //liの値はinnerTextで指定出来る、中身はinput.value
  li.innerText = todoText;
  //デザインを整えるため作成されたliタグにclassListでクラスを追加
  li.classList.add("list-group-item");

  //todoがcompletedならhtmlのclassを持ってるようにする
  if (todo && todo.completed){
    li.classList.add("text-decoration-line-through");
  }

  //削除機能の追加
  //右クリックはcontextmenuで検知できる
  li.addEventListener("contextmenu",function
  (event){
    //preventDefaultで右クリックのメニュー表示を無効に
    event.preventDefault();
    //liタグの削除
    li.remove();
    //ローカルストレージに反映
    saveData();
  })

  //完了マーク（取り消し線）を左クリックしたら付ける
  li.addEventListener("click",function(){
    //classListでbootstrapのclassを付ける
    //toggleはclassが付いていれば消しなければ付ける切り替え
    li.classList.toggle("text-decoration-line-through");
    saveData();
  })


  //ulタグの子供としてappendChildでliタグを追加
  ul.appendChild(li);
  //submitしたらformを空に
  input.value = "";
  //画面がリロードしてもリストが消えないようにローカルストレージに保存する
  saveData();
  }
}

function saveData() {
  //querySelectorAllでhtmlのliタグを全て取ってくる
  const lists = document.querySelectorAll("li");
  //ローカルストレージに保存する際に配列で保存すると扱いやすいので空配列を定義
  let todos = [];
  //listsのテキスト情報をforEachを使って全て取得
  //listラベルをつける
  lists.forEach(list => {
    //取り消し線がついた（完了）状態での保存
    let todo = {
      text: list.innerText,
      //classを持っているかどうかで完了状態かどうかを判断、持っていればtrueなければfalse
      //containsでクラスを持ってるかを確かめる
      completed: list.classList.contains("text-decoration-line-through")
    };
    //pushで配列に格納
    todos.push(todo);
  });
  //ブラウザにデータをlocalStorageを使って保存。キーはtodos
  //値はJSONに変換する
  localStorage.setItem("todos",JSON.stringify(todos));
}