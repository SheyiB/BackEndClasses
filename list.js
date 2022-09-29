const myList = ['John', 'Mary', 'Shola', 'Bimpe']

let params = 'John' || 'Seth'

let presence = false

for (let i in myList){
    if (myList[i] == params){
        presence = true
        break
    }
}

console.log(presence)