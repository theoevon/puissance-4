class info{
    constructor(){
        
    }
    get_nom(){
        let nom = [];
        for(let i = 1; i <= 2; i++){
            nom.push(document.getElementById("pseudo_j"+i).value);
        }
        return nom;
    }
    get_color(){
        let color = [];
        for(let i = 1; i <= 2; i++){
            color.push(document.getElementById("color_j"+i).value);
        }
        return color;
    }
}
class tableau{
    constructor(){
        this.id_joueur = 0;
        this.tour = 1;
        this.compteur = 2;
        this.match_nul = 0;
        this.win = null;
        this.finish = false;
        this.nbr_puissance = 0;
        this.scorej1 = 0;
        this.scorej2 = 0;
    }
    create_tab(row,column){
        this.row = row;
        this.column = column;
        this.X = 0;
        this.Y = 0;
        let table = document.getElementById("table");
        this.grille = [];
        for(let i = 0; i < this.column; i++){
            const row = document.createElement("tr");
            table.appendChild(row);
            let grille_add = [];
            this.Y += 1;
            this.X = 1;
            for(let j = 0; j < this.row; j++){
                const column = document.createElement("td");
                row.appendChild(column);
                column.setAttribute("class",this.X+"/"+this.Y);
                this.X += 1;
                grille_add.push("0");
            }
            this.grille.push(grille_add);
        }
    }
    create_joueur(name,couleur){
        this.id_joueur += 1;
        document.getElementById("joueur"+this.id_joueur).innerHTML = name + " : "+this.scorej1;
        document.getElementById("joueur"+this.id_joueur).style.color = couleur;
        return this.id_joueur + "%" +couleur+ "%" +name;
    }
    play(joueur1,joueur2){
        const split_j1 = joueur1.split('%');
        const split_j2 = joueur2.split('%');
        this.colorj1 = split_j1[1];
        this.colorj2 = split_j2[1];
        this.namej1 = split_j1[2];
        this.namej2 = split_j2[2];
        for(let i = 0; i < document.getElementsByTagName("td").length; i++){
            document.getElementsByTagName("td")[i].addEventListener("click",(e) =>{
                let coordonnées = document.getElementsByTagName("td")[i].className;
                let co_split = coordonnées.split("/");
                for(let j = this.column-1; j >= 0; j--){
                    if(this.grille[j][co_split[0]-1] == 0){
                        if(this.tour == 1){
                            this.grille[j][co_split[0]-1] = split_j1[0];
                            let value = j + 1;
                            document.getElementsByClassName(co_split[0]+"/"+value)[0].style.backgroundColor = split_j1[1];
                            document.getElementById("joueur"+split_j1[0]).style.fontSize = "30px";
                            document.getElementById("joueur"+split_j2[0]).style.fontSize = "45px";
                            this.tour = 2;
                            this.win = 1;
                        }
                        else{
                            this.grille[j][co_split[0]-1] = split_j2[0];
                            let value = j + 1;
                            document.getElementsByClassName(co_split[0]+"/"+value)[0].style.backgroundColor = split_j2[1];
                            document.getElementById("joueur"+split_j1[0]).style.fontSize = "45px";
                            document.getElementById("joueur"+split_j2[0]).style.fontSize = "30px";
                            this.tour = 1;
                            this.win = 2;
                        }
                        this.match_nul += 1;
                        this.check_horizontal();
                        this.check_vertical();
                        this.check_diagonal();
                        this.check_diagonal(true);
                        this.check_match_nul();
                        this.print_win();
                        this.change_score();
                        return;
                    }
                }
            })
        }
    }
    check_vertical(){
        let regex = new RegExp("1111|2222");
        this.tab  = [];
        for(let i = 0; i < this.row; i++){
            let tab_add = [];
            for(let j = 0; j < this.column; j++){
                tab_add.push(this.grille[j][i]);
            }
            this.tab.push(tab_add);
        }
        for(let i = 0; i < this.row; i++){
            let check = this.tab[i].join('');
            if(regex.test(check)){
                document.getElementsByClassName("blue")[0].style.pointerEvents = "none";
                this.finish = true;
                this.nbr_puissance += 1;
            }
        }
    }
    check_horizontal(){
        let regex = new RegExp("1111|2222")
        for(let i = 0; i < this.column; i++){
            let check = this.grille[i].join('');
            if(regex.test(check)){
                document.getElementsByClassName("blue")[0].style.pointerEvents = "none"; 
                this.finish = true;
                this.nbr_puissance += 1;
            }
        }
    }
    check_diagonal(bottomToTop){
        let Ylength = this.grille.length;
        let Xlength = this.grille[0].length;
        let maxLength = Math.max(Xlength, Ylength);
        let temp;
        let returnArray = [];
        let regex = new RegExp("1111|2222");
        for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
            temp = [];
            for (let y = Ylength - 1; y >= 0; --y) {
                let x = k - (bottomToTop ? Ylength - y : y);
                if (x >= 0 && x < Xlength) {
                    temp.push(this.grille[y][x]);
                }
            }
            if(temp.length > 0) {
                returnArray.push(temp.join(''));
            }
        }
        returnArray.forEach(element => {
            if(regex.test(element)){
                document.getElementsByClassName("blue")[0].style.pointerEvents = "none";
                this.finish = true;
                this.nbr_puissance += 1;
            }
        });
    }
    check_match_nul(){
        let result = this.row * this.column;
        if(this.match_nul == result && this.finish != true){
            document.getElementsByClassName("blue")[0].style.pointerEvents = "none";
            document.getElementById("win_message").innerHTML = "match nul";
        }
    }
    print_win(){
        if(this.finish == true){
            if(this.win == 1){
                document.getElementById("win_message").innerHTML = this.namej1+" a gagné avec "+this.nbr_puissance+" puissance 4 !";
                document.getElementById("win_message").style.color = this.colorj1;
            }
            else{
                document.getElementById("win_message").innerHTML = this.namej2+" a gagné avec "+this.nbr_puissance+" puissance 4 !";
                document.getElementById("win_message").style.color = this.colorj2;
            }
            document.getElementById("win_message").style.display = "block";
        }
    }
    change_score(){
        if(this.finish == true){
            if(this.win == 1){
                this.scorej1 += 1;
                document.getElementById("joueur1").innerHTML = this.namej1 + " : " +this.scorej1;
            }
            else{
                this.scorej2 += 1;
                document.getElementById("joueur2").innerHTML = this.namej2 + " : "+this.scorej2;
            }
        }
    }
    leave(){
        document.getElementById("quitter").addEventListener("click", () =>{
            window.location.href=window.location.href;
        })
    }
    replay(){
        document.getElementById("replay").addEventListener("click", () =>{
            let result = this.column * this.row;
            for(let i = 0; i < result; i++){
                document.getElementsByTagName("td")[i].style.backgroundColor = "";
            }
            for(let j = 0; j < this.column; j++){
                for(let i = 0; i < this.row; i++){
                    this.grille[j][i] = 0;
                    console.table(this.grille);
                }
            }
            this.tour = 1;
            document.getElementById("joueur1").style.fontSize = "45px";
            document.getElementById("joueur2").style.fontSize = "30px";
            this.finish = false;
            document.getElementsByClassName("blue")[0].style.pointerEvents = "unset";
            this.nbr_puissance = 0;
            document.getElementById("win_message").style.display = "none";
            this.match_nul = 0;
        })
    }
    audio(){
        let myAudio = new Audio('song.mp3'); 
        if (typeof myAudio.loop == 'boolean')
        {
            myAudio.loop = true;
        }
        else
        {
            myAudio.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
        }
        myAudio.play();
        myAudio.volume = 0.05;
    }
}

document.getElementById("play").addEventListener("click", function value(){
    if(document.getElementById("pseudo_j1").value != "" && document.getElementById("pseudo_j2").value != "" && document.getElementById("color_j1").value != document.getElementById("color_j2").value){
        document.getElementById("error_message").style.display = "none";
        document.getElementById("replay").style.display ="block";
        document.getElementById("quitter").style.display ="block";
        const exe = new info;
        const tab_nom = exe.get_nom();
        const tab_color = exe.get_color();
        document.getElementsByClassName("blue")[0].style.display = "block";
        document.getElementById("formulaire").style.display = "none";
    
        const exec = new tableau;
        exec.create_tab(7,6);
        const joueur1 = exec.create_joueur(tab_nom[0],tab_color[0]);
        const joueur2 = exec.create_joueur(tab_nom[1],tab_color[1]);
        exec.play(joueur1,joueur2);
        exec.leave();
        exec.replay();
        exec.audio();
    }
    else{
        document.getElementById("error_message").style.display = "block";
    }
})