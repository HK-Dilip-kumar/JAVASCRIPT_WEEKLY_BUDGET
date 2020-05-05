//class
class Budget{
    constructor(budget){
        this.budget=Number(budget);
        this.budgetLeft= this.budget;
    }
    //subtract from budget
    subtractFromBudget(amount)
    {
        return this.budgetLeft -=amount;
    }

}

//Everything related to HTML
class HTML{
        //insert the budget when user submits it
        insertBudget(amount)
        {
                budgetTotal.innerHTML=`${amount}`;
                budgetLeft.innerHTML=`${amount}`;
        }


        //Displays a message correct or inavlid
        printmessage(message,className){
            const messageWrapper=document.createElement('div');
                  messageWrapper.classList.add('text-center','alert',className);
                  messageWrapper.appendChild(document.createTextNode(message));

                    //INSERT INTO HTML
                    document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);
        }
        
        //display the expenses from the form into the List
        addExpenseToList(name, amount)
        {
            const expensesList= document.querySelector('#expenses ul');

            //create a li
            const li=document.createElement('li');
            li.className="list-group-item d-flex justify-content-between align-items-center";

            //create a template
            li.innerHTML=`
                ${name}
                <span class="badge badge-primary badge-pill">${amount}</span>
            `;
            //insert into the li
            expensesList.appendChild(li); 
        }
        //subtract expense amount from budget
        trackBudget(amount){
            const budgetLeftDollars= budget.subtractFromBudget(amount);
            budgetLeft.innerHTML=`${budgetLeftDollars}`;

        }
}



const addExpenseForm=document.querySelector('#add-expense'),
      budgetTotal=document.querySelector('span#total'),
      budgetLeft=document.querySelector('span#left');
let budget, userBudget;

//instantiate the HTML class
const html= new HTML();

//eventlistener
eventlisteners();
function eventlisteners()
{
    //AppInit
    document.addEventListener('DOMContentLoaded',function(){

            //Ask the visitor weekly budget
            userBudget=prompt("Whats your weekly budget?");

            if(userBudget=== null)
            {
                    window.location.reload();
            }else{
                budget= new Budget(userBudget);
                
                html.insertBudget(budget.budget);
            }
    });
    
    //when a new expense is added
    addExpenseForm.addEventListener('submit',function(e){

        e.preventDefault();
        const expenseName=document.querySelector('#expense').value;
        const amount=document.querySelector('#amount').value;
        
        if(expenseName === "" || amount === "" )
        {
            html.printmessage('There was error....  All fields are mandatory!','alert-danger');
        }
        else{
                    //add all the expenses into the list
                    html.addExpenseToList(expenseName, amount);
                    html.trackBudget(amount);
         }

    })
}

