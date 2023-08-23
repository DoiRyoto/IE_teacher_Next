export function paperDataIncludeError(data: any){
    if (Object.keys(data.data).includes("error")){
        return true
    }

    if (data.data.total == 0){
        return true
    }

    if(Object.keys(data.data).includes("message")){
        return true
    }

    return false
}