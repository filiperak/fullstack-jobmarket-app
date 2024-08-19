import { IJobs } from "../interface/props";

export const sortByDate = (arr:IJobs[]) => {
    let sortedArr = [...arr]
    for(let i = 0; i < sortedArr.length;i++){
        for(let j = 0; j < sortedArr.length - 1 - i; j++){
            let timeStampOne = new Date(sortedArr[j].createdAt).getTime()
            let timeStampTwo = new Date(sortedArr[j+1].createdAt).getTime()
            if(timeStampTwo > timeStampOne){
                let temp = sortedArr[j];
                sortedArr[j] = sortedArr[j+1]
                sortedArr[j+1] = temp
            }
        }
    }
    return sortedArr;
}