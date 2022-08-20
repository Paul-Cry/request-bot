const puppeteer = require('puppeteer')
const path = require('path');
let fs = require('fs');
let requestForSearch

// const fetch = require('node-fetch');

// const response = await fetch('https://httpbin.org/post', {method: 'POST', body: 'a=1'});
// const data = await response.json();

var browser, page
let startBrowser = async ()=>{
    browser = await puppeteer.launch({headless: false});//headless: false показывать браузер
    page = await browser.newPage();
    await page.setViewport({
        width: 1280,
        height: 1024,
    });
    await page.goto('https://presearch.com/');
}


exports.readRequstTxt = async ()=>{
    console.log('Прочитка файла...')
    let promise = new Promise(resolve =>{
        fs.readFile(path.join(__dirname, 'data', 'request.txt'), 'utf8',async (err, data)=>{
            // console.log('data')
            // console.log(data)
            requestForSearch = data.split(',')
            console.log('Запускается браузер')
            startBrowser()
            console.log('Браузер запустился')
            resolve()
            // На этом этапе нужно будет написать авторизацию
        });
    })
    return promise

}



exports.translate = async ()=>{
    // let auth = async ()=>{
    //     let account = '#Home > div > div:last-child > div:last-child > div:last-child > div'
    //     await page.waitFor(1000);
    //     await page.click(`${account}`); // нажатие на кнопку
    //     console.log('click')
    // }
    // await auth()

    let nextPage = async (testWord)=>{
        // console.log('testWOrd')
        // console.log(testWord)
        let randomNumber = () =>{
            return (Math.random() * 1000) + 1000
        }
        await page.waitFor(randomNumber());
        await page.type(`#Home > div.flex-1.form-margin > div > div.flex-1.flex.items-center.relative > form > div > input`, `${testWord}`);

        await page.waitFor(randomNumber())
        console.log('Нажал')
        await page.click('#Home > div.flex-1.form-margin > div > div.flex-1.flex.items-center.relative > form > div > div > button')
        // await page.waitFor(5000)
        //await page.mainFrame().waitForNavigation()s
        await page.waitForSelector('.text-gray-300');
        try{
            let link = await page.evaluate(()=>{ // Здесь работаю с DOM
                //document.querySelector('.text-gray-300').childNodes[3]
                let masPages = []
                for(let index in document.querySelector('.text-gray-300').childNodes){ //  делаю проверку
                    if(document.querySelector('.text-gray-300').childNodes[index].tagName === 'DIV'){
                        masPages.push(document.querySelector('.text-gray-300').childNodes[index])
                    }
                }
                let href,href1, href2, href3, href4
                let choose = ()=>{
                    let indexRandom  = Math.floor(Math.random()*10)
                    let randomPage = masPages[indexRandom]
                    let divOne
                    for(let index in randomPage.childNodes){ //  делаю проверку
                        if(randomPage.childNodes[index].tagName === 'DIV'){
                            divOne = randomPage.childNodes[index]
                        }
                    }

                    let divNull = []
                    for(let index in divOne.childNodes){ //  делаю проверку
                        if(divOne.childNodes[index].tagName === 'DIV'){
                            divNull.push(divOne.childNodes[index])
                        }
                    }
                    try{
                        href = divNull[0]
                        href1 = href.childNodes[0]
                        href2 = href1.childNodes[0]
                        href3 = href2.childNodes[0]
                        href4 = href3.href
                    }catch (err){
                        choose()
                    }

                }
                choose()
                if(href4 === undefined){
                    choose()
                }
                return href4
                // try{
                //
                // }catch (er){
                //     console.error(er)
                // }

            })
            await page.waitFor(randomNumber())
            await page.click(`[href='${link}']`)
            await page.waitFor(randomNumber())
            await page.goBack();
            await page.waitFor(randomNumber())
        }catch (err){
            console.error(err)
        }
        await page.goto('https://presearch.com/');
    }

    for(let el of requestForSearch){
        //console.log('requestForSearch')
        //console.log(el.replace('\r\n', ''))
        let element = el.replace('\r\n', '')
        await nextPage(element)
    }
    //console.log(requestForSearch)

    // requestForSearch.filter((el)=>{
    //     let word = el.replace('\r\n', '')
    //     let word = el;
    //     return true
    // })

    // console.log('requestForSearch')
    // console.log(requestForSearch)


    //document.querySelector('.text-gray-300').childNodes[6].children[6] // пробежаться по массиву и найти div

    //поиск по селектору document.querySelector("[href='https://en.wikipedia.org/wiki/Syrian_Democratic_Forces']")
    // let area = '#panelTranslateText > div.lmt__sides_container > section.lmt__side_container.lmt__side_container--source > div.lmt__textarea_container > div.lmt__inner_textarea_container > textarea'
    // await page.type(`${area}`, `${word}`); // вписываю данные в input c id email
    // //await page.click('input[type="submit"]'); // нажатие на кнопку
    // const result = await page.evaluate(async()=>{ // Здесь работаю с DOM
    //     let transteRes
    //     let promise = new Promise((resolve => {
    //         let checkValue = setInterval(()=>{
    //             let word = document.querySelector("#panelTranslateText > div.lmt__sides_container > section.lmt__side_container.lmt__side_container--target > div.lmt__textarea_container > div.lmt__inner_textarea_container > textarea").value
    //             if(word.length > 1){
    //                 setTimeout(()=>{
    //                     transteRes = word
    //                     clearInterval(checkValue)
    //                     document.querySelector("#panelTranslateText > div.lmt__sides_container > section.lmt__side_container.lmt__side_container--target > div.lmt__textarea_container > div.lmt__inner_textarea_container > textarea").value = ''
    //                     document.querySelector("#panelTranslateText > div.lmt__sides_container > section.lmt__side_container.lmt__side_container--source > div.lmt__textarea_container > div.lmt__inner_textarea_container > textarea").value = ''
    //                     resolve()
    //                 }, 2000)
    //             }
    //
    //         }, 500)
    //     }))
    //     await promise
    //
    //     return transteRes
    // })
    //
    // // await browser.close();
    // return result
}













const testCheck = ()=>{
    console.log(200)
}
//
// const discord = async ()=>{
//     let Discorbrowser = await puppeteer.launch({headless: false});//headless: false показывать браузер
//     let Discordpage = await Discorbrowser.newPage();
//     await Discordpage.goto('https://discord.com/');
//     const result = await Discordpage.evaluate(async()=>{
//
//         document.addEventListener('keyup', async function(event){
//             if(event.keyCode === 35){
//                 console.log(123);
//                 console.log(123);
//                 console.log(123);
//                 console.log(123);
//                 console.log(123);
//                 console.log(123);
//                 console.log(123);
//                 testCheck()
//             }
//         })
//         return undefined
//     })
// }
// discord()

// document.addEventListener('keyup', async function(event){
//     if(event.keyCode === 35){
//         let value = document.querySelector("#app-mount > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div.container-1eFtFS > div > div.content-1SgpWY > div.chat-2ZfjoI > div > main > form > div:nth-child(1) > div > div > div.scrollableContainer-15eg7h.webkit-QgSAqd > div > div.textArea-2CLwUE.textAreaSlate-9-y-k2.slateContainer-3x9zil > div > div > div > span > span > span").value
//         fetch('http://localhost:3002/translate',{
//             method: "POST",
//             headers: {  'Content-Type': ' application/json'},
//             body: JSON.stringify({word: 123})
//         })
//             .then((res)=>{ res.json()})
//             .then((data)=>{
//                 document.querySelector("#app-mount > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div.container-1eFtFS > div > div.content-1SgpWY > div.chat-2ZfjoI > div > main > form > div:nth-child(1) > div > div > div.scrollableContainer-15eg7h.webkit-QgSAqd > div > div.textArea-2CLwUE.textAreaSlate-9-y-k2.slateContainer-3x9zil > div > div > div > span > span > span").value = data
//             })
//         console.log(123)
//     }
// });



