let r = 0;
let c = 0;
let answer =[]
let motCherche = "";
let gameId ="";
let image=""
//récupération du mot et création de la grille
document.querySelector('#newGame').addEventListener('click', function (){

    fetch('https://woordle-backend.vercel.app/game/new', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        //initialisation
                       if (!data.result) return;
                        r = 0; c = 0;
                        let board = document.querySelectorAll(".letter-row")
                        board.length!==0 ? 
                        board.forEach(node=>document.getElementById("game-board").removeChild(node)):"";
                        motCherche = data.word;
                        // console.log(motCherche)
                        gameId = data.gameId;
                        image = data.image;
                        answer = [];
			            document.querySelector('#gameId').textContent = data.gameId;
                        const div = document.querySelector('#result')
                        div.textContent = ""
                        div.class = "";
                        
                        //création de grille
                        for (let i = 0; i<6; i++){
                            creatRow(data.wordLength, i);
                        }
                    });
    // console.log(newWord)
    
    
});

/**
 * goal: créer une ligne de x cases
 * arg : longueur du mot et numéro de ligne
 * return: none
 */
function creatRow(length, rowNbr){
    if(c<=length){let line = document.createElement('div');
    line.setAttribute('class', "letter-row");
    line.setAttribute('id', `row${rowNbr}`)
    document.querySelector("#game-board").appendChild(line);
    for(let i=0; i<length; i++ ){
        const caseRow = document.createElement('div')
        caseRow.setAttribute('class', "letter-box")
        // caseRow.setAttribute('onKeyUp', `${letter(rowNbr,i)}`)
        caseRow.setAttribute('id', `row${rowNbr}case${i}`)
        document.querySelector(`#row${rowNbr}`).appendChild(caseRow)
    }}
}

function addLetter(letter){
    if(c<motCherche.length){
        const div = document.querySelector('#result')
        div.textContent = ""
    }
    document.querySelector(`#row${r}case${c}`).textContent= letter.toUpperCase();
    answer.push(letter.toUpperCase());
    c++
    if(c===motCherche.length){
        const div = document.querySelector('#result')
        div.textContent = "Presser Entrée!"
    }
}

function backLetter(){
        answer.pop();
        c--;
        document.querySelector(`#row${r}case${c}`).textContent= "";
}

function validFunction(taille,leMot){
    console.log(taille)
    for(let i=0; i<taille; i++){
        
        // console.log(leMot)
        if(answer.some((ele)=>ele===leMot[i])){
            let index = answer.findIndex((ele)=>ele===leMot[i])
            if(leMot[i] === answer[i]){document.querySelector(`#row${r}case${i}`).style.backgroundColor = 'green'}
            else{console.log('ok'); document.querySelector(`#row${r}case${index}`).style.backgroundColor = 'yellow'};
            answer[index]=" ";
            }}
    answer.forEach((ele,g)=>ele!==" "?document.querySelector(`#row${r}case${g}`).style.backgroundColor = 'grey':"");

    if(answer.some(ele=>ele!==" "&&r!==5)){
        if(r==4){
            const div = document.querySelector('#result')
            div.textContent = "Courage!"
            div.innerHTML += `<div class = 'image_cont'><img src=./img/${image}.jpg></div>`
        }
        c=0
        r++
    
    answer = []
    }else if(answer.some(ele=>ele!==" "&&r===5)){
        const div = document.querySelector('#result');
        div.textContent = "GAME OVER";
        div.setAttribute('class', "loose");
    }else{
        const div = document.querySelector('#result');
        div.textContent = "You WON!";
        div.setAttribute('class', "won");
        c=0;
        r=0;

    } 
}

document.addEventListener('keyup',(e)=>{
    const pattern = /\b[a-z-A-Z]\b/i;
    const patternEnter = /\benter\b/i;
    const touch = `${e.key}`
    if(pattern.test(touch)&&c<motCherche.length){
        addLetter(touch);    
    
    }else if(touch==="Backspace"&&c>0){
        backLetter();

    }else if(patternEnter.test(touch)&&c===motCherche.length){
        
        validFunction(motCherche.length,motCherche);

    }else if(patternEnter.test(touch)&&c!==motCherche.length){
        document.querySelector(`#result`).textContent = "Not enough letters !"
    }
    
    
})






