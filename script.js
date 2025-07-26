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
//fonction qui transformera le Mot à chercher en objet {lettre:[positions]}
const leMotToObject = (leMot) => {
    let arr = leMot.split('');
    let obj = {};
    arr.forEach((el,i)=>{
        if(!obj[el]){
            obj[el]=[i];
        }else{
            obj[el].push(i)
        }
    })
    return obj
}

function validFunction(leMot){
    //partie qui gère la validation des couleurs
    const objMot = leMotToObject(leMot);
    console.log(objMot);
    for(let lettre in objMot){
        console.log(lettre)

        for(let count = 0 ; count<objMot[lettre].length; count++){
        if(answer.some(el=>el===lettre)){
            objMot[lettre].filter(el=>answer[el]===lettre).forEach(i=>{
                document.querySelector(`#row${r}case${i}`).style.backgroundColor = 'green';
                answer[i]=' ';
                count++;
            })
            console.log(count);
            let index = answer.findIndex((el,i)=>el===lettre&&!lettre[i]);
            if(index>=0&&count!==objMot[lettre].length){
                document.querySelector(`#row${r}case${index}`).style.backgroundColor = 'yellow'
                answer[index]=' '
                count++
            }
        }
        console.log(answer);
    }}
    answer.forEach((ele,i)=>{
            ele!==' '&&(document.querySelector(`#row${r}case${i}`).style.backgroundColor = 'grey')
    });

    

    //partie qui gère l'affichage de l'indice
    if(answer.some(ele=>ele!==" "&&r!==5)){
        if(r==4){
            const div = document.querySelector('#result')
            div.textContent = "Courage!"
            div.innerHTML += `<div class = 'image_cont'><img src=./img/${image}.jpg></div>`
        }
        c=0
        r++
    
    answer = []

    //partie qui gère l'affichage de "GAME OVER"
    }else if(answer.some(ele=>ele!==" "&&r===5)){
        const div = document.querySelector('#result');
        div.textContent = "GAME OVER";
        div.setAttribute('class', "loose");
    
    //partie qui gère l'affichage de "You Win!"
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
        
        validFunction(motCherche);

    }else if(patternEnter.test(touch)&&c!==motCherche.length){
        document.querySelector(`#result`).textContent = "Not enough letters !"
    }
    
    
})






