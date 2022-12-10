import chalk from "chalk"
import fs from "fs"

function handlerError(erro){
     throw new Error(erro, "deu ruim")
}

function extraiLinks(str){
    const regex = /\[([^[\]]+)\]\(([\w\S]+)\)/gm
    const array = [...str.matchAll(regex)];
    const obj = array.map(e => ( { [e[1]] : e[2] } ) )
    return obj.length ? obj : "não há links no arquivo"
}
export default async function pegarArquivo(file){
    try{
        const res = await fs.promises.readFile(file, "UTF8")
        return extraiLinks(res)
    }
    catch(err){
        handlerError(err)
    }
}

