function extraiLinks(lista){
    return lista.map((item)=> Object.values(item).join())
}
function manejaErro(erro){
    if(erro.cause.code === "ENOTFOUND"){
        return "Link não encontrado"
    }
    return "Ocorreu algum erro"
}

async function checaStatus(listaDeLinks){
    const arrayStatus = await Promise.all(
        listaDeLinks.map(async url=>{
            try{
                let response = await fetch(url)
                return response.status
            }catch(erro){
                return manejaErro(erro)
            }
        })
    )
    return arrayStatus
}
export default async function listaValidada(lista){
    const links = extraiLinks(lista)
    const arrayStatus = await checaStatus(links)
    return arrayStatus.map((element, index)=>(
        {
            ...lista[index], status:element
        })
        )
}