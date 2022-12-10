import chalk from "chalk";
import fs from "fs";
import pegarArquivo from "./index.js"
import listaValidada from "./validaLinks.js";

const caminho = process.argv;

async function showResult(valida, result, directory = ""){
    if(valida){
        const listaDeStatus = await listaValidada(result)
        console.log(
            chalk.yellow("Lista de links"),
            chalk.bgGreen.black(directory),
            listaDeStatus)
    }else{

        console.log(
            chalk.yellow("Lista de links"),
            chalk.bgGreen.black(directory),
            result)
        }
}

async function processaTexto(){
    console.log(caminho[3])
    const path = caminho[2]
    const valida = caminho[3] === "--valida"

    try{
        fs.lstatSync(path) 
    }catch(erro){
        console.log(chalk.red("Arquivo ou diretorio não encontrado."))
        return
    }

    if(fs.lstatSync(path).isFile()){
        const resultado = await pegarArquivo(path)
        showResult(valida, resultado)

    }else if(fs.lstatSync(path).isDirectory()){
        const files = await fs.promises.readdir(path)
        files.forEach(async (filename)=>{
            const file = await pegarArquivo(`${path}/${filename}`)
            showResult(valida, file, path)
        })
    }
    

}
processaTexto()

