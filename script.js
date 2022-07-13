
class Puissance4 
{

    constructor(element_id, player1 = "Player", player2 = "Player", rows = 6, cols = 7, color1 = 'red', color2 = 'yellow', score1 = 0, score2 = 0)
    {
        // set attributes
        this.player1 = player1;
        this.player2 = player2;

        this.score1 = score1;
        this.score2 = score2;
        
        this.color1 = color1;
        this.color2 = color2;

        // rows et cols modifialbes
        this.rows = rows;
        this.cols = cols;

        this.board = Array(this.rows);
        for (let i = 0; i < this.rows; i++) 
        {
        this.board[i] = Array(this.cols).fill(0);
        }
        // tour du joueur
        this.turn = 1;
        // Nombre de coups joués
        this.moves = 0;
        // winner à null / modif à la victoire
        this.winner = null;

        this.element = document.querySelector(element_id);
        this.element.addEventListener('click', (event) => this.handle_click(event)); // a voir

        this.render();
    }

    /* Affichage*/
    render() 
    {
        let table = document.createElement('table');

        for (let i = this.rows - 1; i >= 0; i--) 
        {
        let tr = table.appendChild(document.createElement('tr'));
        for (let j = 0; j < this.cols; j++) 
        {
            let td = tr.appendChild(document.createElement('td'));
            let color = this.board[i][j];
            if (color)
            {
                td.className = 'player' + color;

                if(color == 1)
                {
                    td.setAttribute("style", "background-color: " + this.color1);
                }
                else
                {
                    td.setAttribute("style", "background-color: " + this.color2);
                }
            }
            td.dataset.column = j;
        }
        }
        this.element.innerHTML = '';
        this.element.appendChild(table);

        let status = document.createElement('div');
        status.className = 'status';
        status.innerHTML = 'Player : '+ (this.turn == 1 ? this.player1 + '(' + this.color1 + ')' : this.player2 + '(' + this.color2 + ')') + ' turn';
        this.element.appendChild(status);

        if (this.winner !== null)
        {
            status.innerHTML += '<br>Player ' + (this.winner == 1 ? this.player1 + '(' + this.color1 + ')' : this.player2 + '(' + this.color2 + ')') + ' win';
        }

        if (this.moves >= this.rows * this.cols)
        {
            status.innerHTML += '<br>Null game';
        }

        //change name
        let change_name = document.createElement('div');
        change_name.className = 'change_name';
        change_name.innerHTML = '<br>Choose your name : <br> <button class="modif_player1">' + this.player1 + '(' + this.color1 + ')' + '</button> <button class="modif_player2">' + this.player2 + '(' + this.color2 + ')' + '</button>';
        this.element.appendChild(change_name);
        
        //rows et cols modifialbes
        
        let modif = document.createElement('div');
        modif.className = 'modif';
        modif.innerHTML = '<br>Modif : <br> <button class="modif_row">Rows</button> <button class="modif_col">Columns</button>';
        this.element.appendChild(modif);
        
        let rows = document.createElement('div');
        rows.className = 'rows';
        rows.innerHTML = 'Rows actually : ' + this.rows;
        this.element.appendChild(rows);

        let cols = document.createElement('div');
        cols.className = 'cols';
        cols.innerHTML = 'Columns actually : ' + this.cols;
        this.element.appendChild(cols);

        //modif color
        let modif_color = document.createElement('div');
        modif_color.className = 'modif_color';
        modif_color.innerHTML = '<br>Modif color :<br> <button class="player_one_color" style="background-color:' + this.color1 + ';">' + this.color1 + '</button> <button class="player_two_color" style="background-color:' + this.color2 + ';">' + this.color2 + '</button>';
        this.element.appendChild(modif_color);
        
        //score
        let score = document.createElement('div');
        score.className = 'score';
        score.innerHTML = '<br>Score :<br>' + this.player1 + '(' + this.color1 + ')' + ' : ' + this.score1 + '<br>' + this.player2 + '(' + this.color2 + ')' + ' : ' + this.score2;
        this.element.appendChild(score);

        //cancel
        let cancel = document.createElement('button');
        cancel.className = 'cancel';
        cancel.innerHTML = 'Cancel';
        this.element.appendChild(cancel);

    }

    player_one_name()
    {
        let name = prompt("Your name Player" + this.color1 + " : ");
        this.player1 = name;
    }

    player_two_name()
    {
        let name = prompt("Your name Player" + this.color2 + " : ");
        this.player2 = name;
    }

    modif_rows()
    {
        let rows = prompt("Rows : ");
        this.rows = rows;
    }

    modif_cols()
    {
        let cols = prompt("Columns : ");
        this.cols = cols;
    }

    player_one_color()
    {
        let color = prompt("Color1 : ");
        this.color1 = color;
    }

    player_two_color()
    {
        let color = prompt("Color2 : ");
        this.color2 = color;
    }

    set(row, column, player) //player = this turn
    {
    // On colore la case
    this.board[row][column] = player;
    // On compte le coup
    this.moves++;
    }


    play(column) 
    {
        // Trouver la première case libre dans la colonne
        let row;
        for (let i = 0; i < this.rows; i++) 
        {
            if (this.board[i][column] == 0) 
            {
                row = i;
                break;
            }
        }
        if (row === undefined) 
        {
            return null;
        } 
        else 
        {
            // Effectuer le coup
            this.set(row, column, this.turn);

            // Renvoyer la ligne où on a joué
            return row;
        }
    }

    handle_click(event) 
    {

        
        // Vérifier si la partie est encore en cours
        if (this.winner !== null) 
        {
            if (window.confirm("Fiinshed!\nDo you want to restart a new game ?")) 
            {
                this.reset();
                this.render();
            }
            return;
        }
        
        let column = event.target.dataset.column;

        if(event.target.className == "modif_player1")
        {
            this.player_one_name();
            this.render();
        }
        if(event.target.className == "modif_player2")
        {
            this.player_two_name();
            this.render();
        }

        // color player 1
        if (event.target.className == 'player_one_color')
        {
            this.player_one_color();
            this.render();
        }
        // color player 2
        if (event.target.className == 'player_two_color')
        {
            this.player_two_color();
            this.render();
        }

        // modifier les rows et cols
        if (event.target.className == 'modif_row')
        {
            this.modif_rows();
            this.render();
        }
        if (event.target.className == 'modif_col')
        {
            this.modif_cols();
            this.render();
        }

        //cancel
        if (event.target.className == 'cancel')
        {
            this.cancel(column);
            this.render();
        }

        if (column !== undefined) 
        {
            column = parseInt(column);
                let row = this.play(parseInt(column));
            
            if (row === null) 
            {
                window.alert("Column is full!");
            } 
            else 
            {
                // Vérifier s'il y a un gagnant, ou si la partie est finie
                if (this.win(row, column, this.turn)) 
                {
                this.winner = this.turn;
                } 
                else if (this.moves >= this.rows * this.columns) 
                {
                this.winner = 0;
                }
                // tour : 3 - 2 = /1/ ; 3 - 1 = /2/
                this.turn = 3 - this.turn;

                this.render()
                

                switch (this.winner) 
                {
                case 0: 
                    window.alert("Null game!!"); 
                    break;
                case 1:
                    this.score1++;
                    window.alert("Player 1 (red) win !"); 
                    break;
                case 2:
                    this.score2++;
                    window.alert("Player 2 (yellow) win !"); 
                    break;
                }
            }
        }
    }

    cancel(column)
    {
        console.log(column);
        if (this.moves > 0)
        {
            this.turn = 3 - this.turn;
            this.moves--;

            // Effacer la dernière case
            let cancel_row;
            let row;
            for (let i = 0; i < this.rows; i++)
            {
                if (this.board[i][column] == 0) 
                {
                    row = i; // recup i - 1;
                    cancel_row = i - 1;
                    break;
                }
            }
            console.log(cancel_row);
            console.log(column);
            
            this.board[cancel_row][column] = 0;
            // console.log(row);

            // //supprimer la dernière case
            // let td = document.querySelector('td[data-column="' + column + '"]');
            // console.log(td);
            // td.className = '';
        }
    }




    win(row, column, player) 
    {
            // Horizontal
        let count = 0;
        for (let j = 0; j < this.cols; j++) 
        {
            count = (this.board[row][j] == player) ? count+1 : 0;
            if (count >= 4) return true;
        }
            // Vertical
        count = 0;
        for (let i = 0; i < this.rows; i++) 
        {
            count = (this.board[i][column] == player) ? count+1 : 0;
                if (count >= 4) return true;
        }
            // Diagonal
        count = 0;
        let shift = row - column;
        for (let i = Math.max(shift, 0); i < Math.min(this.rows, this.cols + shift); i++) 
        {
            count = (this.board[i][i - shift] == player) ? count+1 : 0;
                if (count >= 4) return true;
        }
            // Anti-diagonal
        count = 0;
        shift = row + column;
        for (let i = Math.max(shift - this.cols + 1, 0); i < Math.min(this.rows, shift + 1); i++) 
        {
            // console.log(i,shift-i,shift)
            count = (this.board[i][shift - i] == player) ? count+1 : 0;
            if (count >= 4) return true;
        }
        
        return false;
    }


    reset() 
    {
        for (let i = 0; i < this.rows; i++) 
        {
            for (let j = 0; j < this.cols; j++) 
            {
                this.board[i][j] = 0;
            }
        }
        this.move = 0;
        this.winner = null;
    }
}

// assignation de la balise 
let p4 = new Puissance4('#game');