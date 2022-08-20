const UserController = require('../Controller/UserController')
const {resolve} = require("path");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const router = app => {
    app.post('/', (request, response) => {
        console.log(request.body)
        response.send({
            message: 'Node.js and Express REST API'
        });
    });

    app.post('/translate', async (req, res)=>{
        let finish = await UserController.translate(req.body.word)
        res.status(200).send({message: finish})
    })
}


module.exports = router;

//Опросник для начала работы


let startRequest = async ()=>{
    return new Promise((resolve)=>{
        readline.question("Если авторизовался напиши y: ", async function(answer) {
            if(answer === 'y'){
                await UserController.translate()
            }
            resolve()
        });
    })

}



let startBrowserQuestion = async ()=>{ // отвечает за считывание и за запуск браузера
    return new Promise(resolve=>{
        readline.question("Напиши start для отправки запросов: ", async function (answer) {
            if (answer === 'start') {
                await UserController.readRequstTxt()
            }
            resolve()
        })
    })
}


const main = async ()=>{
    await startBrowserQuestion()
    await startRequest()
    //readline.close();
}
main()

//console.log('Запуск startRequest')







